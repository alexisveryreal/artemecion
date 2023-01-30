import { cn } from "../../utils/cn";
import { forwardRef } from "react";
import type { ComponentProps } from "react";
import { ExclamationCircleIcon } from "@heroicons/react/20/solid";

export interface SelectProps extends ComponentProps<"select"> {
  error?: boolean;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <div className="relative mt-1 rounded-md shadow-sm">
        <select
          {...props}
          className={cn(
            error
              ? "border-red-300 text-red-900 focus:border-red-500 focus:ring-red-500"
              : "border-zinc-300 text-zinc-900 focus:border-violet-500 focus:ring-violet-500",
            "mt-1 block w-full rounded-md py-2 pl-3 pr-10 text-base focus:outline-none sm:text-sm",
            className
          )}
          ref={ref}
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

Select.displayName = "Select";
export { Select };
