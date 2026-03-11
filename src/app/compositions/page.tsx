import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import AdSlot from "@/components/AdSlot";
import { getDb } from "@/lib/db";

type Composition = {
  id: number;
  name: string;
  player_count: number;
  description: string;
  difficulty: number;
  is_recommended: number;
};

function getCompositions(): Composition[] {
  const db = getDb();
  return db.prepare("SELECT * FROM compositions ORDER BY player_count").all() as Composition[];
}

export default function CompositionsPage() {
  const compositions = getCompositions();

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-2">構成考察</h1>
      <p className="text-[var(--color-text-muted)] mb-6">
        人数別のおすすめ構成を紹介します。
      </p>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {compositions.map((c) => (
            <Link
              key={c.id}
              href={`/compositions/${c.id}`}
              className="block bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg p-5 hover:border-[var(--color-primary)] transition-colors"
            >
              <div className="flex items-center gap-3 mb-2">
                <h2 className="font-bold">{c.name}</h2>
                <span className="text-xs px-2 py-0.5 rounded bg-[var(--color-primary)] text-white">
                  {c.player_count}人
                </span>
                {c.is_recommended === 1 && (
                  <span className="text-xs px-2 py-0.5 rounded bg-green-700 text-white">おすすめ</span>
                )}
              </div>
              <p className="text-sm text-[var(--color-text-muted)]">{c.description}</p>
            </Link>
          ))}
          <AdSlot slot="after-content" className="mt-4" />
        </div>
        <Sidebar />
      </div>
    </main>
  );
}
