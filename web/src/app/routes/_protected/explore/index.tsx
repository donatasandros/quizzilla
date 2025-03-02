import { createFileRoute } from "@tanstack/react-router";

import { Skeleton } from "@/web/components/ui/skeleton";
import { useGetQuizzes } from "@/web/features/quizzes/api/use-get-quizzes";
import { QuizList } from "@/web/features/quizzes/components/quiz-list";

export const Route = createFileRoute("/_protected/explore/")({
  component: RouteComponent,
});

function RouteComponent() {
  const quizzesQuery = useGetQuizzes();
  const quizzes = quizzesQuery.data || [];

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <h2 className="text-3xl font-bold tracking-tight">Explore</h2>
      {quizzesQuery.isLoading ? (
        <div className="grid grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((_, idx) => (
            <Skeleton key={idx} className="h-[206px] w-full" />
          ))}
        </div>
      ) : (
        <QuizList quizzes={quizzes} />
      )}
    </div>
  );
}
