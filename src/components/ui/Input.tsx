import { cn } from "../../utils/cn";
import { forwardRef } from "react";
import type { ComponentProps } from "react";
import { ExclamationCircleIcon } from "@heroicons/react/20/solid";

export interface InputProps extends ComponentProps<"input"> {
  error?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <div className="relative mt-1 rounded-md shadow-sm">
        <input
          className={cn(
            error
              ? "border-red-300 pr-10 text-red-900 focus:border-red-500 focus:ring-red-500"
              : "border-zinc-300 pr-0 text-zinc-900 focus:border-violet-500 focus:ring-violet-500",
            "block w-full rounded-md text-base disabled:cursor-not-allowed disabled:border-zinc-200 disabled:bg-zinc-50 disabled:text-zinc-500 sm:text-sm",
            className
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <ExclamationCircleIcon
              className="h-5 w-5 text-red-500"
              aria-hidden="true"
            />
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
