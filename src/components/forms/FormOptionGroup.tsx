import type { OptionGroupProps } from "../ui/OptionGroup";
import { OptionGroup } from "../ui/OptionGroup";
import { FormField, useFormField } from "./FormField";
import type {
  UseControllerProps,
  FieldValues,
  ControllerRenderProps,
} from "react-hook-form";
import { useController } from "react-hook-form";

type FormOptionGroupProps<T extends FieldValues> = Omit<
  OptionGroupProps<ControllerRenderProps<T>["value"]>,
  "value" | "onChange"
> &
  UseControllerProps<T>;

const FormOptionGroup = <T extends FieldValues>({
  control,
  name,
  defaultValue,
  rules,
  shouldUnregister,
  ...rest
}: FormOptionGroupProps<T>) => {
  const { formFieldProps, childProps } = useFormField({ ...rest, name });

  const {
    field: { onChange, value },
  } = useController({ control, name, defaultValue, rules, shouldUnregister });

  return (
    <FormField {...formFieldProps}>
      <OptionGroup
        {...childProps}
        label={formFieldProps.label}
        onChange={onChange}
        value={value}
      />
    </FormField>
  );
};

export { FormOptionGroup };
