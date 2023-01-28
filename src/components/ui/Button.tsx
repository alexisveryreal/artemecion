import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";

import type { ComponentProps } from "react";
import { forwardRef } from "react";
import { cn } from "../../utils/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center transition-colors rounded border border-transparent text-xs font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        default:
          "bg-violet-600 text-white shadow-sm hover:bg-violet-700 focus:ring-violet-500",
        outline:
          "bg-white border-zinc-300 text-zinc-700 shadow-sm hover:bg-zinc-50 focus:ring-violet-500",
        subtle:
          "bg-violet-100 text-violet-700 hover:bg-violet-200 focus:ring-violet-500",
        ghost: "bg-transparent hover:bg-zinc-100",
        link: "bg-transparent underline-offset-4 hover:underline text-zinc-900 hover:bg-transparent",
      },
      size: {
        default: "h-10 py-2 px-3 text-sm",
        sm: "h-9 px-2 rounded-md",
        lg: "h-11 px-8 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
