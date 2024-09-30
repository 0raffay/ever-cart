import * as React from "react";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";

const inputVariants = cva(
  "flex w-full rounded-md bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50", // Base styles
  {
    variants: {
      size: {
        sm: "h-8 px-2 min-w-[250px]",
        md: "h-10 px-3 min-w-[290px]",
        lg: "h-12 px-4 min-w-[300px]",
      },
      variant: {
        primary:
          "bg-white text-black rounded-sm leading-1 shadow-sm text-[15px] font-[500]",
        secondary:
          "border border-black border-solid text-[15px] font-[500] bg-white text-black",
        tertiary:
          "border border-[#666] border-solid text-[15px] font-[500] bg-white shadow-sm rounded-sm",
      },
    },
    defaultVariants: {
      size: "md",
      variant: "primary",
    },
  }
);

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  size?: "sm" | "md" | "lg"; // Define size prop
  variant?: "primary" | "secondary" | "tertiary"; // Define border variant prop
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, size, variant, ...props }, ref) => {
    return (
      <input
        className={cn(inputVariants({ size, variant }), className)}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };
