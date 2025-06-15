import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono";
import { InferRequestType } from "hono";
import { InferResponseType } from "hono";

type ResponseType = InferResponseType<typeof client.api.trip.recent.$get, 200>;

export const useGetRecentTrips = () => {
  const query = useQuery<ResponseType, Error>({
    queryKey: ["recentTrips"],
    queryFn: async () => {
      const response = await client.api.trip.recent.$get();

      if (!response.ok) {
        throw new Error("Failed to fetch trips");
      }

      const trips = await response.json();

      return trips;
    },
  });

  return query;
};
