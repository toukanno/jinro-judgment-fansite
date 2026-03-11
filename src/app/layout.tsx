import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "人狼ジャッジメント攻略 - 役職・立ち回り・編成まとめ",
  description:
    "人狼ジャッジメントの役職情報、立ち回り、初心者向け解説、編成考察をまとめるファンサイトです。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="antialiased bg-zinc-50 dark:bg-zinc-950 font-sans">
        <Header />
        <main className="mx-auto max-w-5xl px-4 py-8">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
