// Step1.tsx
import { useFormContext } from "react-hook-form";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FormSchema } from "../../schema/create-trip-schema";
import { SelectBudgetOptions } from "@/constants/options";
import { cn } from "@/lib/utils";
import CreateTripFormContent from "./create-trip-form-content";

type Budget = "Cheap" | "Moderate" | "Luxury" | "Premium";

export default function BudgetStep() {
  const {
    formState: { errors },
    setValue,
    watch,
  } = useFormContext<FormSchema>();

  const budget = watch("budget");

  const handleBudgetChange = (value: Budget) => {
    setValue("budget", value, { shouldValidate: true });
  };

  return (
    <CreateTripFormContent
      title="What's your budget like?"
      description="Choose a budget that best fits your trip."
    >
      <RadioGroup
        defaultValue={budget}
        onValueChange={handleBudgetChange}
        className="grid lg:grid-cols-2 gap-5 mt-5 w-full"
      >
        {SelectBudgetOptions.map(({ description, icon, id, title }) => (
          <div
            className="flex w-full"
            key={id}
            onClick={() => handleBudgetChange(title as Budget)}
          >
            <Label
              htmlFor={title}
              className={cn(
                "p-4 outline-2 rounded-lg shadow-sm hover:cursor-pointer w-full hover:outline-green-600 duration-300",
                budget === title && "outline-green-600"
              )}
            >
              <RadioGroupItem value={title} id={title} className="hidden" />
              <div className="mt-3">
                <p className="text-4x">{icon}</p>
                <p className="font-bold text-lg">{title}</p>
                <p className="text-gray-500 text-sm">{description}</p>
              </div>
            </Label>
          </div>
        ))}
      </RadioGroup>
      {errors.budget && <p className="text-red-600 mt-3">{errors.budget.message}</p>}
    </CreateTripFormContent>
  );
}
