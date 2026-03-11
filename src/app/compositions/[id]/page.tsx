import { notFound } from "next/navigation";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import AdSlot from "@/components/AdSlot";
import { getDb } from "@/lib/db";

type Composition = { id: number; name: string; player_count: number; description: string; difficulty: number };
type CompRole = { role_name: string; team_color: string; count: number };

function getComposition(id: number): Composition | undefined {
  const db = getDb();
  return db.prepare("SELECT * FROM compositions WHERE id = ?").get(id) as Composition | undefined;
}

function getCompRoles(id: number): CompRole[] {
  const db = getDb();
  return db
    .prepare(
      `SELECT r.name as role_name, t.color as team_color, cr.count
       FROM composition_roles cr
       JOIN roles r ON cr.role_id = r.id
       JOIN teams t ON r.team_id = t.id
       WHERE cr.composition_id = ? ORDER BY t.sort_order, r.sort_order`
    )
    .all(id) as CompRole[];
}

export default async function CompositionDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const comp = getComposition(Number(id));
  if (!comp) notFound();
  const roles = getCompRoles(Number(id));

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-4 text-sm text-[var(--color-text-muted)]">
        <Link href="/compositions" className="hover:text-[var(--color-primary)]">構成考察</Link>
        {" > "}
        <span>{comp.name}</span>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg p-6">
            <h1 className="text-2xl font-bold mb-2">{comp.name}</h1>
            <p className="text-[var(--color-text-muted)] mb-6">{comp.description}</p>
            <h2 className="font-bold mb-3">役職構成</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {roles.map((r) => (
                <div
                  key={r.role_name}
                  className="bg-[var(--color-surface-alt)] rounded-lg p-3 text-center"
                >
                  <span className="font-bold" style={{ color: r.team_color }}>{r.role_name}</span>
                  <span className="text-[var(--color-text-muted)] ml-2">x{r.count}</span>
                </div>
              ))}
            </div>
          </div>
          <AdSlot slot="after-content" className="mt-6" />
        </div>
        <Sidebar />
      </div>
    </main>
  );
}
