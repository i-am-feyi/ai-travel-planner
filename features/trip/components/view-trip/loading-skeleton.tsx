import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const LoadingSkeleton = () => {
  return (
    <section>
      <div className="container mx-auto px-3 pt-10 mb-20">
        <div className="flex items-baseline md:flex-row md:justify-between md:items-center gap-3">
          <div className="w-full">
            <h1 className="text-3xl md:text-4xl font-semibold">
              <Skeleton className="w-1/2 h-10" />
            </h1>
            <div className="flex items-center justify-between gap-4">
              <div className="mt-3 flex gap-2 md:gap-3 items-center">
                <Skeleton className="w-20 h-8" />
                <Skeleton className="w-20 h-8" />
                <Skeleton className="w-20 h-8" />
              </div>
              <div>
                <Skeleton className="size-10 rounded-full" />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4">
            {/* Featured large section */}
            <div className="md:col-span-12 lg:col-span-8 h-full">
              <Skeleton className="w-full h-full rounded-xl aspect-video relative" />
            </div>

            {/* Grid of smaller sections */}
            <div className="grid-cols-2 md:col-span-12  lg:col-span-4 grid md:grid-cols-2 lg:grid-cols-1 gap-2 md:gap-4 h-full">
              {[...Array(2)].map((_, index) => (
                <Skeleton className="w-full aspect-video h-full" key={index} />
              ))}
            </div>
          </div>
        </div>
        <div className="mt-16 flex flex-col gap-6">
          <h2 className="text-2xl font-semibold">
            <Skeleton className="w-1/2 max-w-xs h-10" />
          </h2>
          <div className="max-w-4xl flex flex-col gap-4 text-md text-black/80">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="flex flex-col gap-2 mb-3">
                <Skeleton className="w-full h-4" />
                <Skeleton className="w-full h-4" />
                <Skeleton className="w-1/2 h-4" />
              </div>
            ))}
          </div>
        </div>
        <div className="mt-16 flex flex-col gap-6">
          <div>
            <h2 className="text-2xl font-semibold">
              <Skeleton className="w-1/2 max-w-xs h-10" />
            </h2>
            <div className="max-w-4xl flex flex-col gap-4 text-sm text-muted-foreground mt-1">
              <Skeleton className="w-full h-4" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 gap-y-10">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="mt-8">
                <Skeleton className="w-full aspect-video rounded-xl" />

                <div className="mt-4 flex flex-col gap-2">
                  <Skeleton className="w-full h-8" />

                  <div className="text-muted-foreground text-sm flex flex-col gap-2">
                    <Skeleton className="w-full h-4" />
                    <Skeleton className="w-full h-4" />
                    <Skeleton className="w-60 h-4" />
                    <div className="mt-3">
                      <Skeleton className="w-20 h-8" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-16 flex flex-col gap-6">
          <div>
            <h2 className="text-2xl font-semibold">
              <Skeleton className="w-1/2 max-w-xs h-10" />
            </h2>
            <div className="max-w-4xl flex flex-col gap-4 text-sm text-muted-foreground mt-3">
              <Skeleton className="w-full h-4" />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            {[...new Array(3)].map((_, index) => (
              <Skeleton className="w-full h-16" key={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoadingSkeleton;
