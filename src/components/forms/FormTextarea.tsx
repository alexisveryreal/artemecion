import { forwardRef } from "react";
import { Textarea } from "../ui/Textarea";
import type { TextareaProps } from "../ui/Textarea";
import type { UseFormFieldProps } from "./FormField";
import { FormField, useFormField } from "./FormField";
import { useFormContext } from "react-hook-form";

type FormTextareaProps<T> = UseFormFieldProps<T> &
  TextareaProps & {
    name: string;
  };

const FormTextarea = forwardRef<
  HTMLTextAreaElement,
  FormTextareaProps<unknown>
>((props, ref) => {
  const { formFieldProps, childProps } = useFormField(props);
  const {
    formState: { errors },
  } = useFormContext();

  return (
    <FormField {...formFieldProps}>
      <Textarea {...childProps} error={!!errors[childProps.name]} ref={ref} />
    </FormField>
  );
});

FormTextarea.displayName = "Formtextarea";

export { FormTextarea };
