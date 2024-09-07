import { Control, Controller } from "react-hook-form";
import { FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ReactNode } from "react";

interface FormFieldComponentProps {
  name: string;
  label: string;
  placeholder?: string;
  control: Control<any>;
  render?: (field: any) => ReactNode;
}

export function FormFieldComponent({
  name,
  label,
  placeholder,
  control,
  render = (field) => <Input placeholder={placeholder} {...field} />,
}: FormFieldComponentProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>{render(field)}</FormControl>
          <FormMessage>{fieldState.error?.message}</FormMessage>
        </FormItem>
      )}
    />
  );
}
