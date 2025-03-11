"use client";

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastIcon,
  ToastProvider as Toaster,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";

export function ToastProvider() {
  const { toasts } = useToast();

  return (
    <Toaster>
      {toasts.map(function ({
        id,
        title,
        description,
        action,
        status = "primary",
        ...props
      }) {
        return (
          <Toast key={id} {...props}>
            <div className="flex items-start gap-4 max-md:flex-col">
              <div>
                <ToastIcon status={status} />
              </div>
              <div className="space-y-3">
                <div>
                  {title && <ToastTitle>{title}</ToastTitle>}
                  {description && (
                    <ToastDescription>{description}</ToastDescription>
                  )}
                </div>

                {action}
              </div>
            </div>
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </Toaster>
  );
}
