import { create } from "zustand";
import { ComponentType } from "react";

import { createTripSteps } from "@/constants/create-trip-steps";
import { z } from "zod";
import { FormSchema } from "../schema/create-trip-schema";

export type Step = {
  step: number;
  title: string;
  description: string;
  schema: z.ZodObject<any>;
  component: ComponentType;
};

interface CreateTripState {
  currentStep: number;
  steps: Step[];
  setCurrentStep: (step: number) => void;
  formData: FormSchema;
  isSubmitted: boolean;
  setIsSubmitted: (isSubmitted: boolean) => void;
}

export const useCreateTripStore = create<CreateTripState>((set) => ({
  currentStep: 1,
  steps: createTripSteps,
  setCurrentStep: (step) => set({ currentStep: step }),
  formData: {
    destination: "",
    groupType: "1 person",
    duration: 3,
    travelStyle: "Adventure",
    interests: [],
    budget: "Cheap",
  },
  isSubmitted: false,
  setIsSubmitted: (isSubmitted) => set({ isSubmitted }),
}));
