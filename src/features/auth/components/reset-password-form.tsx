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
  ResetPasswordFormData,
  resetPasswordSchema,
} from "@/features/auth/schemas";
import { useToast } from "@/hooks/use-toast";
import { authClient } from "@/lib/auth/client/instance";

interface ResetPasswordFormProps {
  token: string;
}

export function ResetPasswordForm({ token }: ResetPasswordFormProps) {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
      token: token,
    },
  });

  async function onSubmit(values: ResetPasswordFormData) {
    const { error } = await authClient.resetPassword({
      newPassword: values.password,
      ...values,
      fetchOptions: {
        onSuccess: () => {
          router.push("/auth/sign-in");

          toast({
            status: "success",
            title: "Password reset successfully",
            description:
              "Your password has been updated. You can now sign in with your new password.",
          });
        },
      },
    });

    if (error) {
      switch (error.status) {
        case 400:
          toast({
            status: "error",
            title: "Authentication error",
            description: ERROR_MESSAGES.INVALID_TOKEN,
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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-5">
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
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••••" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
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
