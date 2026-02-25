import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { NAV_LINKS } from "@/lib/constants";
import {
  CalendarDays,
  Sparkles,
  Heart,
  BookOpen,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const SERVICE_CONFIG: Record<
  string,
  { description: string; icon: React.ElementType; gradient: string; iconBg: string }
> = {
  "/today": {
    description: "오늘 하루의 총운, 재물운, 건강운, 애정운을 상세히 확인해 보세요.",
    icon: CalendarDays,
    gradient: "from-violet-100 to-fuchsia-50 border-violet-200/60 hover:border-violet-400/50",
    iconBg: "bg-violet-500 text-white",
  },
  "/newyear": {
    description: "올해 한 해의 흐름과 월별 운세를 전문 해석으로 미리 살펴보세요.",
    icon: Sparkles,
    gradient: "from-amber-100 to-orange-50 border-amber-200/60 hover:border-amber-400/50",
    iconBg: "bg-amber-500 text-white",
  },
  "/compatibility": {
    description: "두 사람의 궁합을 깊이 분석하고 관계에 대한 참고 자료를 얻어 보세요.",
    icon: Heart,
    gradient: "from-rose-100 to-pink-50 border-rose-200/60 hover:border-rose-400/50",
    iconBg: "bg-rose-500 text-white",
  },
  "/saju": {
    description: "생년월일시를 바탕으로 사주팔자를 체계적으로 풀어 드립니다.",
    icon: BookOpen,
    gradient: "from-teal-100 to-cyan-50 border-teal-200/60 hover:border-teal-400/50",
    iconBg: "bg-teal-500 text-white",
  },
};

export function ServiceCards() {
  return (
    <section className="py-14" aria-labelledby="services-heading">
      <h2
        id="services-heading"
        className="text-2xl font-bold text-center mb-10 text-foreground"
      >
        서비스 안내
      </h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {NAV_LINKS.map(({ href, label }, i) => {
          const config = SERVICE_CONFIG[href] ?? {
            description: "",
            icon: Sparkles,
            gradient: "from-muted to-muted border-border",
            iconBg: "bg-primary/10 text-primary",
          };
          const Icon = config.icon;
          return (
            <Card
              key={href}
              className={cn(
                "group flex flex-col overflow-hidden border-2 bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-violet-200/30",
                config.gradient
              )}
            >
              <CardHeader className="pb-2">
                <div className={cn("mb-2 flex h-11 w-11 items-center justify-center rounded-xl transition group-hover:scale-105", config.iconBg)}>
                  <Icon className="h-5 w-5" aria-hidden />
                </div>
                <CardTitle className="text-lg text-foreground">{label}</CardTitle>
                <CardDescription className="text-sm leading-relaxed">
                  {config.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="mt-auto pt-0">
                <Button
                  asChild
                  variant="outline"
                  className="w-full rounded-lg border-violet-300 bg-white font-medium text-violet-700 hover:bg-violet-50 hover:border-violet-400 hover:text-violet-800"
                >
                  <Link href={href} className="inline-flex items-center gap-2">
                    {label} 보기
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
