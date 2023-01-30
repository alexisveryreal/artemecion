import { cn } from "../../utils/cn";
import { RadioGroup } from "@headlessui/react";

export type Options = {
  name: string;
  description: string;
};

export interface OptionGroupProps<TVal> {
  value?: TVal;
  onChange: () => void;
  options: Options[];
  label: string;
}

const OptionGroup = <TVal,>({
  onChange,
  options,
  value,
  label,
}: OptionGroupProps<TVal>) => {
  return (
    <RadioGroup value={value} onChange={onChange} className="mt-2">
      <RadioGroup.Label className="sr-only"> {label} </RadioGroup.Label>
      <div className="-space-y-px rounded-md bg-white">
        {options.map((option, optionIdx) => (
          <RadioGroup.Option
            key={option.name}
            value={option.name}
            className={({ checked }) =>
              cn(
                optionIdx === 0 ? "rounded-tl-md rounded-tr-md" : "",
                optionIdx === options.length - 1
                  ? "rounded-bl-md rounded-br-md"
                  : "",
                checked
                  ? "z-10 border-violet-200 bg-violet-50"
                  : "border-zinc-200",
                "relative flex cursor-pointer border p-4 focus:outline-none"
              )
            }
          >
            {({ active, checked }) => (
              <>
                <span
                  className={cn(
                    checked
                      ? "border-transparent bg-violet-600"
                      : "border-zinc-300 bg-white",
                    active ? "ring-2 ring-violet-500 ring-offset-2" : "",
                    "mt-0.5 flex h-4 w-4 shrink-0 cursor-pointer items-center justify-center rounded-full border"
                  )}
                  aria-hidden="true"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-white" />
                </span>
                <span className="ml-3 flex flex-col">
                  <RadioGroup.Label
                    as="span"
                    className={cn(
                      checked ? "text-violet-900" : "text-zinc-900",
                      "block text-sm font-medium"
                    )}
                  >
                    {option.name}
                  </RadioGroup.Label>
                  <RadioGroup.Description
                    as="span"
                    className={cn(
                      checked ? "text-violet-700" : "text-zinc-500",
                      "block text-sm"
                    )}
                  >
                    {option.description}
                  </RadioGroup.Description>
                </span>
              </>
            )}
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  );
};

export { OptionGroup };
