import { NavLink } from 'react-router-dom'

const links = [
  { to: '/', label: 'ホーム' },
  { to: '/roles', label: '役職一覧' },
  { to: '/beginners', label: '初心者ガイド' },
  { to: '/compositions', label: '編成考察' },
]

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-800/50 bg-gray-950/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <NavLink to="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-wolf-600 text-lg font-black">
            狼
          </div>
          <div>
            <h1 className="text-lg font-bold leading-tight tracking-tight">
              人狼ジャッジメント
            </h1>
            <p className="text-xs text-gray-500">Fan Site</p>
          </div>
        </NavLink>
        <nav className="hidden gap-1 md:flex">
          {links.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `nav-link${isActive ? ' active' : ''}`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
        <MobileMenu />
      </div>
    </header>
  )
}

function MobileMenu() {
  return (
    <details className="group relative md:hidden">
      <summary className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white">
        <svg className="h-5 w-5 group-open:hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <svg className="hidden h-5 w-5 group-open:block" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </summary>
      <div className="absolute right-0 top-12 w-48 rounded-xl border border-gray-800 bg-gray-900 p-2 shadow-2xl">
        {links.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `block rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-wolf-600/20 text-wolf-300'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`
            }
          >
            {label}
          </NavLink>
        ))}
      </div>
    </details>
  )
}
