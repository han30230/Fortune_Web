"use client";

import { useState, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { FortuneForm } from "@/components/forms/FortuneForm";
import { DummyResultSection } from "@/components/results/DummyResultSection";
import { DummyTodayResult } from "@/components/results/DummyTodayResult";
import { RelatedLinks } from "@/components/service/RelatedLinks";
import { dummyTodayData } from "@/data/dummyToday";
import type { FortuneFormValues } from "@/types/fortune";

function TodayPageContent() {
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
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">오늘의운세</h1>
        <p className="mt-2 text-muted-foreground mb-6">
          생년월일과 성별을 입력하면 오늘의 운세를 확인할 수 있습니다.
        </p>
        <FortuneForm serviceId="today" onSuccess={handleSuccess} />
      </div>
      {showResult && (
        <DummyResultSection title="오늘의 운세 결과">
          <DummyTodayResult data={dummyTodayData} />
        </DummyResultSection>
      )}
      <RelatedLinks currentPath="/today" />
    </div>
  );
}

export default function TodayPage() {
  return (
    <Suspense fallback={<div className="animate-pulse py-8">로딩 중...</div>}>
      <TodayPageContent />
    </Suspense>
  );
}
