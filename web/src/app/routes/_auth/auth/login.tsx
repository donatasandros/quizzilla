import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";

import { Button } from "@/web/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/web/components/ui/card";
import { authClient } from "@/web/lib/auth";

export const Route = createFileRoute("/_auth/auth/login")({
  component: LoginPage,
});

function LoginPage() {
  async function loginWithGitHub() {
    try {
      const { error } = await authClient.signIn.social({
        provider: "github",
        callbackURL: "http://localhost:3000/dashboard",
      });

      if (error) {
        toast.error(error.message);
      }
    } catch {
      toast.error("Something went wrong");
    }
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <Card className="w-[360px]">
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent>
          <Button className="w-full" onClick={loginWithGitHub}>
            Login with GitHub
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
