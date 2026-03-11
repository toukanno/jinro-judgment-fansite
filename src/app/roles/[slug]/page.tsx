import { notFound } from "next/navigation";
import Link from "next/link";
import { roles, getRoleBySlug, type Team } from "@/data/roles";

const teamColors: Record<Team, string> = {
  村人陣営: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  人狼陣営: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  第三陣営: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
};

export function generateStaticParams() {
  return roles.map((role) => ({ slug: role.slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  // Note: generateMetadata receives params as a Promise in Next.js 15+
  // but for static generation this works synchronously via generateStaticParams
  return {
    title: `役職詳細 - 人狼ジャッジメント攻略`,
  };
}

export default async function RoleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const role = getRoleBySlug(slug);

  if (!role) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <Link
        href="/roles"
        className="text-sm text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
      >
        &larr; 役職一覧に戻る
      </Link>

      <div>
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
            {role.name}
          </h1>
          <span
            className={`rounded-full px-3 py-1 text-sm font-medium ${teamColors[role.team]}`}
          >
            {role.team}
          </span>
        </div>
        <p className="mt-1 text-zinc-500 dark:text-zinc-400">{role.nameEn}</p>
      </div>

      <section className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
          能力
        </h2>
        <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
          {role.ability}
        </p>
      </section>

      <section className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
          立ち回りのコツ
        </h2>
        <ul className="space-y-2">
          {role.tips.map((tip, i) => (
            <li
              key={i}
              className="flex items-start gap-2 text-zinc-700 dark:text-zinc-300"
            >
              <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-zinc-400" />
              {tip}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
