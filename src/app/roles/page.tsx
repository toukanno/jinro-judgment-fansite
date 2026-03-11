import Link from "next/link";
import { roles, type Team } from "@/data/roles";

const teamColors: Record<Team, string> = {
  村人陣営: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  人狼陣営: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  第三陣営: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
};

export const metadata = {
  title: "役職一覧 - 人狼ジャッジメント攻略",
};

export default function RolesPage() {
  const teams: Team[] = ["村人陣営", "人狼陣営", "第三陣営"];

  return (
    <div className="space-y-10">
      <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
        役職一覧
      </h1>

      {teams.map((team) => {
        const teamRoles = roles.filter((r) => r.team === team);
        if (teamRoles.length === 0) return null;

        return (
          <section key={team}>
            <h2 className="text-xl font-semibold text-zinc-800 dark:text-zinc-200 mb-4">
              {team}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {teamRoles.map((role) => (
                <Link
                  key={role.slug}
                  href={`/roles/${role.slug}`}
                  className="rounded-lg border border-zinc-200 bg-white p-5 hover:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-600"
                >
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                      {role.name}
                    </h3>
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-medium ${teamColors[role.team]}`}
                    >
                      {role.team}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                    {role.nameEn}
                  </p>
                  <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2">
                    {role.ability}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
