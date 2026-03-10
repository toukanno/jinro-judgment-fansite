import './globals.css';

export const metadata = {
  title: '人狼ジャッジメント ファンサイト',
  description: '人狼ジャッジメントの役職情報、立ち回り、初心者向け解説、編成考察をまとめるファンサイトです。',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body>
        <header>
          <div className="container">
            <h1><a href="/">人狼ジャッジメント ファンサイト</a></h1>
          </div>
        </header>
        <main className="container">
          {children}
        </main>
        <footer>
          <div className="container">
            <p>人狼ジャッジメント ファンサイト &copy; 2026 — 非公式ファンサイトです</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
