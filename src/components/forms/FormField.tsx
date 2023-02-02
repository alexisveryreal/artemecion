import type { PropsWithChildren } from "react";
import { useFormContext } from "react-hook-form";
import { cn } from "../../utils/cn";

export type UseFormFieldProps<T> = PropsWithChildren<{
  name: string;
  label: string;
  cornerHint?: string;
}> &
  T;

export const useFormField = <T, P extends UseFormFieldProps<T>>(props: P) => {
  const { label, name, cornerHint, ...otherProps } = props;
  const id = name;

  return {
    formFieldProps: { id, name, label, cornerHint },
    childProps: { ...otherProps, id, name },
  };
};

export type FormFieldProps<T> = UseFormFieldProps<T> & {
  id: string;
};

const FormField = <T,>({
  label,
  name,
  children,
  cornerHint,
}: FormFieldProps<T>) => {
  const ctx = useFormContext();
  const state = ctx.getFieldState(name);

  return (
    <div>
      <div className={cn(cornerHint ? "flex justify-between" : "")}>
        <label
          htmlFor={name}
          className="block text-sm font-medium text-zinc-700"
        >
          {label}
        </label>
        {cornerHint && (
          <span className="text-sm text-zinc-500">{cornerHint}</span>
        )}
      </div>
      {children}
      {state.error && (
        <p className="mt-2 text-sm text-red-600">{state.error.message}</p>
      )}
    </div>
  );
};

export { FormField };
