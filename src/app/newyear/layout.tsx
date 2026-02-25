import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "신년운세",
  description: "올해 한 해의 흐름과 월별 운세를 미리 살펴보세요. 신년운세를 확인해 보세요.",
  openGraph: {
    title: "신년운세",
    description: "올해 한 해의 흐름과 월별 운세를 미리 살펴보세요.",
  },
};

export default function NewYearLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
