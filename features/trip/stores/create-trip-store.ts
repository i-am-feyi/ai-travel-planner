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
}

export const useCreateTripStore = create<CreateTripState>((set) => ({
  currentStep: 1,
  steps: createTripSteps,
  setCurrentStep: (step) => set({ currentStep: step }),
  formData: {
    destination: "",
    groupType: "1 person",
    duration: "",
    travelStyle: "adventure",
    interests: [],
    budget: "Cheap",
  },
}));
