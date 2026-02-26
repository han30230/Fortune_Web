"use client";

import { useState, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { FortuneForm } from "@/components/forms/FortuneForm";
import { DummyResultSection } from "@/components/results/DummyResultSection";
import { CompatibilityFreeSummary } from "@/components/results/CompatibilityFreeSummary";
import { CompatibilityPaidSection } from "@/components/results/CompatibilityPaidSection";
import { RelatedLinks } from "@/components/service/RelatedLinks";
import { dummyCompatibilityData } from "@/data/dummyCompatibility";
import type { FortuneFormValues } from "@/types/fortune";

function CompatibilityPageContent() {
  const searchParams = useSearchParams();
  const [submittedValues, setSubmittedValues] = useState<FortuneFormValues | null>(null);
  const hasQuery = searchParams.has("birth") || searchParams.has("gender");

  const handleSuccess = useCallback((values: FortuneFormValues) => {
    setSubmittedValues(values);
  }, []);

  const showResult = submittedValues !== null || hasQuery;

  return (
    <div className="space-y-10">
      <div className="rounded-2xl border-2 border-border bg-card p-6 shadow-md sm:p-8">
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">궁합</h1>
        <p className="mt-2 text-muted-foreground mb-6">
          생년월일을 입력하면 궁합 결과를 확인할 수 있습니다. (1단계: 1인 정보만 입력)
        </p>
        <FortuneForm serviceId="compatibility" onSuccess={handleSuccess} />
      </div>
      {showResult && (
        <>
          <DummyResultSection title="무료 요약">
            <div className="space-y-4">
              <CompatibilityFreeSummary data={dummyCompatibilityData} />
            </div>
          </DummyResultSection>
          <DummyResultSection title="상세 분석 (유료)">
            <div className="space-y-4">
              <CompatibilityPaidSection />
            </div>
          </DummyResultSection>
        </>
      )}
      <RelatedLinks currentPath="/compatibility" />
    </div>
  );
}

export default function CompatibilityPage() {
  return (
    <Suspense fallback={<div className="animate-pulse py-8">로딩 중...</div>}>
      <CompatibilityPageContent />
    </Suspense>
  );
}
