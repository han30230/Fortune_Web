"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";

const CHECKOUT_API = "/api/checkout/compatibility";

/** 상세 분석(유료) 잠금 영역 + 결제 시작 버튼 */
export function CompatibilityPaidSection() {
  const [loading, setLoading] = useState(false);

  const priceLabel =
    typeof process.env.NEXT_PUBLIC_COMPATIBILITY_PRICE_LABEL === "string" &&
    process.env.NEXT_PUBLIC_COMPATIBILITY_PRICE_LABEL
      ? process.env.NEXT_PUBLIC_COMPATIBILITY_PRICE_LABEL
      : "유료";

  const handleStartCheckout = async () => {
    setLoading(true);
    try {
      const res = await fetch(CHECKOUT_API, { method: "POST" });
      const body = await res.json();
      if (!res.ok) {
        console.error("Checkout error:", body);
        alert(body.error ?? "결제 시작에 실패했습니다.");
        return;
      }
      if (body.url) {
        window.location.href = body.url;
        return;
      }
      alert("결제 URL을 받지 못했습니다.");
    } catch (e) {
      console.error(e);
      alert("결제 시작 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="border-2 border-border/80 bg-muted/30">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <Lock className="h-4 w-4 text-muted-foreground" aria-hidden />
          <CardTitle className="text-base text-foreground">상세 분석 (유료)</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          기본 궁합, 감정·애정, 소통·협력, 금전·생활, 조언 및 주의사항 등 상세 내용을 확인하려면 결제가 필요합니다.
        </p>
        <Button
          onClick={handleStartCheckout}
          disabled={loading}
          className="min-w-[180px]"
        >
          {loading ? "결제 페이지로 이동 중…" : `상세 보기 (${priceLabel})`}
        </Button>
      </CardContent>
    </Card>
  );
}
