import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const inputVariants = cva(
  "flex w-full rounded-lg border bg-background text-foreground ring-offset-background transition-all duration-200 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "border-input hover:border-accent/50",
        accent: "border-accent/30 focus-visible:ring-accent hover:border-accent",
        ghost: "border-transparent bg-muted hover:bg-muted/80",
        premium: "border-primary/20 bg-primary/5 focus-visible:ring-primary hover:border-primary/40",
      },
      inputSize: {
        default: "h-10 px-4 py-2 text-sm",
        sm: "h-9 px-3 py-1 text-xs",
        lg: "h-12 px-5 py-3 text-base",
        xl: "h-14 px-6 py-4 text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      inputSize: "default",
    },
  }
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant, inputSize, ...props }, ref) => {
    return (
      <input type={type} className={cn(inputVariants({ variant, inputSize, className }))} ref={ref} {...props} />
    );
  }
);
Input.displayName = "Input";

export { Input, inputVariants };
