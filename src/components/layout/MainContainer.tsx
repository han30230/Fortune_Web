import * as React from "react";
import { cn } from "@/lib/utils";

export function MainContainer({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
