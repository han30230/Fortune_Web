import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { DummyTodayResult as DummyTodayResultType } from "@/types/fortune";
import { cn } from "@/lib/utils";
import { Sparkles, Gift, Clock } from "lucide-react";

interface DummyTodayResultProps {
  data: DummyTodayResultType;
  className?: string;
}

function ScoreRing({ score, label }: { score: number; label: string }) {
  const circumference = 2 * Math.PI * 36;
  const strokeDashoffset = circumference - (score / 100) * circumference;
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative h-20 w-20">
        <svg className="h-20 w-20 -rotate-90" viewBox="0 0 80 80">
          <circle
            cx="40"
            cy="40"
            r="36"
            fill="none"
            stroke="currentColor"
            strokeWidth="6"
            className="text-muted"
          />
          <circle
            cx="40"
            cy="40"
            r="36"
            fill="none"
            stroke="currentColor"
            strokeWidth="6"
            strokeLinecap="round"
            className="text-primary transition-all duration-700"
            style={{
              strokeDasharray: circumference,
              strokeDashoffset,
            }}
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-foreground">
          {score}
        </span>
      </div>
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
    </div>
  );
}

export function DummyTodayResult({ data, className }: DummyTodayResultProps) {
  return (
    <div className={cn("space-y-6", className)}>
      <Card className="overflow-hidden border-2 border-primary/10 bg-gradient-to-br from-amber-50/50 to-background">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2 text-primary">
            <Sparkles className="h-5 w-5" aria-hidden />
            <CardTitle className="text-lg">오늘의 운세 ({data.date})</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="leading-relaxed text-muted-foreground">{data.summary}</p>
          <div className="flex flex-wrap gap-4 rounded-xl bg-muted/50 p-4">
            {data.luckyItem && (
              <div className="flex items-start gap-2">
                <Gift className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    행운의 아이템
                  </p>
                  <p className="text-sm text-foreground">{data.luckyItem}</p>
                </div>
              </div>
            )}
            {data.luckyTime && (
              <div className="flex items-start gap-2">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    행운의 시간
                  </p>
                  <p className="text-sm text-foreground">{data.luckyTime}</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {data.categories.map((cat, i) => (
          <Card
            key={i}
            className="flex flex-col overflow-hidden border-2 border-border/80 transition hover:border-primary/20"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base">{cat.title}</CardTitle>
              {cat.score != null && (
                <ScoreRing score={cat.score} label="점" />
              )}
            </CardHeader>
            <CardContent className="flex-1 pt-0">
              <p className="text-sm leading-relaxed text-muted-foreground">
                {cat.content}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
