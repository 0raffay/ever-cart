import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";

interface LabelProps {
  htmlFor?: string;
  children: React.ReactNode; 
  className?: string; 
  variant?: "primary" | "secondary"; 
  size?: "sm" | "md" | "lg"; 
}

const Label = ({
  htmlFor,
  children,
  className,
  variant,
  size,
  ...props
}: LabelProps) => {
  const labelStyles = cva("font-medium mb-2 capitalize leading-1", {
    variants: {
      variant: {
        primary: "text-black lg:text-[16px] text-[14px]",
        secondary: "text-gray-400 lg:text-[16px] text-[14px]",
      },
      size: {
        sm: "lg:text-[14px] text-[12px]",
        md: "lg:text-[16px] text-[14px]",
        lg: "lg:text-[18px] text-[16px]",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  });

  return (
    <label
      {...props}
      htmlFor={htmlFor}
      className={cn(labelStyles({ variant, size }), className)}
    >
      {children}
    </label>
  );
};

export default Label;
