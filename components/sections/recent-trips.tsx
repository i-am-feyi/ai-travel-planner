import { Card } from "../ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Calendar, MapPin, Sparkles } from "lucide-react";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { formatDistanceToNow } from "date-fns";
import { Button } from "../ui/button";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";
import { getRecentTrips } from "@/features/trip/actions/get-recent-trips";

const RecentTrips = async () => {
  const trips = await getRecentTrips();

  return (
    <section>
      <div className="container mx-auto px-3">
        <h2 className="text-3xl md:text-4xl font-bold">Recent User Trips</h2>

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
                  <div className="text-lg font-semibold">
                    <Link href={`/app/view-trip/${trip.id}`} className="hover:underline">
                      {trip.title}
                    </Link>
                  </div>
                  <div className="mt-2 flex gap-2 md:gap-3 items-center flex-wrap">
                    <div className="flex gap-2 flex-wrap">
                      <Badge variant="outline" className="px-2 py-1 text-sm font-medium">
                        <MapPin className="w-4 h-4 mr-1" />
                        {trip.location}
                      </Badge>
                      <Badge variant="outline" className="px-2 py-1 text-sm font-medium">
                        <Sparkles className="w-4 h-4 mr-1" />
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
                      <Badge className="px-2 py-1 text-sm font-medium" variant="outline">
                        <Calendar className="w-4 h-4 mr-1" /> {trip.duration} days
                      </Badge>
                    </div>
                  </div>
                  <div className="mt-4 flex gap-3 items-center">
                    <p className="text-sm text-gray-500">Trip By:</p>
                    <div className="flex items-center gap-2">
                      {trip.user?.profileImageUrl && (
                        <Image
                          src={trip.user.profileImageUrl}
                          alt="User profile image"
                          width={20}
                          height={20}
                          className="rounded-full"
                        />
                      )}
                      <p className="text-sm font-semibold">
                        {trip.user?.fullName || "Anonymous"}
                      </p>
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
      </div>
    </section>
  );
};

export default RecentTrips;
