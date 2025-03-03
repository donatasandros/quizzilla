import { createFileRoute } from "@tanstack/react-router";

import { QuizForm } from "@/web/features/quizzes/components/quiz-form";

export const Route = createFileRoute("/_protected/creator/")({
  component: CreatorPage,
});

function CreatorPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <h2 className="text-3xl font-bold tracking-tight">Create quiz</h2>
      <QuizForm />
    </div>
  );
}
