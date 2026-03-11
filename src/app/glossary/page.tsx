import Sidebar from "@/components/Sidebar";
import AdSlot from "@/components/AdSlot";
import { getDb } from "@/lib/db";

type GlossaryItem = { id: number; term: string; reading: string; definition: string; category: string };

function getGlossary(): GlossaryItem[] {
  const db = getDb();
  return db.prepare("SELECT * FROM glossary ORDER BY term").all() as GlossaryItem[];
}

const categoryLabels: Record<string, string> = {
  general: "一般",
  strategy: "戦略",
  slang: "スラング",
};

export default function GlossaryPage() {
  const items = getGlossary();
  const grouped = items.reduce<Record<string, GlossaryItem[]>>((acc, item) => {
    (acc[item.category] ??= []).push(item);
    return acc;
  }, {});

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">用語集</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {Object.entries(grouped).map(([cat, terms]) => (
            <section key={cat}>
              <h2 className="text-lg font-bold mb-3">{categoryLabels[cat] ?? cat}</h2>
              <div className="space-y-3">
                {terms.map((t) => (
                  <div key={t.id} className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg p-4">
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="font-bold">{t.term}</span>
                      {t.reading && <span className="text-xs text-[var(--color-text-muted)]">({t.reading})</span>}
                    </div>
                    <p className="text-sm text-[var(--color-text-muted)]">{t.definition}</p>
                  </div>
                ))}
              </div>
            </section>
          ))}
          <AdSlot slot="after-content" />
        </div>
        <Sidebar />
      </div>
    </main>
  );
}
