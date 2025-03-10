"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SiGithub } from "@icons-pack/react-simple-icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { Button, buttonVariants } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DEFAULT_SIGN_IN_URL, ERROR_MESSAGES } from "@/features/auth/constants";
import { SignInFormData, signInSchema } from "@/features/auth/schemas";
import { useToast } from "@/hooks/use-toast";
import { authClient } from "@/lib/auth/client/instance";

export function SignInForm() {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  async function onSubmit(values: SignInFormData) {
    const { error } = await authClient.signIn.email({
      ...values,
      fetchOptions: {
        onSuccess: () => {
          router.push(DEFAULT_SIGN_IN_URL);
        },
      },
    });

    if (error) {
      switch (error.status) {
        case 401:
          toast({
            status: "error",
            title: "Authentication error",
            description: ERROR_MESSAGES.INVALID_CREDENTIALS,
          });
          break;
        default:
          toast({
            status: "error",
            title: "Internal server error",
            description: ERROR_MESSAGES.INTERNAL_ERROR,
          });
          break;
      }
    }
  }

  async function onOAuthSubmit(provider: "github") {
    const { error } = await authClient.signIn.social({
      provider: provider,
      callbackURL: DEFAULT_SIGN_IN_URL,
    });

    if (error) {
      toast({
        status: "error",
        title: "Internal server error",
        description: ERROR_MESSAGES.INTERNAL_ERROR,
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-5">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••••" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex items-center justify-between gap-x-2">
          <FormField
            control={form.control}
            name="rememberMe"
            render={({ field }) => (
              <FormItem className="flex items-center space-y-0 gap-x-2">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>Remember me</FormLabel>
              </FormItem>
            )}
          />
          <Link
            href="/auth/forgot-password"
            className={buttonVariants({
              variant: "link_color",
              size: "link_md",
            })}
          >
            Forgot password
          </Link>
        </div>
        <div className="space-y-4">
          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            isLoading={form.formState.isSubmitting}
            className="w-full"
          >
            Sign in
          </Button>
          <Button
            type="button"
            onClick={() => onOAuthSubmit("github")}
            disabled={form.formState.isSubmitting}
            variant="secondary"
            className="w-full"
          >
            <SiGithub />
            Sign in with GitHub
          </Button>
        </div>
      </form>
    </Form>
  );
}
