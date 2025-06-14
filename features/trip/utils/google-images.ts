// lib/images/google.ts

const GOOGLE_API_KEY = process.env.GOOGLE_PLACES_API_KEY!;
const SEARCH_URL = "https://places.googleapis.com/v1/places:searchText";
const PHOTO_URL_TEMPLATE =
  "https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=1000&maxWidthPx=1900&key=" +
  GOOGLE_API_KEY;

// Fetch details from Google Places API
async function fetchGooglePlace(textQuery: string) {
  const res = await fetch(SEARCH_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": GOOGLE_API_KEY,
      "X-Goog-FieldMask": [
        "places.displayName",
        "places.photos",
        "places.formattedAddress",
        "places.location",
        "places.rating",
      ].join(","),
    },
    body: JSON.stringify({ textQuery }),
  });

  const data = await res.json();
  return data?.places?.[0];
}

// Construct photo URL from Google Places photo name
function constructPhotoUrl(photoName: string) {
  return PHOTO_URL_TEMPLATE.replace("{NAME}", photoName);
}

export async function fetchGoogleImagesForHotelsAndActivities(tripData: any) {
  const enrichedHotels = await Promise.all(
    tripData.hotels.map(async (hotel: any) => {
      const place = await fetchGooglePlace(hotel.hotelName);
      if (!place) return hotel;

      const imageUrl = place.photos?.[0]?.name
        ? constructPhotoUrl(place.photos[0].name)
        : null;

      return {
        ...hotel,
        address: place.formattedAddress || hotel.address,
        rating: place.rating || hotel.rating,
        latitude: place.location?.latitude,
        longitude: place.location?.longitude,
        imageUrl,
      };
    })
  );

  const enrichedItinerary = await Promise.all(
    tripData.itinerary.map(async (day: any) => {
      const enrichedPlan = await Promise.all(
        day.activities.map(async (activity: any) => {
          const place = await fetchGooglePlace(activity.placeName);
          if (!place) return activity;

          const imageUrl = place.photos?.[0]?.name
            ? constructPhotoUrl(place.photos[0].name)
            : null;

          return {
            ...activity,
            imageUrl,
            rating: place.rating || activity.rating,
            latitude: place.location?.latitude,
            longitude: place.location?.longitude,
          };
        })
      );

      return { ...day, activities: enrichedPlan };
    })
  );

  return {
    ...tripData,
    hotels: enrichedHotels,
    itinerary: enrichedItinerary,
  };
}
