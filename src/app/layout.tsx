import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AdSlot from "@/components/AdSlot";
import "./globals.css";

export const metadata: Metadata = {
  title: "人狼ジャッジメント攻略ファンサイト",
  description:
    "人狼ジャッジメントの役職情報、攻略、初心者向け解説、構成考察をまとめたファンサイトです。",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-4">
          <AdSlot slot="header" className="mb-4" />
        </div>
        {children}
        <Footer />
      </body>
    </html>
  );
}
