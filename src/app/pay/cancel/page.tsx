import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function PayCancelPage() {
  return (
    <div className="mx-auto max-w-lg space-y-6 rounded-2xl border-2 border-border bg-card p-6 shadow-md sm:p-8">
      <h1 className="text-2xl font-bold text-foreground">결제가 취소되었습니다</h1>
      <p className="text-muted-foreground">
        결제를 취소하셨거나 세션이 만료되었습니다. 궁합 페이지에서 다시 시도할 수 있습니다.
      </p>
      <div className="flex flex-wrap gap-3">
        <Button asChild>
          <Link href="/compatibility">다시 시도</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/">홈으로</Link>
        </Button>
      </div>
    </div>
  );
}
