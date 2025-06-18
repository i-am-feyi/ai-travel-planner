import { toast } from "sonner";
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/hono";
import { useRouter } from "next/navigation";
import { useCreateTripStore } from "../stores/create-trip-store";

type ResponseType = InferResponseType<typeof client.api.trip.$post, 200>;
type RequestType = InferRequestType<typeof client.api.trip.$post>["json"];

export const useCreateTripAPI = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { resetStore, setIsSubmitted } = useCreateTripStore();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.trip.$post({ json });

      if (!response.ok) {
        throw new Error("Failed to create trip");
      }

      return await response.json();
    },
    onMutate: () => {
      const toastId = toast.loading("Generating trip...");
      return { toastId: toastId };
    },
    onSuccess: (data, variables, context: any) => {
      toast.dismiss(context?.toastId);
      toast.success("Trip created successfully!");
      queryClient.invalidateQueries({ queryKey: ["trips"] });
      router.push(`/app/view-trip/${data.tripId}`);
      resetStore();
    },
    onError: (error, variables, context: any) => {
      toast.dismiss(context?.toastId);
      toast.error("Failed to create trip");
    },
    onSettled: (data, error, variables, context: any) => {
      toast.dismiss(context?.toastId);
      setIsSubmitted(false);
    },
  });

  return mutation;
};
