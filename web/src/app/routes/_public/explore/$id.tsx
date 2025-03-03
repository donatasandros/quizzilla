import { createFileRoute } from "@tanstack/react-router";

import { useGetQuiz } from "@/web/features/quizzes/api/use-get-quiz";

export const Route = createFileRoute("/_public/explore/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  const quizQuery = useGetQuiz({ id: Route.useParams().id });

  if (quizQuery.isLoading) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <pre>{JSON.stringify(quizQuery.data, null, 2)}</pre>
    </div>
  );
}
