"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SiGithub } from "@icons-pack/react-simple-icons";
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
import { SignUpFormData, signUpSchema } from "@/features/auth/schemas";

export function SignUpForm() {
  const form = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: SignUpFormData) {
    console.log(values);
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
