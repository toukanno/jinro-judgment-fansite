import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import AdSlot from "@/components/AdSlot";
import { getDb } from "@/lib/db";

type Article = { id: number; title: string; slug: string; summary: string };

function getBeginnerArticles(): Article[] {
  const db = getDb();
  return db
    .prepare(
      `SELECT a.id, a.title, a.slug, a.summary
       FROM articles a JOIN article_categories c ON a.category_id = c.id
       WHERE c.slug = 'beginners' AND a.is_published = 1 ORDER BY a.id`
    )
    .all() as Article[];
}

export default function BeginnersPage() {
  const articles = getBeginnerArticles();

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-2">初心者ガイド</h1>
      <p className="text-[var(--color-text-muted)] mb-6">
        人狼ジャッジメントを始めたばかりの方向けのガイド記事です。
      </p>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {articles.map((a, i) => (
            <div key={a.id}>
              <Link
                href={`/beginners/${a.slug}`}
                className="block bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg p-5 hover:border-[var(--color-primary)] transition-colors"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-[var(--color-primary)]">STEP {i + 1}</span>
                </div>
                <h2 className="font-bold mb-1">{a.title}</h2>
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
