import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
          人狼ジャッジメント攻略
        </Link>
        <nav className="flex gap-6 text-sm font-medium">
          <Link
            href="/roles"
            className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
          >
            役職一覧
          </Link>
          <Link
            href="/guide"
            className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
          >
            初心者ガイド
          </Link>
        </nav>
      </div>
    </header>
  );
}
