import Link from "next/link";
import { roles } from "@/data/roles";

export default function Home() {
  const featured = roles.slice(0, 3);

  return (
    <div className="space-y-12">
      <section className="text-center py-12">
        <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-100">
          人狼ジャッジメント攻略
        </h1>
        <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
          役職情報、立ち回りのコツ、初心者向け解説、編成考察をまとめたファンサイトです。
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link
            href="/roles"
            className="rounded-lg bg-zinc-900 px-6 py-3 text-sm font-medium text-white hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
          >
            役職一覧を見る
          </Link>
          <Link
            href="/guide"
            className="rounded-lg border border-zinc-300 px-6 py-3 text-sm font-medium text-zinc-700 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            初心者ガイド
          </Link>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-6">
          注目の役職
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {featured.map((role) => (
            <Link
              key={role.slug}
              href={`/roles/${role.slug}`}
              className="rounded-lg border border-zinc-200 bg-white p-6 hover:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-600"
            >
              <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                {role.team}
              </span>
              <h3 className="mt-1 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                {role.name}
              </h3>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2">
                {role.ability}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
