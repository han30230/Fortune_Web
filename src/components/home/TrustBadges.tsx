import { Shield, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

const BADGES = [
  {
    label: "개인정보 저장 안 함",
    description: "이번 단계에서는 입력 내용을 저장하지 않습니다. 안심하고 이용하세요.",
    icon: Shield,
    className: "border-emerald-300 bg-gradient-to-br from-emerald-50 to-teal-50 text-emerald-800 shadow-sm",
    iconClass: "text-emerald-600",
  },
  {
    label: "출생시간 몰라도 가능",
    description: "출생시간을 모르셔도 많은 서비스를 이용할 수 있습니다.",
    icon: Clock,
    className: "border-violet-200 bg-gradient-to-br from-violet-50 to-fuchsia-50 text-violet-800 shadow-sm",
    iconClass: "text-violet-600",
  },
];

export function TrustBadges() {
  return (
    <section className="py-10" aria-labelledby="trust-heading">
      <h2 id="trust-heading" className="sr-only">
        신뢰 요소
      </h2>
      <div className="flex flex-wrap justify-center gap-5">
        {BADGES.map((badge, i) => {
          const Icon = badge.icon;
          return (
            <div
              key={i}
              className={cn(
                "flex max-w-sm items-start gap-4 rounded-xl border-2 px-5 py-4 shadow-sm transition hover:shadow-md",
                badge.className
              )}
            >
              <div
                className={cn(
                  "flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-white/80",
                  badge.iconClass
                )}
              >
                <Icon className="h-5 w-5" aria-hidden />
              </div>
              <div className="text-left">
                <p className="font-semibold text-sm">{badge.label}</p>
                <p className="mt-1 text-xs opacity-90">{badge.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
