import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferResponseType, InferRequestType } from "hono";
import { toast } from "sonner";

import { client } from "@/api/hc";

type ResponseType = InferResponseType<
  (typeof client.api.quizzes)[":id"]["$delete"],
  200
>;
type RequestType = InferRequestType<
  (typeof client.api.quizzes)[":id"]["$delete"]
>["param"];

export const useDeleteQuiz = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.quizzes[":id"]["$delete"]({
        param: { id: json.id },
      });

      return await response.json();
    },
    onSuccess: () => {
      toast.success("Quiz deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["quizzes"] });
    },
    onError: (err) => {
      console.log(err);
      toast.error("Failed to delete quiz");
    },
  });

  return mutation;
};
