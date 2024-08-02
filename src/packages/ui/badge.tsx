import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib";

const badgeVariants = cva(
  "inline-flex items-center z-50 rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-white hover:bg-secondary/80",
        success: "border-success bg-success text-white hover:bg-successTint",
        primary: "border-primary bg-primary text-white hover:bg-primaryTint",
        danger: "border-dander bg-danger text-white hover:bg-dander/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
