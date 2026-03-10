import { Link } from 'react-router-dom'

const features = [
  {
    icon: '🐺',
    title: '役職一覧',
    description: '全役職の能力と立ち回りを詳しく解説。陣営ごとに整理された情報で、すぐに確認できます。',
    link: '/roles',
  },
  {
    icon: '📖',
    title: '初心者ガイド',
    description: 'はじめての人狼ジャッジメントでも安心。基本ルールから立ち回りのコツまで丁寧に解説。',
    link: '/beginners',
  },
  {
    icon: '⚔️',
    title: '編成考察',
    description: '人気の編成パターンと各編成の戦略を分析。勝率を上げるためのヒントが満載。',
    link: '/compositions',
  },
]

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-wolf-950/50 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-wolf-600/10 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-6xl px-4 pb-20 pt-24 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-wolf-500/20 bg-wolf-500/10 px-4 py-1.5 text-sm text-wolf-300">
            <span className="h-1.5 w-1.5 rounded-full bg-wolf-400" />
            非公式ファンサイト
          </div>
          <h1 className="mb-6 text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
            <span className="gradient-text">人狼ジャッジメント</span>
            <br />
            <span className="text-white">攻略・情報まとめ</span>
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-lg text-gray-400">
            役職情報、立ち回り解説、初心者向けガイド、編成考察など、
            人狼ジャッジメントを楽しむための情報をまとめたファンサイトです。
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/roles"
              className="rounded-xl bg-wolf-600 px-8 py-3 font-semibold text-white shadow-lg shadow-wolf-600/25 transition-all hover:bg-wolf-500 hover:shadow-wolf-500/30"
            >
              役職を見る
            </Link>
            <Link
              to="/beginners"
              className="rounded-xl border border-gray-700 bg-gray-900 px-8 py-3 font-semibold text-gray-200 transition-all hover:border-gray-600 hover:bg-gray-800"
            >
              初心者ガイド
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-4 pb-20">
        <div className="grid gap-6 md:grid-cols-3">
          {features.map((f) => (
            <Link key={f.link} to={f.link} className="card-glow group p-6">
              <div className="mb-4 text-4xl">{f.icon}</div>
              <h3 className="mb-2 text-xl font-bold transition-colors group-hover:text-wolf-300">
                {f.title}
              </h3>
              <p className="text-sm leading-relaxed text-gray-400">
                {f.description}
              </p>
              <div className="mt-4 text-sm font-medium text-wolf-400 transition-transform group-hover:translate-x-1">
                詳しく見る →
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-gray-800/50 bg-gray-900/30">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-4 py-16 md:grid-cols-4">
          {[
            { value: '10+', label: '収録役職' },
            { value: '4', label: '陣営解説' },
            { value: '6+', label: '編成パターン' },
            { value: '∞', label: '戦略の可能性' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="mb-1 text-3xl font-black text-wolf-400">
                {stat.value}
              </div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
