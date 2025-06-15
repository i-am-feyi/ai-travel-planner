"use client";

import CreateTripForm from "@/features/trip/components/create-trip/create-trip-form";
import CreateTripSidebar from "@/features/trip/components/create-trip/create-trip-sidebar";

import Image from "next/image";

const CreateTripRoute = () => {
  return (
    <section className="relative">
      <div className="flex h-full min-h-screen">
        <CreateTripSidebar />
        <div className="flex-1 flex flex-col items-center px-8 pt-20">
          <div className="max-w-xl mx-auto w-full flex flex-col max-sm:pt-10">
            <Image
              src="/logo/icon-green.svg"
              alt="Talia"
              width={400}
              height={400}
              className="size-16 mb-10"
            />

            <CreateTripForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreateTripRoute;
