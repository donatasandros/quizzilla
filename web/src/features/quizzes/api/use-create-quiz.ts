import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferResponseType, InferRequestType } from "hono";
import { toast } from "sonner";

import { client } from "@/api/hc";

type ResponseType = InferResponseType<typeof client.api.quizzes.$post>;
type RequestType = InferRequestType<typeof client.api.quizzes.$post>["json"];

export const useCreateQuiz = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.quizzes.$post({ json });
      return await response.json();
    },
    onSuccess: () => {
      toast.success("Quiz created successfully");
      queryClient.invalidateQueries({ queryKey: ["quizzes"] });
    },
    onError: (error) => {
      console.log(error);
      toast.error("Failed to create quiz");
    },
  });

  return mutation;
};
