import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const progressVariants = cva("relative w-full overflow-hidden rounded-full", {
  variants: {
    variant: {
      default: "bg-secondary",
      accent: "bg-accent/20",
      muted: "bg-muted",
      score: "bg-gradient-to-r from-destructive/20 via-warning/20 via-success/20 to-accent/20",
    },
    size: {
      default: "h-2",
      sm: "h-1.5",
      lg: "h-3",
      xl: "h-4",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

const indicatorVariants = cva("h-full flex-1 transition-all duration-500 ease-out rounded-full", {
  variants: {
    variant: {
      default: "bg-primary",
      accent: "bg-accent",
      gradient: "bg-gradient-accent",
      score: "bg-gradient-to-r from-destructive via-warning via-success to-accent",
      success: "bg-success",
      warning: "bg-warning",
      destructive: "bg-destructive",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface ProgressProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>,
    VariantProps<typeof progressVariants> {
  indicatorVariant?: VariantProps<typeof indicatorVariants>["variant"];
}

const Progress = React.forwardRef<React.ElementRef<typeof ProgressPrimitive.Root>, ProgressProps>(
  ({ className, value, variant, size, indicatorVariant = "default", ...props }, ref) => (
    <ProgressPrimitive.Root ref={ref} className={cn(progressVariants({ variant, size, className }))} {...props}>
      <ProgressPrimitive.Indicator
        className={cn(indicatorVariants({ variant: indicatorVariant }))}
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  )
);
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
