import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono";

export const useGetTrip = (id?: string) => {
  const query = useQuery({
    enabled: !!id,
    queryKey: ["trip", { id }],
    queryFn: async () => {
      if (!id) {
        throw new Error("Trip ID is required");
      }

      const response = await client.api.trip[":id"].$get({
        param: { id },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch trip data");
      }

      const { trip } = await response.json();
      return trip;
    },
  });

  return query;
};
