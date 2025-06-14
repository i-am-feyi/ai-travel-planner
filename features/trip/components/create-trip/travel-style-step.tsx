// Step1.tsx
import { useFormContext } from "react-hook-form";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FormSchema } from "../../schema/create-trip-schema";
import { SelectTravelStyleOptions } from "@/constants/options";
import { cn } from "@/lib/utils";
import CreateTripFormContent from "./create-trip-form-content";

type TravelStyle =
  | "Relaxed"
  | "Luxury"
  | "Adventure"
  | "Cultural"
  | "Nature & Outdoors"
  | "City Exploration";

export default function TravelStyleStep() {
  const {
    formState: { errors },
    setValue,
    watch,
  } = useFormContext<FormSchema>();

  const travelStyle = watch("travelStyle");

  return (
    <CreateTripFormContent
      title="What's your travel style?"
      description="Choose the travel style that best fits your trip."
    >
      <RadioGroup
        value={travelStyle}
        onValueChange={(value: TravelStyle) => {
          setValue("travelStyle", value, { shouldValidate: true });
        }}
        className="grid lg:grid-cols-2 gap-5 mt-5 w-full"
      >
        {SelectTravelStyleOptions.map((style) => (
          <div className="flex w-full" key={style}>
            <Label
              htmlFor={style}
              className={cn(
                "p-4 outline-2 rounded-lg shadow-sm hover:cursor-pointer w-full hover:outline-green-600 duration-300",
                travelStyle === style && "outline-green-600"
              )}
            >
              <RadioGroupItem value={style} id={style} className="hidden" />
              <div>
                <p className="font-semibold text-md">{style}</p>
              </div>
            </Label>
          </div>
        ))}
      </RadioGroup>
      {errors.travelStyle && (
        <p className="text-red-600 mt-3">{errors.travelStyle.message}</p>
      )}
    </CreateTripFormContent>
  );
}
