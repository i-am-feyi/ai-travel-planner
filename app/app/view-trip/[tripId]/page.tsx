"use client";

import {
  Calendar,
  CarTaxiFront,
  Clock3,
  MapPin,
  Share,
  Sparkles,
  Star,
  Ticket,
} from "lucide-react";
import React, { use } from "react";
import { cn, formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { useGetTrip } from "@/features/trip/api/use-get-trip-query";
import LoadingSkeleton from "@/features/trip/components/view-trip/loading-skeleton";
import { useShareModalStore } from "@/features/trip/stores/use-share-modal";
import ShareTripModal from "@/features/trip/components/view-trip/share-trip-modal";

interface RatingStarsProps {
  rating: number;
  className?: string;
}

type Params = Promise<{ tripId: string }>;

const getCurrentUrl = () => {
  if (typeof window === "undefined") return "";
  return window.location.origin + window.location.pathname;
};

const ViewTripRoute = (props: { params: Params }) => {
  const params = use(props.params);
  const tripId = params.tripId;
  const { setIsOpen } = useShareModalStore();
  const currentUrl = getCurrentUrl();

  const { data, isLoading } = useGetTrip(tripId);

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (!data) {
    return <div>Trip not found</div>;
  }

  console.log(data);

  return (
    <section>
      <ShareTripModal link={currentUrl} />
      <div className="container mx-auto px-3 pt-10 mb-20">
        <div className="flex items-baseline md:flex-row md:justify-between md:items-center gap-3">
          <div className="w-full">
            <h1 className="text-3xl md:text-4xl font-semibold">{data.title}</h1>
            <div className="flex items-center justify-between gap-4">
              <div className="mt-3 flex gap-2 md:gap-3 items-center flex-wrap">
                <Badge variant="outline" className="px-2 py-1 md:text-sm font-medium">
                  <MapPin />
                  {data.location}
                </Badge>
                <Badge variant="outline" className="px-2 py-1 md:text-sm font-medium">
                  <Sparkles />
                  {data.style}
                </Badge>
                <Badge className="px-2 py-1 md:text-sm font-medium" variant="outline">
                  <Calendar /> {data.duration} days
                </Badge>
                <Badge className="text-green-700 px-2 py-1 font-medium" variant="outline">
                  💰 {formatCurrency(data.estimatedTotal)} est.
                </Badge>
              </div>
              <div>
                <Button
                  size="icon"
                  variant="secondary"
                  className="rounded-full"
                  onClick={() => setIsOpen(true)}
                >
                  <Share className="text-primary size-3.5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10">
          <TripGalleryGrid images={data.tripImages} />
        </div>
        <div className="mt-16 flex flex-col gap-6">
          <h2 className="text-2xl font-semibold">About The Destination</h2>
          <div className="max-w-4xl flex flex-col gap-4 text-md text-black/80">
            {data.description.map((desc: string, index: number) => (
              <p key={index}>{desc}</p>
            ))}
          </div>
        </div>
        <div className="mt-16 flex flex-col gap-6">
          <div>
            <h2 className="text-2xl font-semibold">Hotel Recommendations</h2>
            <div className="max-w-4xl flex flex-col gap-4 text-sm text-muted-foreground mt-1">
              Here are some of the best hotels in {data.location} that fit your needs.
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 gap-y-10">
            {data.hotels.map((hotel, index) => (
              <div key={index}>
                <Link
                  href={
                    "https://www.google.com/maps/search/?api=1&query=" +
                    hotel.hotelName +
                    "," +
                    hotel.address
                  }
                  target="_blank"
                >
                  <div
                    key={index}
                    className="aspect-video bg-accent rounded-xl w-full relative overflow-hidden"
                  >
                    <Image
                      src={hotel.imageUrl!}
                      alt={hotel.hotelName}
                      fill
                      className="object-cover"
                    />
                  </div>
                </Link>

                <div className="mt-4">
                  <Link
                    href={
                      "https://www.google.com/maps/search/?api=1&query=" +
                      hotel.hotelName +
                      "," +
                      hotel.address
                    }
                    target="_blank"
                    className="inline-flex"
                  >
                    <p className="text-lg font-semibold mb-1 hover:underline">
                      {hotel.hotelName}
                    </p>
                  </Link>
                  <div className="text-muted-foreground text-sm flex flex-col gap-1">
                    <p>📍 {hotel.address}</p>
                    <p className="text-primary font-medium">
                      💰 {formatCurrency(hotel.estimatedPricePerNight)} est. per night
                    </p>
                    <div className="flex items-center gap-1">
                      <RatingStars rating={hotel.rating} />
                      <span className="text-muted-foreground text-sm">
                        ({hotel.rating} rating)
                      </span>
                    </div>
                    <div className="mt-3">
                      <Button className="bg-green-600 hover:bg-green-600/80" asChild>
                        <Link
                          href={
                            "https://www.google.com/maps/search/?api=1&query=" +
                            hotel.hotelName +
                            "," +
                            data.location
                          }
                        >
                          View Hotel
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-16 flex flex-col gap-6">
          <div>
            <h2 className="text-2xl font-semibold">Itinerary</h2>
            <div className="max-w-4xl flex flex-col gap-4 text-sm text-muted-foreground mt-1">
              We have curated a {data.duration}-day itinerary for you to explore the best
              of{" "}
              {(data.generalLocation as { cityOrRegionName: string })?.cityOrRegionName ||
                data.location}
              .
            </div>
          </div>
          <div>
            <Accordion type="multiple">
              {data.itineraryDays.map(({ dayNumber, activities, id }) => (
                <AccordionItem key={id} value={`${dayNumber}`}>
                  <AccordionTrigger className="text-xl font-semibold">{`Day ${dayNumber}`}</AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col gap-4">
                      <div className="grid md:grid-cols-4 gap-4">
                        {activities.map(
                          (
                            {
                              placeName,
                              imageUrl,
                              placeDetails,
                              estimatedTravelTime,
                              rating,
                              ticketPrice,
                              timeOfDay,
                            },
                            index
                          ) => (
                            <div key={index}>
                              <div className="aspect-video bg-accent rounded-xl w-full relative overflow-hidden mb-2">
                                <Image
                                  src={imageUrl!}
                                  alt={placeName}
                                  fill
                                  className="object-cover flex items-center justify-center"
                                />
                              </div>
                              <div className="flex flex-col gap-1 mt-3">
                                <p className="text-lg font-medium">{placeName}</p>
                                <div className="flex items-center gap-2">
                                  <Badge
                                    variant="secondary"
                                    className={cn(
                                      timeOfDay === "Morning" && "bg-green-100",
                                      timeOfDay === "Afternoon" && "bg-blue-100",
                                      timeOfDay === "Evening" && "bg-red-100"
                                    )}
                                  >
                                    <Clock3 /> {timeOfDay}
                                  </Badge>
                                  <Badge variant="outline">
                                    <CarTaxiFront />
                                    {estimatedTravelTime} mins
                                  </Badge>
                                  <Badge variant="outline">
                                    <Ticket />${ticketPrice} est.
                                  </Badge>
                                </div>
                                <p className="text-muted-foreground mt-2">
                                  {placeDetails}
                                </p>
                                <div className="flex items-center gap-1">
                                  <RatingStars rating={rating} />
                                  <span className="text-muted-foreground text-sm">
                                    ({rating} rating)
                                  </span>
                                </div>
                                <div className="mt-3">
                                  <Button
                                    className="bg-green-600 hover:bg-green-600/80"
                                    asChild
                                  >
                                    <Link
                                      href={
                                        "https://www.google.com/maps/search/?api=1&query=" +
                                        placeName +
                                        ", " +
                                        data.location
                                      }
                                    >
                                      View Details
                                    </Link>
                                  </Button>
                                </div>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
};

function TripGalleryGrid({
  images,
}: {
  images: {
    id: string;
    ImageUrl: string;
    source: "UNSPLASH" | "GOOGLE_PLACES" | "CUSTOM";
  }[];
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4">
      {/* Featured large section */}
      <div className="md:col-span-12 lg:col-span-8 h-full">
        <div className="aspect-video bg-accent rounded-xl w-full relative overflow-hidden h-full">
          <Image
            src={images[0].ImageUrl}
            alt="Trip image"
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Grid of smaller sections */}
      <div className="grid-cols-2 md:col-span-12  lg:col-span-4 grid md:grid-cols-2 lg:grid-cols-1 gap-2 md:gap-4 h-full">
        {[...Array(2)].map((_, index) => (
          <div
            key={index}
            className="aspect-video bg-accent rounded-xl w-full relative overflow-hidden"
          >
            <Image
              src={images[index + 1].ImageUrl}
              alt={`Trip image ${index + 1}`}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function RatingStars({ rating, className }: RatingStarsProps) {
  const fullStars = Math.floor(rating);
  const partialStar = rating % 1;
  const emptyStars = 5 - Math.ceil(rating);

  return (
    <div className={cn("flex items-center gap-1", className)}>
      {/* Gradient definition for partial fill */}
      <svg width="0" height="0" className="hidden">
        <defs>
          <linearGradient id="partial-fill" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="currentColor" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
      </svg>

      {/* Full stars */}
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} className="size-4 fill-yellow-500 text-yellow-500" />
      ))}

      {/* Partial star */}
      {partialStar > 0 && (
        <div className="relative">
          <Star className="size-4 text-yellow-500 stroke-0" />
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ width: `${partialStar * 100}%` }}
          >
            <Star className="size-4 fill-yellow-500 text-yellow-500" />
          </div>
        </div>
      )}

      {/* Empty stars */}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} className="size-4 text-yellow-500" />
      ))}
    </div>
  );
}
export default ViewTripRoute;
