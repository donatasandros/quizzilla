import { useQuery } from "@tanstack/react-query";

import { client } from "@/api/hc";

export const useGetQuiz = ({ id }: { id: string }) => {
  const query = useQuery({
    queryKey: ["quiz", id],
    queryFn: async () => {
      const response = await client.api.quizzes[":id"].$get({ param: { id } });

      if (!response.ok) {
        throw new Error("Failed to fetch quiz.");
      }

      const { data } = await response.json();
      return data;
    },
  });

  return query;
};
