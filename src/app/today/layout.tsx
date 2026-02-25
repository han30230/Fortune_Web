import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "오늘의운세",
  description: "오늘 하루의 총운, 재물운, 건강운, 애정운을 확인해 보세요. 생년월일만 입력하면 됩니다.",
  openGraph: {
    title: "오늘의운세",
    description: "오늘 하루의 총운, 재물운, 건강운, 애정운을 확인해 보세요.",
  },
};

export default function TodayLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
