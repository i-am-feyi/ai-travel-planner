import BudgetStep from "@/features/trip/components/create-trip/budget-step";
import DestinationStep from "@/features/trip/components/create-trip/destination-step";
import DurationStep from "@/features/trip/components/create-trip/duration-step";
import GroupTypeStep from "@/features/trip/components/create-trip/group-type-step";
import InterestsStep from "@/features/trip/components/create-trip/interests-step";
import TravelStyleStep from "@/features/trip/components/create-trip/travel-style-step";
import {
  budgetSchema,
  destinationSchema,
  durationSchema,
  groupTypeSchema,
  interestsSchema,
  travelStyleSchema,
} from "@/features/trip/schema/create-trip-schema";

export const createTripSteps = [
  {
    step: 1,
    title: "Destination",
    description: "Choose where you want to go",
    schema: destinationSchema,
    component: DestinationStep,
  },
  {
    step: 2,
    title: "Group Type",
    description: "Tell us who you're traveling with",
    schema: groupTypeSchema,
    component: GroupTypeStep,
  },
  {
    step: 3,
    title: "Duration",
    description: "Select how long you'll be away",
    schema: durationSchema,
    component: DurationStep,
  },
  {
    step: 4,
    title: "Travel Style",
    description: "Pick the type of experience you’re looking for",
    schema: travelStyleSchema,
    component: TravelStyleStep,
  },
  {
    step: 5,
    title: "Interests",
    description: "What excites you most about this trip?",
    schema: interestsSchema,
    component: InterestsStep,
  },
  {
    step: 6,
    title: "Budget",
    description: "Set your price range for the trip",
    schema: budgetSchema,
    component: BudgetStep,
  },
];
