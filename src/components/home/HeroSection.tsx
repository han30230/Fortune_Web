import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CTA_LINK } from "@/lib/constants";
import { Sparkles } from "lucide-react";

export function HeroSection() {
  return (
    <section
      className="hero-gradient relative overflow-hidden rounded-2xl py-20 md:py-28 text-center"
      aria-labelledby="hero-heading"
    >
      <div className="absolute inset-0 hero-pattern opacity-40" aria-hidden />
      <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/50 to-transparent pointer-events-none" />
      <div className="relative mx-auto max-w-3xl px-4">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-violet-700 shadow-lg shadow-violet-200/50 ring-1 ring-violet-200/60">
          <Sparkles className="h-4 w-4 text-amber-500" aria-hidden />
          <span>운세 · 신년운세 · 궁합 · 사주풀이, 한곳에서</span>
        </div>
        <h1
          id="hero-heading"
          className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl"
        >
          <span className="hero-headline">당신만의 운세를</span>
          <br />
          <span className="hero-headline-end">한눈에 만나보세요</span>
        </h1>
        <p className="mx-auto mt-6 max-w-lg text-lg leading-relaxed text-slate-600">
          생년월일만 입력하면{" "}
          <span className="font-semibold text-slate-800">오늘의 운세</span>,{" "}
          <span className="font-semibold text-slate-800">신년운세</span>,{" "}
          <span className="font-semibold text-slate-800">궁합</span>,{" "}
          <span className="font-semibold text-slate-800">사주풀이</span>를
          <br className="hidden sm:block" />
          한곳에서 확인할 수 있어요. 출생시간을 모르셔도 괜찮습니다.
        </p>
        <Button
          asChild
          size="lg"
          className="mt-8 h-12 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-500 px-8 text-base font-semibold text-white shadow-xl shadow-violet-400/30 transition hover:shadow-2xl hover:shadow-violet-400/40 hover:opacity-95"
        >
          <Link href={CTA_LINK}>무료로 운세 보기</Link>
        </Button>
      </div>
    </section>
  );
}
