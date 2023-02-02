import { forwardRef } from "react";
import { Select } from "../ui/Select";
import type { SelectProps } from "../ui/Select";
import type { UseFormFieldProps } from "./FormField";
import { FormField, useFormField } from "./FormField";
import { useFormContext } from "react-hook-form";

type FormSelectProps<T> = UseFormFieldProps<T> & SelectProps & { name: string };

const FormSelect = forwardRef<HTMLSelectElement, FormSelectProps<unknown>>(
  (props, ref) => {
    const { childProps, formFieldProps } = useFormField(props);
    const {
      formState: { errors },
    } = useFormContext();

    return (
      <FormField {...formFieldProps}>
        <Select {...childProps} error={!!errors[childProps.name]} ref={ref} />
      </FormField>
    );
  }
);

FormSelect.displayName = "FormSelect";
export { FormSelect };
