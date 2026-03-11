import Link from "next/link";
import AdSlot from "./AdSlot";

const popularArticles = [
  { href: "/beginners/how-to-start", title: "人狼ジャッジメントの始め方" },
  { href: "/strategies/fortune-teller-strategy", title: "占い師の基本戦略" },
  { href: "/beginners/basic-rules", title: "基本ルールを覚えよう" },
  { href: "/strategies/werewolf-strategy", title: "人狼の立ち回りガイド" },
  { href: "/glossary", title: "用語集" },
];

export default function Sidebar() {
  return (
    <aside className="space-y-6">
      <AdSlot slot="sidebar-top" />
      <div className="bg-[var(--color-surface)] rounded-lg p-4 border border-[var(--color-border)]">
        <h3 className="font-bold mb-3 text-sm">人気の記事</h3>
        <ul className="space-y-2">
          {popularArticles.map((article) => (
            <li key={article.href}>
              <Link
                href={article.href}
                className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors"
              >
                {article.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <AdSlot slot="sidebar-bottom" />
    </aside>
  );
}
