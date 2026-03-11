import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import AdSlot from "@/components/AdSlot";

const features = [
  { href: "/roles", title: "役職一覧", desc: "全役職の能力・勝利条件を詳しく解説", color: "var(--color-primary)" },
  { href: "/beginners", title: "初心者ガイド", desc: "始め方からルールまで丁寧に解説", color: "var(--color-village)" },
  { href: "/strategies", title: "攻略・戦略", desc: "勝率を上げるためのテクニック集", color: "var(--color-wolf)" },
  { href: "/compositions", title: "構成考察", desc: "人数別のおすすめ構成を紹介", color: "var(--color-fox)" },
  { href: "/glossary", title: "用語集", desc: "人狼ジャッジメントの専門用語を解説", color: "var(--color-lover)" },
  { href: "/faq", title: "よくある質問", desc: "初心者の疑問にお答えします", color: "#4AD9A0" },
];

export default function Home() {
  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <section className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          人狼ジャッジメント攻略ファンサイト
        </h1>
        <p className="text-[var(--color-text-muted)] max-w-2xl mx-auto">
          役職情報、攻略戦略、初心者ガイド、構成考察まで。
          人狼ジャッジメントを楽しむための情報を網羅的にまとめています。
        </p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((f) => (
              <Link
                key={f.href}
                href={f.href}
                className="block bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg p-6 hover:border-[var(--color-primary)] transition-colors"
              >
                <h2 className="text-lg font-bold mb-2" style={{ color: f.color }}>
                  {f.title}
                </h2>
                <p className="text-sm text-[var(--color-text-muted)]">{f.desc}</p>
              </Link>
            ))}
          </div>

          <AdSlot slot="in-content" />

          <section>
            <h2 className="text-xl font-bold mb-4">最新記事</h2>
            <div className="space-y-3">
              {[
                { href: "/beginners/how-to-start", title: "人狼ジャッジメントの始め方", cat: "初心者" },
                { href: "/strategies/fortune-teller-strategy", title: "占い師の基本戦略", cat: "攻略" },
                { href: "/beginners/basic-rules", title: "基本ルールを覚えよう", cat: "初心者" },
                { href: "/strategies/werewolf-strategy", title: "人狼の立ち回りガイド", cat: "攻略" },
              ].map((a) => (
                <Link
                  key={a.href}
                  href={a.href}
                  className="flex items-center gap-3 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg p-4 hover:border-[var(--color-primary)] transition-colors"
                >
                  <span className="text-xs px-2 py-1 rounded bg-[var(--color-surface-alt)] text-[var(--color-text-muted)]">
                    {a.cat}
                  </span>
                  <span className="text-sm">{a.title}</span>
                </Link>
              ))}
            </div>
          </section>
        </div>
        <Sidebar />
      </div>
    </main>
  );
}
