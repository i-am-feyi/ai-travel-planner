// schemas.ts
import { z } from "zod";

export const destinationSchema = z.object({
  destination: z
    .string({ required_error: "Please select a destination" })
    .min(2, "Please select a destination"),
});

export const groupTypeSchema = z.object({
  groupType: z.enum(["1 person", "2 people", "3 to 5 people", "5 to 10 people"], {
    required_error: "Select your group type",
  }),
});

export const durationSchema = z.object({
  duration: z
    .number()
    .min(1, "Please select a duration")
    .max(10, "Please select a duration"),
});

export const travelStyleSchema = z.object({
  travelStyle: z.enum(
    [
      "Relaxed",
      "Luxury",
      "Adventure",
      "Cultural",
      "Nature & Outdoors",
      "City Exploration",
    ],
    {
      required_error: "Select your travel style",
    }
  ),
});

export const interestsSchema = z.object({
  interests: z
    .array(
      z.enum([
        "Food & Culinary",
        "Historical Sites",
        "Hiking & Nature Walks",
        "Beaches & Water Activities",
        "Museums & Arts",
        "Nightlife & Bars",
        "Photography Spots",
        "Shopping",
      ])
    )
    .min(1, "Please select at least one interest")
    .max(3, "You can select up to 3 interests"),
});

export const budgetSchema = z.object({
  budget: z.enum(["Cheap", "Moderate", "Luxury", "Premium"], {
    required_error: "Select your budget",
  }),
});

// merge them all into one "super" schema for final submission
export const formSchema = destinationSchema
  .merge(groupTypeSchema)
  .merge(durationSchema)
  .merge(travelStyleSchema)
  .merge(interestsSchema)
  .merge(budgetSchema);
export type FormSchema = z.infer<typeof formSchema>;
