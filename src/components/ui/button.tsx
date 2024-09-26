import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap font-[600] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 uppercase leading-[1]",
  {
    variants: {
      variant: {
        primary:
          "bg-black hover:bg-white hover:border-black hover:border hover:text-black text-white",
        secondary:
          "bg-[#F2F5F6] text-black hover:bg-black hover:border hover:text-white",
        icon: "bg-tranparent",
      },
      size: {
        default: "h-[45px] min-w-[200px] text-[16px]",
        sm: "h-[40px] text-[16px] min-w-[150px]",
        md: "h-[45px] text-[16px] min-w-[180px]",
        lg: "h-[55px] rounded-md min-w-[200px] text-[16px]",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      isLoading,
      asChild = false,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {isLoading ? <Loader2 className="animate-spin" /> : children}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
