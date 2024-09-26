import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "./ui/select";
import { cva } from "class-variance-authority";

interface OptionsProps {
  label: string | number;
  value: string | number;
}

interface SelectProps {
  options: OptionsProps[];
  placeholder?: string;
  variant?: "default" | "primary" | "secondary";
  onChange: (value: string | number) => void;
  size?: "sm" | "md" | "lg";
  styles?: { trigger?: string; content?: string };
}

const selectTriggerVariants = cva(
  "rounded-md focus:outline-none transition-colors",
  {
    variants: {
      variant: {
        default: "bg-white border border-gray-300 hover:bg-gray-100",
        primary:
          "text-black bg-white shadow-sm min-w-[250px] w-full border border-[#999] hover:bg-[#999]",
        secondary:
          "bg-gray-100 text-black border border-gray-400 hover:bg-gray-200 min-w-[250px] lg:text-[16px] text-[14px]",
      },
      size: {
        sm: "text-sm py-1 px-2",
        md: "text-base py-2 px-3",
        lg: "text-lg py-3 px-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

const CustomSelect = ({
  options = [],
  placeholder = "Select an option",
  onChange,
  variant = "default",
  size = "md",
  styles = {},
  ...props
}: SelectProps) => {
  return (
    <Select onValueChange={onChange} {...props}>
      <SelectTrigger
        className={`${selectTriggerVariants({ variant, size })} ${
          styles.trigger || ""
        }`}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent
        className={`${
          styles.content ||
          "bg-white border border-gray-300 rounded-md shadow-lg min-w-[164px]"
        }`}
      >
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CustomSelect;
