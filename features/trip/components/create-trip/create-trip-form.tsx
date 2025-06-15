import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema, FormSchema } from "../../schema/create-trip-schema";
import { Button } from "@/components/ui/button";
import { useCreateTripStore } from "../../stores/create-trip-store";
import { ArrowLeft, ArrowRight, Wand } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCreateTripAPI } from "@/features/trip/api/use-create-trip-query";

const CreateTripForm = () => {
  const { mutate: createTrip, isPending } = useCreateTripAPI();

  const methods = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      budget: "Cheap",
      destination: "",
      duration: 3,
      groupType: "1 person",
      interests: [],
      travelStyle: "Adventure",
    },
    mode: "onTouched",
  });

  const { currentStep, setCurrentStep, steps, setIsSubmitted } = useCreateTripStore();
  const isLast = currentStep === steps.length;
  const budget = methods.watch("budget");

  const onNext = async (e?: React.MouseEvent) => {
    e?.preventDefault();
    // only validate the fields of the current step
    const fields = Object.keys(
      steps[currentStep - 1].schema.shape
    ) as (keyof FormSchema)[];
    const valid = await methods.trigger(fields);
    if (valid) setCurrentStep(currentStep + 1);
  };

  const onBack = (e: React.MouseEvent) => {
    e.preventDefault();
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const onSubmit = methods.handleSubmit((data) => {
    // Set isSubmitted to true
    setIsSubmitted(true);

    // Send details to server
    createTrip({
      budget: data.budget,
      groupType: data.groupType,
      interests: data.interests,
      location: data.destination,
      numberOfDays: data.duration,
      travelStyle: data.travelStyle,
    });
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit} className="flex">
        <div className="flex-1">
          {steps.map(({ component: Component, step }) => {
            return (
              <div className={cn("hidden", currentStep === step && "block")} key={step}>
                <Component key={step} />
              </div>
            );
          })}
          <div className="flex gap-8 mt-8">
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={onBack}
              disabled={currentStep === 1}
              className={cn(currentStep === 1 && "hidden")}
            >
              <ArrowLeft />
              Go Back
            </Button>

            {isLast ? (
              <Button
                type="submit"
                size="lg"
                // Only show submit button when budget is selected in last step
                className={cn(!budget && "hidden")}
                disabled={isPending}
              >
                Create Trip <Wand />
              </Button>
            ) : (
              <Button type="button" onClick={onNext} size="lg">
                Continue <ArrowRight />
              </Button>
            )}
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default CreateTripForm;
