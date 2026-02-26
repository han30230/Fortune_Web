import Link from "next/link";
import { stripe } from "@/lib/stripe";
import { Button } from "@/components/ui/button";

interface PageProps {
  searchParams: Promise<{ session_id?: string }> | { session_id?: string };
}

async function getSessionDetails(sessionId: string) {
  if (!stripe) return null;
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items"],
    });
    return {
      payment_status: session.payment_status,
      amount_total: session.amount_total,
      currency: session.currency ?? "krw",
    };
  } catch {
    return null;
  }
}

function formatAmount(amountTotal: number | null, currency: string): string {
  if (amountTotal == null) return "—";
  if (currency.toLowerCase() === "krw") {
    return `₩${(amountTotal / 1).toLocaleString()}`;
  }
  return `${(amountTotal / 100).toFixed(2)} ${currency.toUpperCase()}`;
}

export default async function PaySuccessPage({ searchParams }: PageProps) {
  const params = await Promise.resolve(searchParams);
  const sessionId = params?.session_id;
  const details = sessionId ? await getSessionDetails(sessionId) : null;

  return (
    <div className="mx-auto max-w-lg space-y-6 rounded-2xl border-2 border-border bg-card p-6 shadow-md sm:p-8">
      <h1 className="text-2xl font-bold text-foreground">결제 성공</h1>
      <p className="text-muted-foreground">
        결제가 완료되었습니다. 감사합니다.
      </p>
      {details && (
        <div className="rounded-lg border border-border bg-muted/30 p-4 text-sm">
          <p>
            <span className="text-muted-foreground">결제 상태:</span>{" "}
            {details.payment_status === "paid" ? "완료" : details.payment_status}
          </p>
          <p>
            <span className="text-muted-foreground">결제 금액:</span>{" "}
            {formatAmount(details.amount_total, details.currency)}
          </p>
        </div>
      )}
      <div className="flex flex-wrap gap-3">
        <Button asChild>
          <Link href="/compatibility">궁합 상세 열기 (임시)</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/">홈으로</Link>
        </Button>
      </div>
    </div>
  );
}
