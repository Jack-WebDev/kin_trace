import { cn } from "@/lib";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const loaderVariants = cva(
  "animate-spin rounded-full border-b-2 border-blue-500 mx-auto",
  {
    variants: {
      size: {
        small: "h-16 w-16",
        xs: "h-4 w-4",
      },
    },
    defaultVariants: {
      size: "small",
    },
  },
);

export interface LoaderProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof loaderVariants> {
  asChild?: boolean;
  fullScreen?: boolean;
}

const Loader = React.forwardRef<HTMLDivElement, LoaderProps>(
  ({ className, fullScreen, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : ("div" as any);
    if (fullScreen) {
      return (
        <div className="h-screen w-screen grid place-items-center">
          <div>
            <Comp
              className={cn(loaderVariants({ className }))}
              ref={ref}
              {...props}
            />
          </div>
        </div>
      );
    }
    return (
      <Comp
        className={cn(loaderVariants({ className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Loader.displayName = "Loader";

export { Loader, loaderVariants };
