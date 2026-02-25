import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { DummySajuResult as DummySajuResultType } from "@/types/fortune";
import { cn } from "@/lib/utils";
import { BookOpen } from "lucide-react";

interface DummySajuResultProps {
  data: DummySajuResultType;
  className?: string;
}

export function DummySajuResult({ data, className }: DummySajuResultProps) {
  return (
    <div className={cn("space-y-6", className)}>
      <Card className="overflow-hidden border-2 border-primary/10 bg-gradient-to-br from-slate-50/50 to-background">
        <CardHeader>
          <div className="flex items-center gap-2 text-primary">
            <BookOpen className="h-5 w-5" aria-hidden />
            <CardTitle className="text-lg">사주풀이 결과 ({data.birthDate})</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {data.pillars && data.pillars.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {data.pillars.map((p, i) => (
                <span
                  key={i}
                  className="rounded-lg border-2 border-primary/20 bg-primary/5 px-3 py-1.5 text-sm font-medium text-foreground"
                >
                  {p.name}: {p.value}
                </span>
              ))}
            </div>
          )}
          <p className="leading-relaxed text-muted-foreground">{data.summary}</p>
        </CardContent>
      </Card>

      <Accordion type="single" collapsible className="w-full space-y-2">
        {data.details.map((d, i) => (
          <AccordionItem
            key={i}
            value={`item-${i}`}
            className="rounded-xl border-2 border-border/80 px-4 data-[state=open]:bg-muted/30"
          >
            <AccordionTrigger className="py-4 text-left font-semibold hover:no-underline hover:text-primary">
              {d.title}
            </AccordionTrigger>
            <AccordionContent className="pb-4">
              <p className="text-sm leading-relaxed text-muted-foreground">
                {d.content}
              </p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
