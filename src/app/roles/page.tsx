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
  difficulty: number;
};

function getRoles(): Role[] {
  const db = getDb();
  return db
    .prepare(
      `SELECT r.id, r.name, t.name as team_name, t.color as team_color,
              r.description, r.difficulty
       FROM roles r JOIN teams t ON r.team_id = t.id
       WHERE r.is_active = 1 ORDER BY t.sort_order, r.sort_order`
    )
    .all() as Role[];
}

export default function RolesPage() {
  const roles = getRoles();
  const grouped = roles.reduce<Record<string, Role[]>>((acc, role) => {
    if (!acc[role.team_name]) acc[role.team_name] = [];
    acc[role.team_name].push(role);
    return acc;
  }, {});

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">役職一覧</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {Object.entries(grouped).map(([team, teamRoles]) => (
            <section key={team}>
              <h2
                className="text-lg font-bold mb-4 pb-2 border-b"
                style={{ borderColor: teamRoles[0].team_color, color: teamRoles[0].team_color }}
              >
                {team}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {teamRoles.map((role) => (
                  <Link
                    key={role.id}
                    href={`/roles/${role.id}`}
                    className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg p-4 hover:border-[var(--color-primary)] transition-colors"
                  >
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-bold">{role.name}</h3>
                      <span className="text-xs text-[var(--color-text-muted)]">
                        難易度 {"★".repeat(role.difficulty)}{"☆".repeat(5 - role.difficulty)}
                      </span>
                    </div>
                    <p className="text-sm text-[var(--color-text-muted)]">{role.description}</p>
                  </Link>
                ))}
              </div>
              <AdSlot slot="in-content" className="mt-4" />
            </section>
          ))}
        </div>
        <Sidebar />
      </div>
    </main>
  );
}
