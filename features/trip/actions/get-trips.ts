"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export const getTrips = async () => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }

  const user = await prisma.user.findUnique({
    where: {
      clerkId: userId,
    },
    select: {
      id: true,
    },
  });

  if (!user) {
    throw new Error("Unauthorized!");
  }

  const trips = await prisma.trip.findMany({
    where: {
      userId: user.id,
    },
    select: {
      id: true,
      title: true,
      location: true,
      travelGroup: true,
      style: true,
      duration: true,
      estimatedTotal: true,
      createdAt: true,
      tripImages: {
        select: {
          id: true,
          ImageUrl: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  console.log(trips);
  return trips;
};
