import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '人狼ジャッジメント ファンサイト',
  description:
    '人狼ジャッジメントのキャラクター情報・ステータス・評価を網羅したファンサイト',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="min-h-screen">
        <header className="border-b border-gray-800 bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
            <a href="/" className="text-xl font-bold tracking-tight">
              <span className="text-red-500">人狼</span>
              <span className="text-gray-300">ジャッジメント</span>
              <span className="text-gray-500 text-sm ml-2">Fan Site</span>
            </a>
            <nav className="flex gap-6 text-sm">
              <a
                href="/"
                className="text-gray-400 hover:text-gray-100 transition-colors"
              >
                ホーム
              </a>
              <a
                href="/characters"
                className="text-gray-400 hover:text-gray-100 transition-colors"
              >
                キャラクター
              </a>
              <a
                href="/status"
                className="text-gray-400 hover:text-gray-100 transition-colors"
              >
                ステータス比較
              </a>
            </nav>
          </div>
        </header>
        <main className="max-w-6xl mx-auto px-4 py-8">{children}</main>
        <footer className="border-t border-gray-800 mt-16">
          <div className="max-w-6xl mx-auto px-4 py-8 text-center text-gray-500 text-sm">
            <p>人狼ジャッジメント ファンサイト - 非公式</p>
            <p className="mt-1">
              このサイトはファンによる非公式サイトです。
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
