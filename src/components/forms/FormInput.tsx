import { forwardRef } from "react";
import { Input } from "../ui/Input";
import type { InputProps } from "../ui/Input";
import type { UseFormFieldProps } from "./FormField";
import { FormField, useFormField } from "./FormField";
import { useFormContext } from "react-hook-form";

type FormInputProps<T> = UseFormFieldProps<T> &
  InputProps & {
    name: string;
  };

const FormInput = forwardRef<HTMLInputElement, FormInputProps<unknown>>(
  (props, ref) => {
    const { formFieldProps, childProps } = useFormField(props);
    const {
      formState: { errors },
    } = useFormContext();

    return (
      <FormField {...formFieldProps}>
        <Input {...childProps} error={!!errors[childProps.name]} ref={ref} />
      </FormField>
    );
  }
);

FormInput.displayName = "FormInput";

export { FormInput };
