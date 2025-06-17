"use server";

import { prisma } from "@/lib/prisma";

export const getRecentTrips = async () => {
  const recentTrips = await prisma.trip.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 4,
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
      user: {
        select: {
          fullName: true,
          profileImageUrl: true,
        },
      },
    },
  });

  return recentTrips;
};
