import { toast } from "sonner";
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/hono";
import { useRouter } from "next/navigation";

type ResponseType = InferResponseType<typeof client.api.trip.$post, 200>;
type RequestType = InferRequestType<typeof client.api.trip.$post>["json"];

export const useCreateTripAPI = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.trip.$post({ json });

      if (!response.ok) {
        throw new Error("Failed to create trip");
      }

      return await response.json();
    },
    onMutate: () => {
      toast.loading("Generating trip...");
    },
    onSuccess: (response: ResponseType, request: RequestType) => {
      console.log("OnSuccess Response:", response);
      console.log("OnSuccess Request:", request);
      toast.success("Trip Created ✅");
      queryClient.invalidateQueries({ queryKey: ["trips"] });
      router.push(`/app/view-trip/${response.tripId}`);
    },
    onError: () => {
      toast.error("Failed to generate trip");
    },
  });

  return mutation;
};
