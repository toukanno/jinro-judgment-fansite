import { notFound } from "next/navigation";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import AdSlot from "@/components/AdSlot";
import { getDb } from "@/lib/db";

type Article = { id: number; title: string; slug: string; summary: string; content: string };

function getArticle(slug: string): Article | undefined {
  const db = getDb();
  return db
    .prepare(
      `SELECT a.id, a.title, a.slug, a.summary, a.content
       FROM articles a JOIN article_categories c ON a.category_id = c.id
       WHERE a.slug = ? AND c.slug = 'beginners'`
    )
    .get(slug) as Article | undefined;
}

export default async function BeginnerDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-4 text-sm text-[var(--color-text-muted)]">
        <Link href="/beginners" className="hover:text-[var(--color-primary)]">初心者ガイド</Link>
        {" > "}
        <span>{article.title}</span>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <article className="lg:col-span-2">
          <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg p-6">
            <h1 className="text-2xl font-bold mb-4">{article.title}</h1>
            <p className="text-[var(--color-text-muted)] mb-6">{article.summary}</p>
            <AdSlot slot="in-content" className="mb-6" />
            <div className="prose prose-invert max-w-none">
              <p>{article.content}</p>
            </div>
          </div>
          <AdSlot slot="after-content" className="mt-6" />
        </article>
        <Sidebar />
      </div>
    </main>
  );
}
