"use client";

import Link from "next/link";
import { NAV_LINKS, CTA_LINK, SITE_NAME } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import { useState } from "react";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/80 bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-bold tracking-tight text-foreground transition hover:opacity-90"
          aria-label={`${SITE_NAME} 홈`}
        >
          <span className="gradient-text">{SITE_NAME}</span>
        </Link>

        <nav
          className="hidden md:flex md:items-center md:gap-1"
          aria-label="메인 네비게이션"
        >
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            asChild
            size="sm"
            className="hidden md:inline-flex rounded-lg bg-gradient-to-r from-violet-600 to-fuchsia-500 font-medium text-white shadow-md shadow-violet-300/40 hover:opacity-90"
          >
            <Link href={CTA_LINK}>무료로 보기</Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="메뉴 열기"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div
        id="mobile-nav"
        className={cn(
          "border-t md:hidden",
          mobileOpen ? "block" : "hidden"
        )}
        role="region"
        aria-label="모바일 메뉴"
      >
        <nav className="flex flex-col gap-1 px-4 py-3" aria-label="모바일 네비게이션">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="rounded-md px-3 py-2 text-sm font-medium hover:bg-accent"
              onClick={() => setMobileOpen(false)}
            >
              {label}
            </Link>
          ))}
          <Link
            href={CTA_LINK}
            className="rounded-md px-3 py-2 text-sm font-medium text-primary hover:bg-accent"
            onClick={() => setMobileOpen(false)}
          >
            무료로 보기
          </Link>
        </nav>
      </div>
    </header>
  );
}
