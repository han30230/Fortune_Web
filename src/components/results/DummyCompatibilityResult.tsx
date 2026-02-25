import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { DummyCompatibilityResult as DummyCompatibilityResultType } from "@/types/fortune";
import { cn } from "@/lib/utils";
import { Heart } from "lucide-react";

interface DummyCompatibilityResultProps {
  data: DummyCompatibilityResultType;
  className?: string;
}

export function DummyCompatibilityResult({ data, className }: DummyCompatibilityResultProps) {
  return (
    <div className={cn("space-y-6", className)}>
      <Card className="overflow-hidden border-2 border-rose-200/50 bg-gradient-to-br from-rose-50/50 to-background">
        <CardHeader>
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-2 text-foreground">
              <Heart className="h-5 w-5 text-rose-500" aria-hidden />
              <CardTitle className="text-lg">
                {data.names[0]} & {data.names[1]} 궁합
              </CardTitle>
            </div>
            <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-primary bg-primary/10 text-xl font-bold text-primary">
              {data.score}
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="leading-relaxed text-muted-foreground">{data.summary}</p>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {data.sections.map((sec, i) => (
          <Card key={i} className="border-2 border-border/80">
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-foreground">
                {sec.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {sec.content}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
