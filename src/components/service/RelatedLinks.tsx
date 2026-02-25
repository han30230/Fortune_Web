import Link from "next/link";
import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface RelatedLinksProps {
  currentPath: string;
  className?: string;
}

export function RelatedLinks({ currentPath, className }: RelatedLinksProps) {
  const links = NAV_LINKS.filter(({ href }) => href !== currentPath);
  return (
    <nav
      className={cn("border-t pt-8 mt-8", className)}
      aria-label="관련 서비스"
    >
      <h3 className="text-sm font-medium text-muted-foreground mb-3">관련 서비스</h3>
      <ul className="flex flex-wrap gap-4">
        {links.map(({ href, label }) => (
          <li key={href}>
            <Link
              href={href}
              className="text-sm font-medium text-primary hover:underline underline-offset-4"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
