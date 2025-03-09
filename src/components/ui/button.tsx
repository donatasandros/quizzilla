import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2Icon } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "focus-visible:ring-brand-500 dark:focus-visible:ring-brand-400 inline-flex items-center justify-center rounded-lg border font-semibold whitespace-nowrap focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white focus-visible:outline-none disabled:pointer-events-none dark:focus-visible:ring-offset-gray-950 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-brand-600 hover:bg-brand-700 border-transparent text-white shadow-xs disabled:border-gray-200 disabled:bg-gray-100 disabled:text-gray-400 dark:disabled:border-gray-800 dark:disabled:bg-gray-800 dark:disabled:text-gray-500",
        secondary:
          "border-gray-300 bg-white text-gray-700 shadow-xs hover:bg-gray-50 hover:text-gray-800 disabled:border-gray-200 disabled:bg-white disabled:text-gray-400 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-200 dark:disabled:border-gray-800 dark:disabled:bg-gray-950 dark:disabled:text-gray-500",
        tertiary:
          "border-transparent bg-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-700 disabled:border-transparent disabled:bg-transparent disabled:text-gray-400 dark:text-gray-400 dark:hover:bg-gray-900 dark:hover:text-gray-300 dark:disabled:text-gray-500",
        link: "rounded-sm border-transparent bg-transparent text-gray-600 hover:text-gray-700 disabled:text-gray-400 dark:text-gray-400 dark:hover:text-gray-300",
        link_color:
          "text-brand-700 hover:text-brand-800 border-transparent bg-transparent disabled:text-gray-400 dark:text-gray-300 dark:hover:text-gray-200",
      },
      size: {
        sm: "h-9 gap-1.5 px-3 py-2 text-sm [&_svg]:size-5",
        md: "h-10 gap-1.5 px-3.5 py-2.5 text-sm [&_svg]:size-5",
        lg: "h-11 gap-2 px-4 py-2.5 [&_svg]:size-5",
        "2xl": "h-15 gap-2.5 px-5.5 py-4 text-lg [&_svg]:size-6",
        icon_sm: "size-9 p-2 [&_svg]:size-5",
        icon_md: "size-10 p-2.5 [&_svg]:size-5",
        link_sm: "gap-1.5 text-sm [&_svg]:size-5",
        link_md: "gap-1.5 text-sm [&_svg]:size-5",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      isLoading = false,
      children,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {isLoading ? (
          <React.Fragment>
            <Loader2Icon className="animate-spin" />
            <span className="sr-only">Loading...</span>
          </React.Fragment>
        ) : (
          <React.Fragment>{children}</React.Fragment>
        )}
      </Comp>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
