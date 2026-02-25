import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4">
      <p className="text-6xl font-bold text-muted-foreground">404</p>
      <p className="text-muted-foreground">페이지를 찾을 수 없습니다.</p>
      <Button asChild>
        <Link href="/">홈으로 가기</Link>
      </Button>
    </div>
  );
}
