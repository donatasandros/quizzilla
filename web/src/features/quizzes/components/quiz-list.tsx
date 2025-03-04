import { Link, useRouteContext } from "@tanstack/react-router";
import { InferResponseType } from "hono";

import type { client } from "@/api/hc";
import type { UseMutateFunction } from "@tanstack/react-query";

import { Badge } from "@/web/components/ui/badge";
import { Button, buttonVariants } from "@/web/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/web/components/ui/card";

interface QuizListProps {
  quizzes: InferResponseType<typeof client.api.quizzes.$get, 200>["data"];
  onDelete: UseMutateFunction<
    { data: { quizId: string } },
    Error,
    { id: string },
    unknown
  >;
}

export function QuizList({ quizzes, onDelete }: QuizListProps) {
  const { session } = useRouteContext({
    from: "/_public",
  });

  function handleDelete(id: string) {
    onDelete({ id });
  }

  return (
    <div className="grid grid-cols-3 gap-6">
      {quizzes.map(({ id, userId, title, createdAt }) => (
        <Card key={id}>
          <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>Created: {createdAt}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mt-2 flex flex-wrap gap-2">
              {[1, 2, 3].map((_, idx) => (
                <Badge key={title + idx} variant="secondary">
                  tag
                </Badge>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex items-center gap-2">
            <Link to="/" className={buttonVariants({ class: "flex-1" })}>
              Play
            </Link>
            {session?.userId === userId && (
              <Button variant="destructive" onClick={() => handleDelete(id)}>
                Delete
              </Button>
            )}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
