import type { PropsWithChildren } from "react";
import { useFormContext } from "react-hook-form";

export type UseFormFieldProps<T> = PropsWithChildren<{
  name: string;
  label: string;
}> &
  T;

export const useFormField = <T, P extends UseFormFieldProps<T>>(props: P) => {
  const { label, name, ...otherProps } = props;
  const id = name;

  return {
    formFieldProps: { id, name, label },
    childProps: { ...otherProps, id, name },
  };
};

export type FormFieldProps<T> = UseFormFieldProps<T> & {
  id: string;
};

const FormField = <T,>({ label, name, children }: FormFieldProps<T>) => {
  const ctx = useFormContext();
  const state = ctx.getFieldState(name);

  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-zinc-700">
        {label}
      </label>
      {children}
      {state.error && (
        <p className="mt-2 text-sm text-red-600">{state.error.message}</p>
      )}
    </div>
  );
};

export { FormField };
