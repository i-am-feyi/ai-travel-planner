"use client";

import TetrisLoader from "@/components/tetris-loader/loader";
import CreateTripForm from "@/features/trip/components/create-trip/create-trip-form";
import CreateTripSidebar from "@/features/trip/components/create-trip/create-trip-sidebar";
import { useCreateTripStore } from "@/features/trip/stores/create-trip-store";

import Image from "next/image";
import Link from "next/link";

const CreateTripRoute = () => {
  const { isSubmitted } = useCreateTripStore();

  return (
    <section className="relative">
      <div className="flex h-full min-h-screen">
        <CreateTripSidebar />
        <div className="flex-1 flex flex-col items-center px-8 pt-20">
          {isSubmitted ? (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="flex flex-col items-center justify-center -mt-60">
                <TetrisLoader />
                <p className="max-w-xs mx-auto text-center -mt-24 text-2xl">
                  Hang on tight! <br /> we&apos;re creating your trip...
                </p>
              </div>
            </div>
          ) : (
            <div className="max-w-xl mx-auto w-full flex flex-col max-sm:pt-10">
              <Link href="/">
                <Image
                  src="/logo/icon-green.svg"
                  alt="Talia"
                  width={400}
                  height={400}
                  className="size-16 mb-10"
                />
              </Link>

              <CreateTripForm />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CreateTripRoute;
