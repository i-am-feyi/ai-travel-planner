import { Hono } from "hono";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { generateTripFromGemini } from "@/features/trip/api/use-create-trip";
import { fetchUnsplashImages } from "@/features/trip/utils/unsplash";
import { fetchGoogleImagesForHotelsAndActivities } from "@/features/trip/utils/google-images";
import { EnrichedTripData } from "@/features/trip/schema/create-trip-api-schema";
import { prisma } from "@/lib/prisma";
import { getUserByClerkId } from "@/features/users/api/actions";
import { revalidatePath } from "next/cache";

const TripInputSchema = z.object({
  location: z.string(),
  groupType: z.string(),
  numberOfDays: z.number(),
  travelStyle: z.string(),
  interests: z.array(z.string()),
  budget: z.string(),
});

const app = new Hono()
  .get("/recent", async (c) => {
    const recentTrips = await prisma.trip.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 4,
      select: {
        id: true,
        title: true,
        location: true,
        travelGroup: true,
        style: true,
        duration: true,
        estimatedTotal: true,
        createdAt: true,
        tripImages: {
          select: {
            id: true,
            ImageUrl: true,
          },
        },
        user: {
          select: {
            fullName: true,
            profileImageUrl: true,
          },
        },
      },
    });

    if (!recentTrips || recentTrips.length === 0) {
      return c.json({ error: "No trips found" }, 404);
    }

    return c.json(recentTrips, 200);
  })
  .post("/", clerkMiddleware(), zValidator("json", TripInputSchema), async (c) => {
    const auth = getAuth(c);
    const values = c.req.valid("json");
    const { location, travelStyle } = values;

    if (!auth?.userId) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const { user } = await getUserByClerkId(auth.userId);

    if (!user || user === null) {
      return c.json({ error: "User not found" }, 404);
    }

    // 1. Generate Trip via Gemini
    const baseTripData = await generateTripFromGemini(values);

    // 2. Fetch Destination Images via Unsplash
    const tripImages = await fetchUnsplashImages(location, travelStyle);

    // 3. Fetch Google Place Images for Hotels + Activities
    const enrichedTripData: EnrichedTripData =
      await fetchGoogleImagesForHotelsAndActivities(baseTripData);

    // 4. Store All to DB
    const saveTripToDB = await prisma.trip.create({
      data: {
        userId: user.id,
        title: enrichedTripData.overview.title,
        description: enrichedTripData.overview.description,
        location: enrichedTripData.overview.location,
        travelGroup: enrichedTripData.overview.groupType,
        style: enrichedTripData.overview.travelStyle,
        duration: enrichedTripData.overview.numberOfDays,
        budget: enrichedTripData.overview.budget,
        estimatedTotal: enrichedTripData.overview.estimatedTotalPrice,
        bestTimeToVisit: enrichedTripData.overview.bestTimeToVisit,
        weatherInfo: enrichedTripData.overview.weatherInfo,
        generalLocation: enrichedTripData.overview.generalLocation,
        tripImages: {
          create: tripImages.map((image) => ({
            ImageUrl: image,
            source: "UNSPLASH",
          })),
        },
        hotels: {
          create: enrichedTripData.hotels.map((hotel) => ({
            hotelName: hotel.hotelName,
            address: hotel.address,
            estimatedPricePerNight: hotel.estimatedPricePerNight,
            latitude: hotel.latitude,
            longitude: hotel.longitude,
            rating: hotel.rating || 0,
            description: hotel.description,
            imageUrl: hotel.imageUrl,
          })),
        },
        itineraryDays: {
          create: enrichedTripData.itinerary.map((day) => ({
            dayNumber: day.day,
            location: day.location,
            activities: {
              create: day.activities.map((activity) => ({
                placeName: activity.placeName,
                placeDetails: activity.placeDetails,
                latitude: activity.latitude,
                longitude: activity.longitude,
                ticketPrice: activity.ticketPrice,
                rating: activity.rating || 0,
                timeOfDay: activity.timeOfDay,
                estimatedTravelTime: activity.estimatedTravelTime,
                imageUrl: activity.imageUrl,
              })),
            },
          })),
        },
      },
    });

    if (!saveTripToDB) {
      return c.json({ error: "Failed to save trip to database" }, 500);
    }

    const tripId = saveTripToDB.id;

    revalidatePath("/");

    const finalRes = { success: true, tripId };

    return c.json(finalRes, 200);
  })
  .get("/", clerkMiddleware(), async (c) => {
    const auth = getAuth(c);

    if (!auth?.userId) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const { user } = await getUserByClerkId(auth.userId);

    if (!user || user === null) {
      return c.json({ error: "User not found" }, 404);
    }

    const trips = await prisma.trip.findMany({
      where: {
        userId: user.id,
      },
      select: {
        id: true,
        title: true,
        location: true,
        travelGroup: true,
        style: true,
        duration: true,
        estimatedTotal: true,
        createdAt: true,
        tripImages: {
          select: {
            id: true,
            ImageUrl: true,
          },
        },
      },
    });

    return c.json(trips, 200);
  })
  .get("/:id", clerkMiddleware(), async (c) => {
    const { id } = c.req.param();

    const trip = await prisma.trip.findUnique({
      where: {
        id,
      },
      include: {
        hotels: true,
        tripImages: {
          select: {
            id: true,
            ImageUrl: true,
            source: true,
          },
        },
        itineraryDays: {
          include: {
            activities: true,
          },
        },
      },
    });

    return c.json(
      {
        success: true,
        trip,
      },
      200
    );
  });

export default app;
