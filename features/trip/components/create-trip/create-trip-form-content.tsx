// Step1.tsx
import { useFormContext } from "react-hook-form";
import { FormSchema } from "../../schema/create-trip-schema";

const CreateTripFormContent = ({
  children,
  title,
  description,
}: {
  children: React.ReactNode;
  title: string;
  description: string;
}) => {
  const {
    register,
    formState: { errors },
    getValues,
    setValue,
  } = useFormContext<FormSchema>();

  return (
    <div className="w-full rounded-lg flex flex-col gap-4">
      <div>
        <h1 className="text-3xl font-semibold">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default CreateTripFormContent;
