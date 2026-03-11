import { notFound } from "next/navigation";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import AdSlot from "@/components/AdSlot";
import { getDb } from "@/lib/db";

type Role = {
  id: number;
  name: string;
  team_name: string;
  team_color: string;
  description: string;
  ability: string;
  win_condition: string;
  difficulty: number;
};

function getRole(id: number): Role | undefined {
  const db = getDb();
  return db
    .prepare(
      `SELECT r.id, r.name, t.name as team_name, t.color as team_color,
              r.description, r.ability, r.win_condition, r.difficulty
       FROM roles r JOIN teams t ON r.team_id = t.id WHERE r.id = ?`
    )
    .get(id) as Role | undefined;
}

export default async function RoleDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const role = getRole(Number(id));
  if (!role) notFound();

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-4 text-sm text-[var(--color-text-muted)]">
        <Link href="/roles" className="hover:text-[var(--color-primary)]">役職一覧</Link>
        {" > "}
        <span>{role.name}</span>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <h1 className="text-2xl font-bold">{role.name}</h1>
              <span
                className="text-xs px-2 py-1 rounded"
                style={{ backgroundColor: role.team_color + "22", color: role.team_color }}
              >
                {role.team_name}
              </span>
            </div>
            <div className="mb-4 text-sm text-[var(--color-text-muted)]">
              難易度: {"★".repeat(role.difficulty)}{"☆".repeat(5 - role.difficulty)}
            </div>
            <p className="mb-6">{role.description}</p>
            <div className="space-y-4">
              <div className="bg-[var(--color-surface-alt)] rounded-lg p-4">
                <h2 className="font-bold text-sm mb-2 text-[var(--color-primary)]">能力</h2>
                <p className="text-sm">{role.ability}</p>
              </div>
              <div className="bg-[var(--color-surface-alt)] rounded-lg p-4">
                <h2 className="font-bold text-sm mb-2 text-green-400">勝利条件</h2>
                <p className="text-sm">{role.win_condition}</p>
              </div>
            </div>
          </div>
          <AdSlot slot="after-content" className="mt-6" />
        </div>
        <Sidebar />
      </div>
    </main>
  );
}
