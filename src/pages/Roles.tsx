import { useState } from 'react'
import RoleCard from '../components/RoleCard'
import { roles } from '../data/roles'

const teams = ['すべて', '村人', '人狼', '妖狐']

export default function Roles() {
  const [activeTeam, setActiveTeam] = useState('すべて')

  const filtered = activeTeam === 'すべて'
    ? roles
    : roles.filter((r) => r.team === activeTeam)

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-3xl font-black sm:text-4xl">
          <span className="gradient-text">役職一覧</span>
        </h1>
        <p className="text-gray-400">
          人狼ジャッジメントに登場する役職の能力と立ち回りを解説します。
        </p>
      </div>

      {/* Filter */}
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {teams.map((team) => (
          <button
            key={team}
            onClick={() => setActiveTeam(team)}
            className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
              activeTeam === team
                ? 'bg-wolf-600 text-white shadow-lg shadow-wolf-600/25'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
            }`}
          >
            {team}
          </button>
        ))}
      </div>

      {/* Role Grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((role) => (
          <RoleCard key={role.id} role={role} />
        ))}
      </div>
    </div>
  )
}
