"use client";

import * as ToastPrimitives from "@radix-ui/react-toast";
import {
  CircleAlertIcon,
  CircleCheckIcon,
  InfoIcon,
  XIcon,
} from "lucide-react";
import * as React from "react";

import type { ToasterToast } from "@/hooks/use-toast";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const ToastProvider = ToastPrimitives.Provider;

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    className={cn(
      "fixed top-auto right-0 bottom-0 z-[100] flex max-h-screen w-full max-w-[calc(48px+400px)] flex-col p-6 focus-visible:outline-0",
      className,
    )}
    {...props}
  />
));
ToastViewport.displayName = ToastPrimitives.Viewport.displayName;

const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root>
>(({ className, ...props }, ref) => {
  return (
    <ToastPrimitives.Root
      ref={ref}
      className={cn(
        "group data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full pointer-events-auto relative flex w-full flex-col items-start overflow-hidden rounded-xl border border-gray-300 bg-white p-4 shadow-lg transition-all focus-visible:outline-0 data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none dark:border-gray-700 dark:bg-gray-900",
        className,
      )}
      {...props}
    />
  );
});
Toast.displayName = ToastPrimitives.Root.displayName;

const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Action
    ref={ref}
    toast-action=""
    className={cn(
      buttonVariants({ variant: "link_color", size: "link_sm" }),
      className,
    )}
    {...props}
  />
));
ToastAction.displayName = ToastPrimitives.Action.displayName;

const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    toast-close=""
    className={cn(
      "dark:focus:ring-brand-400 focus:ring-brand-500 absolute top-2 right-2 rounded-lg bg-transparent p-2 text-gray-400 opacity-0 transition-opacity group-hover:opacity-100 hover:bg-gray-50 hover:text-gray-500 focus:bg-gray-50 focus:opacity-100 focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:outline-none dark:text-gray-500 dark:hover:bg-gray-800 dark:hover:text-gray-400 dark:focus:bg-gray-800 dark:focus:ring-offset-gray-900",
      className,
    )}
    {...props}
  >
    <XIcon className="size-5" />
  </ToastPrimitives.Close>
));
ToastClose.displayName = ToastPrimitives.Close.displayName;

const ToastIcon = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    status: ToasterToast["status"];
  }
>(({ className, status, ...props }, ref) => {
  if (!status) return;

  const iconMap = {
    primary: InfoIcon,
    success: CircleCheckIcon,
    error: CircleAlertIcon,
    warning: CircleAlertIcon,
  };

  const Icon = iconMap[status];

  return (
    <div
      ref={ref}
      icon-type={status}
      {...props}
      className={cn(
        "relative before:absolute before:top-1/2 before:left-1/2 before:size-7 before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-full before:border-2 before:opacity-30 after:absolute after:top-1/2 after:left-1/2 after:size-9.5 after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-full after:border-2 after:opacity-10",
        {
          "text-brand-600 dark:text-brand-500": status === "primary",
          "text-success-600 dark:text-success-500": status === "success",
          "text-error-600 dark:text-error-500": status === "error",
          "text-warning-600 dark:text-warning-500": status === "warning",
        },
        className,
      )}
    >
      <Icon className="size-5" />
    </div>
  );
});
ToastIcon.displayName = "ToastIcon";

const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Title
    ref={ref}
    className={cn(
      "text-sm font-semibold text-gray-900 dark:text-white",
      className,
    )}
    {...props}
  />
));
ToastTitle.displayName = ToastPrimitives.Title.displayName;

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Description
    ref={ref}
    className={cn("text-sm text-gray-700 dark:text-gray-300", className)}
    {...props}
  />
));
ToastDescription.displayName = ToastPrimitives.Description.displayName;

type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>;

type ToastActionElement = React.ReactElement<typeof ToastAction>;

export {
  Toast,
  ToastAction,
  ToastClose,
  ToastDescription,
  ToastIcon,
  ToastProvider,
  ToastTitle,
  ToastViewport,
  type ToastActionElement,
  type ToastProps,
};
