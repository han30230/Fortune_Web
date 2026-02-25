import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "사주풀이",
  description: "생년월일시를 바탕으로 사주팔자를 풀어 드립니다. 출생시간을 모르셔도 이용 가능합니다.",
  openGraph: {
    title: "사주풀이",
    description: "생년월일시를 바탕으로 사주팔자를 풀어 드립니다.",
  },
};

export default function SajuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
