import React, { forwardRef } from "react";
import { Ring } from "@uiball/loaders";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

const LoadableButton = forwardRef(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      loading,
      disabled,
      loaderSize = 18,
      children,
      onClick,
      ...props
    },
    ref
  ) => {
    return (
      <Button
        className={cn("flex gap-2", className)}
        variant={variant}
        size={size}
        asChild={asChild}
        ref={ref}
        disabled={loading || disabled}
        {...props}
        onClick={onClick}
      >
        {loading && (
          <Ring size={loaderSize} lineWeight={8} speed={2} color="white" />
        )}
        {children}
      </Button>
    );
  }
);

export { LoadableButton };
