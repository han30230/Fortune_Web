import * as React from "react";
import { cn } from "@/lib/utils";

const RESULT_ANCHOR_ID = "result";

export function DummyResultSection({
  className,
  children,
  title = "결과",
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { title?: string }) {
  return (
    <section
      id={RESULT_ANCHOR_ID}
      className={cn(
        "scroll-mt-6 rounded-2xl border-2 border-border bg-gradient-to-b from-card to-muted/30 p-6 shadow-lg sm:p-8",
        className
      )}
      aria-labelledby="result-heading"
      {...props}
    >
      <div className="mb-6 flex items-center gap-3 border-b border-primary/20 pb-4">
        <div className="h-1 w-12 rounded-full bg-primary" aria-hidden />
        <h2 id="result-heading" className="text-xl font-bold text-foreground sm:text-2xl">
          {title}
        </h2>
      </div>
      <div className="prose-fortune max-w-none">{children}</div>
    </section>
  );
}
