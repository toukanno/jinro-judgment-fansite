import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "人狼ジャッジメント 偏見ティア表",
  description: "人狼ジャッジメントの役職に対する偏見・あるあるをティア表にまとめたファンサイト",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="bg-gray-950 text-gray-100 min-h-screen">
        <header className="border-b border-gray-800 bg-gray-900/80 backdrop-blur sticky top-0 z-10">
          <div className="max-w-5xl mx-auto px-4 py-4">
            <h1 className="text-xl font-bold">
              🐺 人狼ジャッジメント 偏見ティア表
            </h1>
          </div>
        </header>
        <main className="max-w-5xl mx-auto px-4 py-8">{children}</main>
        <footer className="border-t border-gray-800 text-center text-sm text-gray-500 py-6">
          ※このサイトはファンメイドです。偏見は半分ネタなので怒らないでください。
        </footer>
      </body>
    </html>
  );
}
