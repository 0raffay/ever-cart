import * as React from "react";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";

const textareaVariants = cva(
  "flex min-h-[60px] w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 font-medium",
  {
    variants: {
      variant: {
        default: "border-gray-300",
        primary:
          "border-[#999] focus-visible:bg-gray-300 bg-gray-100 min-h-[200px] max-w-[600px] w-full shadow-sm lg:text-[16px] text-[14px] font-medium",
        secondary:
          "focus-visible:bg-[#dadada] shadow-sm border-[#dadada] border-solid bg-white min-h-[200px] max-w-[600px] lg:text-[16px] text-[14px] font-medium",
      },
      size: {
        sm: "text-xs py-1",
        md: "text-sm py-2",
        lg: "text-lg py-3",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

// Define the Textarea component
export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant?: "default" | "primary" | "secondary";
  size?: "sm" | "md" | "lg";
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant, size, value, onChange, ...props }, ref) => {
    return (
      <textarea
        className={cn(textareaVariants({ variant, size }), className)}
        ref={ref}
        value={value}
        onChange={onChange}
        {...props}
      />
    );
  }
);

Textarea.displayName = "Textarea";

export { Textarea };
