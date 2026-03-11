import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "人狼ジャッジメント ファンサイト",
  description:
    "人狼ジャッジメントの役職情報、立ち回り、初心者向け解説、編成考察をまとめるファンサイトです。",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
