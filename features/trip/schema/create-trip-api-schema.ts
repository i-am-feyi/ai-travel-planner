import { z } from "zod";

// Location coordinates schema
const CoordinatesSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
});

// General location schema
const GeneralLocationSchema = z.object({
  "city or region name": z.string(),
  coordinates: CoordinatesSchema,
  "openStreetMap link": z.string().url(),
});

// Weather and visit time schemas
const SeasonInfoSchema = z.record(z.string().optional());

// Activity schema
const ActivitySchema = z.object({
  placeName: z.string(),
  placeDetails: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  ticketPrice: z.number(),
  rating: z.number(),
  timeOfDay: z.string(),
  estimatedTravelTime: z.number(),
  imageUrl: z.string().url().optional(),
});

// Day itinerary schema
const DayItinerarySchema = z.object({
  day: z.number(),
  location: z.string(),
  activities: z.array(ActivitySchema),
});

// Hotel schema
const HotelSchema = z.object({
  hotelName: z.string(),
  address: z.string(),
  estimatedPricePerNight: z.number(),
  latitude: z.number(),
  longitude: z.number(),
  rating: z.number(),
  description: z.string(),
  imageUrl: z.string().url().optional(),
});

// Overview schema
const OverviewSchema = z.object({
  title: z.string(),
  location: z.string(),
  travelStyle: z.string(),
  groupType: z.string(),
  interests: z.array(z.string()),
  budget: z.string(),
  numberOfDays: z.number(),
  description: z.array(z.string()),
  estimatedTotalPrice: z.number(),
  bestTimeToVisit: SeasonInfoSchema,
  weatherInfo: SeasonInfoSchema,
  generalLocation: GeneralLocationSchema,
});

// Enriched trip data schema
const EnrichedTripDataSchema = z.object({
  overview: OverviewSchema,
  hotels: z.array(HotelSchema),
  itinerary: z.array(DayItinerarySchema),
});

// Main trip response schema
export const TripResponseSchema = z.object({
  success: z.boolean(),
  tripImages: z.array(z.string().url()),
  enrichedTripData: EnrichedTripDataSchema,
});

// Type exports
export type TripResponse = z.infer<typeof TripResponseSchema>;
export type EnrichedTripData = z.infer<typeof EnrichedTripDataSchema>;
export type Overview = z.infer<typeof OverviewSchema>;
export type Hotel = z.infer<typeof HotelSchema>;
export type DayItinerary = z.infer<typeof DayItinerarySchema>;
export type Activity = z.infer<typeof ActivitySchema>;
