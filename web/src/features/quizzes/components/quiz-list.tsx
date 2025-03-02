import { Link } from "@tanstack/react-router";
import { InferResponseType } from "hono";

import type { client } from "@/api/hc";

import { Badge } from "@/web/components/ui/badge";
import { buttonVariants } from "@/web/components/ui/button";
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
}

export function QuizList({ quizzes }: QuizListProps) {
  return (
    <div className="grid grid-cols-3 gap-6">
      {quizzes.map(({ id, title, createdAt }) => (
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
          <CardFooter>
            <Link to="/" className={buttonVariants({ class: "w-full" })}>
              Play
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
