import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { DummyNewYearResult as DummyNewYearResultType } from "@/types/fortune";
import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";

interface DummyNewYearResultProps {
  data: DummyNewYearResultType;
  className?: string;
}

const MONTH_LABELS: Record<number, string> = {
  1: "1월", 2: "2월", 3: "3월", 4: "4월", 5: "5월", 6: "6월",
  7: "7월", 8: "8월", 9: "9월", 10: "10월", 11: "11월", 12: "12월",
};

export function DummyNewYearResult({ data, className }: DummyNewYearResultProps) {
  const firstSix = data.monthly.slice(0, 6);
  const lastSix = data.monthly.slice(6, 12);
  return (
    <div className={cn("space-y-6", className)}>
      <Card className="overflow-hidden border-2 border-primary/10 bg-gradient-to-br from-amber-50/50 to-background">
        <CardHeader>
          <div className="flex items-center gap-2 text-primary">
            <Sparkles className="h-5 w-5" aria-hidden />
            <CardTitle className="text-lg">{data.year}년 신년운세</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="leading-relaxed text-muted-foreground">{data.summary}</p>
          <div className="rounded-xl border-l-4 border-primary bg-muted/40 p-4">
            <p className="text-sm font-medium text-foreground">{data.advice}</p>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="jan-jun" className="w-full">
        <TabsList className="grid w-full grid-cols-2 rounded-xl border border-border bg-muted/30 p-1">
          <TabsTrigger value="jan-jun" className="rounded-lg font-medium">
            상반기 (1~6월)
          </TabsTrigger>
          <TabsTrigger value="jul-dec" className="rounded-lg font-medium">
            하반기 (7~12월)
          </TabsTrigger>
        </TabsList>
        <TabsContent value="jan-jun" className="space-y-4 pt-4">
          {firstSix.map((m) => (
            <Card key={m.month} className="border-2 border-border/80">
              <CardHeader className="pb-2">
                <CardTitle className="text-base text-foreground">
                  {MONTH_LABELS[m.month] ?? `${m.month}월`}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {m.text}
                </p>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        <TabsContent value="jul-dec" className="space-y-4 pt-4">
          {lastSix.map((m) => (
            <Card key={m.month} className="border-2 border-border/80">
              <CardHeader className="pb-2">
                <CardTitle className="text-base text-foreground">
                  {MONTH_LABELS[m.month] ?? `${m.month}월`}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {m.text}
                </p>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
