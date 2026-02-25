"use client";

import { useState, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { FortuneForm } from "@/components/forms/FortuneForm";
import { DummyResultSection } from "@/components/results/DummyResultSection";
import { DummyNewYearResult } from "@/components/results/DummyNewYearResult";
import { RelatedLinks } from "@/components/service/RelatedLinks";
import { dummyNewYearData } from "@/data/dummyNewYear";
import type { FortuneFormValues } from "@/types/fortune";

function NewYearPageContent() {
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
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">신년운세</h1>
        <p className="mt-2 text-muted-foreground mb-6">
          생년월일을 입력하면 올해 한 해의 운세를 확인할 수 있습니다.
        </p>
        <FortuneForm serviceId="newyear" onSuccess={handleSuccess} />
      </div>
      {showResult && (
        <DummyResultSection title="신년운세 결과">
          <DummyNewYearResult data={dummyNewYearData} />
        </DummyResultSection>
      )}
      <RelatedLinks currentPath="/newyear" />
    </div>
  );
}

export default function NewYearPage() {
  return (
    <Suspense fallback={<div className="animate-pulse py-8">로딩 중...</div>}>
      <NewYearPageContent />
    </Suspense>
  );
}
