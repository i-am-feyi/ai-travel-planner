// Step1.tsx
import { useFormContext } from "react-hook-form";

import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { FormSchema } from "../../schema/create-trip-schema";
import { SelectInterestsOptions } from "@/constants/options";
import { cn } from "@/lib/utils";
import { useState } from "react";
import CreateTripFormContent from "./create-trip-form-content";

type Interest =
  | "Food & Culinary"
  | "Historical Sites"
  | "Hiking & Nature Walks"
  | "Beaches & Water Activities"
  | "Museums & Arts"
  | "Nightlife & Bars"
  | "Photography Spots";

export default function InterestsStep() {
  const {
    formState: { errors },
    setValue,
    watch,
  } = useFormContext<FormSchema>();

  const selectedInterests = watch("interests") || [];

  const onInterestToggle = (interest: Interest) => {
    const currentInterests = [...selectedInterests];
    const index = currentInterests.indexOf(interest);

    if (index === -1) {
      if (currentInterests.length < 3) {
        currentInterests.push(interest);
      }
    } else {
      currentInterests.splice(index, 1);
    }

    setValue("interests", currentInterests, { shouldValidate: true });
  };

  return (
    <CreateTripFormContent
      title="What are you interested in?"
      description="Choose up to 3 interests that best fit your trip."
    >
      <div className="grid lg:grid-cols-2 gap-5 mt-5 w-full">
        {SelectInterestsOptions.map((interest) => (
          <div className="flex w-full" key={interest}>
            <Label
              htmlFor={interest}
              className={cn(
                "p-4 outline-2 rounded-lg shadow-sm hover:cursor-pointer w-full hover:outline-green-600 duration-300",
                selectedInterests.includes(interest as Interest) && "outline-green-600",
                selectedInterests.length === 3 &&
                  !selectedInterests.includes(interest as Interest) &&
                  "opacity-50 cursor-not-allowed hover:outline-none"
              )}
            >
              <div className="flex items-center space-x-3">
                <Checkbox
                  id={interest}
                  checked={selectedInterests.includes(interest as Interest)}
                  onCheckedChange={() => onInterestToggle(interest as Interest)}
                  disabled={
                    selectedInterests.length === 3 &&
                    !selectedInterests.includes(interest as Interest)
                  }
                />
                <div>
                  <p className="font-medium">{interest}</p>
                </div>
              </div>
            </Label>
          </div>
        ))}
      </div>

      {errors.interests && (
        <p className="text-red-600 mt-3">{errors.interests.message}</p>
      )}
    </CreateTripFormContent>
  );
}
