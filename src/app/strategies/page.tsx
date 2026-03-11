import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import AdSlot from "@/components/AdSlot";
import { getDb } from "@/lib/db";

type Article = { id: number; title: string; slug: string; summary: string; difficulty: number };

function getStrategyArticles(): Article[] {
  const db = getDb();
  return db
    .prepare(
      `SELECT a.id, a.title, a.slug, a.summary, a.difficulty
       FROM articles a JOIN article_categories c ON a.category_id = c.id
       WHERE c.slug = 'strategies' AND a.is_published = 1 ORDER BY a.id`
    )
    .all() as Article[];
}

const diffLabel = ["", "初級", "中級", "上級"];

export default function StrategiesPage() {
  const articles = getStrategyArticles();

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">攻略・戦略</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {articles.map((a, i) => (
            <div key={a.id}>
              <Link
                href={`/strategies/${a.slug}`}
                className="block bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg p-5 hover:border-[var(--color-primary)] transition-colors"
              >
                <div className="flex items-center gap-2 mb-2">
                  <h2 className="font-bold">{a.title}</h2>
                  <span className="text-xs px-2 py-0.5 rounded bg-[var(--color-surface-alt)] text-[var(--color-text-muted)]">
                    {diffLabel[a.difficulty]}
                  </span>
                </div>
                <p className="text-sm text-[var(--color-text-muted)]">{a.summary}</p>
              </Link>
              {i === 1 && <AdSlot slot="in-content" className="mt-4" />}
            </div>
          ))}
        </div>
        <Sidebar />
      </div>
    </main>
  );
}
