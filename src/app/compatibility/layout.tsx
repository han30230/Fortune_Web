import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "궁합",
  description: "두 사람의 궁합을 확인하고 관계에 대한 참고 자료를 얻어 보세요.",
  openGraph: {
    title: "궁합",
    description: "두 사람의 궁합을 확인하고 관계에 대한 참고 자료를 얻어 보세요.",
  },
};

export default function CompatibilityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
