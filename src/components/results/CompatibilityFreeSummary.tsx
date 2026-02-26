import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { DummyCompatibilityResult } from "@/types/fortune";
import { Heart } from "lucide-react";

interface CompatibilityFreeSummaryProps {
  data: DummyCompatibilityResult;
  className?: string;
}

/** 무료 요약: 이름, 점수, 한 줄 요약만 표시 */
export function CompatibilityFreeSummary({ data, className }: CompatibilityFreeSummaryProps) {
  return (
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
      <CardContent>
        <p className="leading-relaxed text-muted-foreground">{data.summary}</p>
      </CardContent>
    </Card>
  );
}
