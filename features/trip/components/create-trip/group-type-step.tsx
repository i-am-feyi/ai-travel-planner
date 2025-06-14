// Step1.tsx
import { useFormContext } from "react-hook-form";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FormSchema } from "../../schema/create-trip-schema";
import { SelectTravelerList } from "@/constants/options";
import { cn } from "@/lib/utils";
import CreateTripFormContent from "./create-trip-form-content";

type GroupType = "1 person" | "2 people" | "3 to 5 people" | "5 to 10 people";

export default function GroupTypeStep() {
  const {
    formState: { errors },
    setValue,
    watch,
  } = useFormContext<FormSchema>();

  const groupType = watch("groupType");

  return (
    <CreateTripFormContent
      title="Who are you traveling with?"
      description="Choose the group type of your trip."
    >
      <RadioGroup
        value={groupType}
        onValueChange={(value: GroupType) => {
          setValue("groupType", value, { shouldValidate: true });
        }}
        className="grid lg:grid-cols-2 gap-5 mt-5 w-full"
      >
        {SelectTravelerList.map(({ description, icon, id, title, people }) => (
          <div className="flex w-full" key={id}>
            <Label
              htmlFor={people}
              className={cn(
                "p-4 outline-2 rounded-lg shadow-sm hover:cursor-pointer w-full hover:outline-green-600 duration-300",
                groupType === people && "outline-green-600"
              )}
            >
              <RadioGroupItem value={people} id={people} className="hidden" />
              <div>
                <p className="text-4x">{icon}</p>
                <p className="font-bold text-lg">{title}</p>
                <p className="text-gray-500 text-sm">{description}</p>
              </div>
            </Label>
          </div>
        ))}
      </RadioGroup>
      {errors.groupType && (
        <p className="text-red-600 mt-3">{errors.groupType.message}</p>
      )}
    </CreateTripFormContent>
  );
}
