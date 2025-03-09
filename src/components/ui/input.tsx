import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "dark:focus-visible:border-brand-400 dark:focus-visible:ring-brand-400 focus-visible:border-brand-500 focus-visible:ring-brand-500 dark:aria-[invalid=true]:border-error-400 aria-[invalid=true]:border-error-300 aria-[invalid=true]:focus-visible:border-error-500 aria-[invalid=true]:focus-visible:ring-error-500 dark:aria-[invalid=true]:focus-visible:border-error-400 dark:aria-[invalid=true]:focus-visible:ring-error-400 flex h-10 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-xs placeholder:text-gray-500 focus-visible:ring-1 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-gray-300 disabled:bg-gray-50 disabled:text-gray-500 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-50 dark:placeholder:text-gray-400 dark:disabled:border-gray-700 dark:disabled:bg-gray-900",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
