import Link from "next/link";
import { NAV_LINKS, ROUTES, SITE_NAME } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-border/80 bg-gradient-to-b from-muted/40 to-muted/20">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-primary/80">
              면책 고지
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              본 서비스는 오락 및 참고 목적으로만 제공됩니다. 중요한 결정은 전문가와 상담하시기 바랍니다.
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-primary/80">
              개인정보
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              이번 단계에서는 개인정보를 저장하지 않습니다. 입력하신 내용은 결과 표시용으로만 사용됩니다.
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-primary/80">
              서비스
            </p>
            <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm">
              <li>
                <Link href={ROUTES.today} className="text-muted-foreground transition hover:text-primary">
                  오늘의운세
                </Link>
              </li>
              <li>
                <Link href={ROUTES.newyear} className="text-muted-foreground transition hover:text-primary">
                  신년운세
                </Link>
              </li>
              <li>
                <Link href={ROUTES.compatibility} className="text-muted-foreground transition hover:text-primary">
                  궁합
                </Link>
              </li>
              <li>
                <Link href={ROUTES.saju} className="text-muted-foreground transition hover:text-primary">
                  사주풀이
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <p className="mt-8 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
