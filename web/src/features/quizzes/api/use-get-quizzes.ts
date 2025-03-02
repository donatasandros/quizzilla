import { useQuery } from "@tanstack/react-query";

import { client } from "@/api/hc";

export const useGetQuizzes = () => {
  const query = useQuery({
    queryKey: ["quizzes"],
    queryFn: async () => {
      const response = await client.api.quizzes.$get();

      if (!response.ok) {
        throw new Error("Failed to fetch quizzes.");
      }

      const { data } = await response.json();
      return data;
    },
  });

  return query;
};
