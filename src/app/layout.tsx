import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MainContainer } from "@/components/layout/MainContainer";

export const metadata: Metadata = {
  title: {
    default: "Fortune Web | 운세, 사주, 궁합",
    template: "%s | Fortune Web",
  },
  description: "아주 자세한 운세, 사주, 궁합. 오늘의운세, 신년운세, 궁합, 사주풀이를 한곳에서.",
  openGraph: {
    title: "Fortune Web | 운세, 사주, 궁합",
    description: "아주 자세한 운세, 사주, 궁합. 오늘의운세, 신년운세, 궁합, 사주풀이를 한곳에서.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="min-h-screen flex flex-col antialiased">
        <Header />
        <main className="flex-1">
          <MainContainer>{children}</MainContainer>
        </main>
        <Footer />
      </body>
    </html>
  );
}
