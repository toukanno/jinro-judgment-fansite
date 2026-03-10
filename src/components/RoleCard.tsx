import type { Role } from '../data/roles'

const teamColors: Record<string, string> = {
  村人: 'from-blue-500/20 to-blue-900/10 border-blue-500/30',
  人狼: 'from-red-500/20 to-red-900/10 border-red-500/30',
  妖狐: 'from-amber-500/20 to-amber-900/10 border-amber-500/30',
  恋人: 'from-pink-500/20 to-pink-900/10 border-pink-500/30',
}

const teamBadgeColors: Record<string, string> = {
  村人: 'bg-blue-500/20 text-blue-300',
  人狼: 'bg-red-500/20 text-red-300',
  妖狐: 'bg-amber-500/20 text-amber-300',
  恋人: 'bg-pink-500/20 text-pink-300',
}

export default function RoleCard({ role }: { role: Role }) {
  const gradient = teamColors[role.team] ?? 'from-gray-500/20 to-gray-900/10 border-gray-500/30'
  const badge = teamBadgeColors[role.team] ?? 'bg-gray-500/20 text-gray-300'

  return (
    <div className={`group rounded-2xl border bg-gradient-to-br p-5 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg ${gradient}`}>
      <div className="mb-3 flex items-start justify-between">
        <h3 className="text-lg font-bold">{role.name}</h3>
        <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${badge}`}>
          {role.team}陣営
        </span>
      </div>
      <p className="mb-4 text-sm leading-relaxed text-gray-300">{role.description}</p>
      <div className="space-y-2">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500">能力</h4>
        <p className="text-sm text-gray-400">{role.ability}</p>
      </div>
      {role.tips && (
        <div className="mt-3 rounded-lg bg-black/20 p-3">
          <p className="text-xs text-gray-400">
            <span className="font-semibold text-wolf-400">💡 コツ：</span>
            {role.tips}
          </p>
        </div>
      )}
    </div>
  )
}
