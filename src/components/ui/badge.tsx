import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground shadow-sm",
        secondary: "border-transparent bg-secondary text-secondary-foreground",
        destructive: "border-transparent bg-destructive text-destructive-foreground shadow-sm",
        outline: "text-foreground border-border",
        success: "border-transparent bg-success/10 text-success",
        warning: "border-transparent bg-warning/10 text-warning",
        info: "border-transparent bg-info/10 text-info",
        accent: "border-transparent bg-accent/10 text-accent",
        premium: "border-transparent bg-gradient-primary text-primary-foreground shadow-sm",
        // Score-based badges
        "score-low": "border-transparent bg-destructive/10 text-destructive",
        "score-medium": "border-transparent bg-warning/10 text-warning",
        "score-good": "border-transparent bg-success/10 text-success",
        "score-excellent": "border-transparent bg-accent/10 text-accent",
        // Status badges
        pending: "border-transparent bg-warning/10 text-warning",
        active: "border-transparent bg-success/10 text-success",
        completed: "border-transparent bg-accent/10 text-accent",
        cancelled: "border-transparent bg-destructive/10 text-destructive",
      },
      size: {
        default: "px-3 py-1 text-xs",
        sm: "px-2 py-0.5 text-[10px]",
        lg: "px-4 py-1.5 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant, size }), className)} {...props} />;
}

export { Badge, badgeVariants };
