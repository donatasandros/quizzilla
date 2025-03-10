"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ERROR_MESSAGES } from "@/features/auth/constants";
import {
  ForgotPasswordFormData,
  forgotPasswordSchema,
} from "@/features/auth/schemas";
import { useToast } from "@/hooks/use-toast";
import { authClient } from "@/lib/auth/client/instance";

export function ForgotPasswordForm() {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: ForgotPasswordFormData) {
    const { error } = await authClient.forgetPassword({
      ...values,
      redirectTo: "/auth/reset-password",
      fetchOptions: {
        onSuccess: () => {
          router.push(`/auth/forgot-password/sent?email=${values.email}`);
        },
      },
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
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Enter your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          isLoading={form.formState.isSubmitting}
          className="w-full"
        >
          Reset password
        </Button>
      </form>
    </Form>
  );
}
