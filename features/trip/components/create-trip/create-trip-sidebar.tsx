import { cn } from "@/lib/utils";
import { CheckCircle2 } from "lucide-react";
import Image from "next/image";
import React from "react";
import { useCreateTripStore } from "../../stores/create-trip-store";
import Link from "next/link";

const CreateTripSidebar = () => {
  const { currentStep, steps } = useCreateTripStore();

  return (
    <div className="hidden md:flex md:w-2/6 md:max-w-sm bg-muted/70 px-10 pt-8 pb-16">
      <div className="flex flex-col gap-4">
        <div>
          <Link href="/">
            <Image src="/logo/logo-green.svg" alt="Talia" width={150} height={100} />
          </Link>
          <p className="text-sm text-muted-foreground mt-1">
            Create and plan your next trip with Talia.
          </p>
        </div>
        <div className="flex flex-col gap-8 mt-20">
          {steps.map(({ step, title, description }) => (
            <div
              key={step}
              className={cn(
                "flex gap-3 opacity-40",
                currentStep >= step && "opacity-100"
              )}
            >
              <div>
                <CheckCircle2 className="size-6 text-green-600" />
              </div>
              <div>
                <p className="text-md font-medium">{title}</p>
                <p className="text-sm text-muted-foreground">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CreateTripSidebar;
