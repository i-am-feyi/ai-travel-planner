import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Calendar, MapPin } from "lucide-react";
import { Sparkles } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { getTrips } from "@/features/trip/actions/get-trips";

const AppPage = async () => {
  const trips = await getTrips();

  return (
    <section className="min-h-dvh">
      <div className="container mx-auto px-3 pt-10 mb-20">
        <h1 className="text-3xl font-semibold">My Trips</h1>
        {trips.length === 0 ? (
          <div className="flex flex-col gap-4 items-center justify-center min-h-[50vh] mt-10">
            <p className="text-gray-500 text-center">No trips found</p>
            <Button asChild>
              <Link href="/app/create-trip">Create a new trip</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
            {trips.map((trip) => (
              <Card className="p-0 m-0 overflow-hidden gap-3 shadow-xs" key={trip.id}>
                <div className="relative">
                  <Carousel className="w-full">
                    <CarouselContent>
                      {trip.tripImages.map(({ id, ImageUrl }, index) => (
                        <CarouselItem key={id}>
                          <div className="aspect-video relative">
                            <Image
                              src={ImageUrl}
                              alt={`Trip image ${index + 1}`}
                              fill
                              className="object-cover"
                            />
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="absolute left-3 top-1/2 -translate-y-1/2" />
                    <CarouselNext className="absolute right-3 top-1/2 -translate-y-1/2" />
                  </Carousel>
                </div>
                <div className="px-4 pb-8 flex flex-col justify-between h-full">
                  <div>
                    <Link href={`/app/view-trip/${trip.id}`}>
                      <p className="text-lg font-semibold">{trip.title}</p>
                    </Link>
                    <div className="mt-2 flex gap-2 md:gap-3 items-center flex-wrap">
                      <div className="flex gap-2 flex-wrap">
                        <Badge
                          variant="outline"
                          className="px-2 py-1 text-sm font-medium"
                        >
                          <MapPin />
                          {trip.location}
                        </Badge>
                        <Badge
                          variant="outline"
                          className="px-2 py-1 text-sm font-medium"
                        >
                          <Sparkles />
                          {trip.style}
                        </Badge>
                      </div>
                      <div className="flex gap-2 flex-wrap">
                        <Badge
                          className="text-green-700 px-2 py-1 text-sm font-medium"
                          variant="outline"
                        >
                          💰 {formatCurrency(trip.estimatedTotal)} est.
                        </Badge>
                        <Badge
                          className=" px-2 py-1 text-sm font-medium"
                          variant="outline"
                        >
                          <Calendar /> {trip.duration} days
                        </Badge>
                      </div>
                    </div>
                    <div className="mt-4 flex gap-3 items-center">
                      <p className="text-sm text-gray-500">Trip created:</p>
                      <p className="text-sm font-semibold">
                        {formatDistanceToNow(new Date(trip.createdAt), {
                          addSuffix: true,
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="mt-10">
                    <Button className="w-full" asChild>
                      <Link href={`/app/view-trip/${trip.id}`}>View Trip</Link>
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default AppPage;
