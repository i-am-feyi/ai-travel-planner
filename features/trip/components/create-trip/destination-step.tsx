// Step1.tsx
import { useFormContext } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FormSchema } from "../../schema/create-trip-schema";
import { SelectBudgetOptions } from "@/constants/options";
import { cn } from "@/lib/utils";
import { Combobox } from "@/components/ui/combobox";
import { get } from "http";
import { flags } from "@/constants/flags";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";
import CreateTripFormContent from "./create-trip-form-content";

export default function DestinationStep() {
  const {
    register,
    formState: { errors },
    getValues,
    setValue,
  } = useFormContext<FormSchema>();

  return (
    <CreateTripFormContent
      title="Where are you traveling to?"
      description="Choose the destination of your trip."
    >
      <Combobox
        {...register("destination")}
        options={flags.map(({ flag, name }) => ({
          label: `${flag} ${name}`,
          value: name,
        }))}
        placeholder="Select a country"
        value={getValues("destination")}
        onValueChange={(value) => {
          setValue("destination", value);
        }}
      />
      {errors.destination && (
        <p className="text-red-600 mt-1 text-sm">{errors.destination.message}</p>
      )}
    </CreateTripFormContent>
  );
}
