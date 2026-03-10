import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-secondary border-b border-custom">
      <nav className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-accent-light hover:text-accent transition-colors">
          人狼ジャッジメント攻略
        </Link>
        <ul className="flex gap-6 text-sm">
          <li>
            <Link href="/roles" className="text-muted hover:text-white transition-colors">
              役職一覧
            </Link>
          </li>
          <li>
            <Link href="/guide" className="text-muted hover:text-white transition-colors">
              初心者ガイド
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
