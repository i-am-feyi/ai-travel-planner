import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono";

export const useGetTrips = () => {
  const query = useQuery({
    queryKey: ["trips"],
    queryFn: async () => {
      const response = await client.api.trip.$get();

      if (!response.ok) {
        throw new Error("Failed to fetch accounts");
      }

      const trips = await response.json();
      return trips;
    },
  });

  return query;
};
