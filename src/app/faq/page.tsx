import Sidebar from "@/components/Sidebar";
import AdSlot from "@/components/AdSlot";
import { getDb } from "@/lib/db";

type Faq = { id: number; question: string; answer: string; category: string };

function getFaqs(): Faq[] {
  const db = getDb();
  return db.prepare("SELECT * FROM faqs WHERE is_published = 1 ORDER BY sort_order").all() as Faq[];
}

const categoryLabels: Record<string, string> = {
  general: "一般",
  beginner: "初心者向け",
  strategy: "戦略",
};

export default function FaqPage() {
  const faqs = getFaqs();
  const grouped = faqs.reduce<Record<string, Faq[]>>((acc, f) => {
    (acc[f.category] ??= []).push(f);
    return acc;
  }, {});

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">よくある質問 (FAQ)</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {Object.entries(grouped).map(([cat, items]) => (
            <section key={cat}>
              <h2 className="text-lg font-bold mb-3">{categoryLabels[cat] ?? cat}</h2>
              <div className="space-y-3">
                {items.map((f) => (
                  <details key={f.id} className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg">
                    <summary className="p-4 cursor-pointer font-medium text-sm hover:text-[var(--color-primary)]">
                      {f.question}
                    </summary>
                    <div className="px-4 pb-4 text-sm text-[var(--color-text-muted)]">{f.answer}</div>
                  </details>
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
