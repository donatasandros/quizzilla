"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SiGithub } from "@icons-pack/react-simple-icons";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DEFAULT_SIGN_IN_URL, ERROR_MESSAGES } from "@/features/auth/constants";
import { SignUpFormData, signUpSchema } from "@/features/auth/schemas";
import { useToast } from "@/hooks/use-toast";
import { authClient } from "@/lib/auth/client/instance";

export function SignUpForm() {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: SignUpFormData) {
    const { error } = await authClient.signUp.email({
      ...values,
      fetchOptions: {
        onSuccess: () => {
          router.push(DEFAULT_SIGN_IN_URL);
        },
      },
    });

    if (error) {
      switch (error.status) {
        case 422:
          toast({
            status: "error",
            title: "Authentication error",
            description: ERROR_MESSAGES.USER_ALREADY_EXISTS,
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
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Enter your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Create a password"
                    className="peer"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
                {!fieldState.error && (
                  <FormDescription>
                    Must be at least 8 characters.
                  </FormDescription>
                )}
              </FormItem>
            )}
          />
        </div>
        <div className="space-y-4">
          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            isLoading={form.formState.isSubmitting}
            className="w-full"
          >
            Get started
          </Button>
          <Button
            type="button"
            onClick={() => onOAuthSubmit("github")}
            disabled={form.formState.isSubmitting}
            variant="secondary"
            className="w-full"
          >
            <SiGithub />
            Sign Up with GitHub
          </Button>
        </div>
      </form>
    </Form>
  );
}
