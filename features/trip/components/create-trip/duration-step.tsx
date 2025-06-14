// Step1.tsx
import { useFormContext } from "react-hook-form";

import { Label } from "@/components/ui/label";
import { FormSchema } from "../../schema/create-trip-schema";
import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";
import CreateTripFormContent from "./create-trip-form-content";

export default function DurationStep() {
  const {
    formState: { errors },
    setValue,
    watch,
  } = useFormContext<FormSchema>();

  const duration = watch("duration");

  return (
    <CreateTripFormContent
      title="What's the duration of your trip?"
      description="Choose a duration that best fits your trip."
    >
      <p className="text-3xl font-medium mt-4">
        {duration} {duration === 1 ? "day" : "days"}
      </p>
      <Slider
        value={[duration]}
        step={1}
        className="mt-4 max-w-sm"
        max={10}
        min={1}
        onValueChange={(value) => {
          setValue("duration", value[0], { shouldValidate: true });
        }}
      />
      {errors.duration && <p className="text-red-600 mt-3">{errors.duration.message}</p>}
    </CreateTripFormContent>
  );
}
