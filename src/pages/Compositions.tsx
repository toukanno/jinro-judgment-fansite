interface Composition {
  name: string
  players: number
  roles: string
  description: string
  strategy: string
  difficulty: '初級' | '中級' | '上級'
}

const compositions: Composition[] = [
  {
    name: 'スタンダード9人村',
    players: 9,
    roles: '市民×3, 占い師, 霊媒師, 騎士, 人狼×2, 狂人',
    description: '最も基本的な編成。初心者にもおすすめのバランスの取れた構成です。',
    strategy: '占い師COから始まり、霊媒師の結果と照合して推理を進めるのが王道。騎士は占い師護衛が基本。',
    difficulty: '初級',
  },
  {
    name: '12人村（妖狐あり）',
    players: 12,
    roles: '市民×4, 占い師, 霊媒師, 騎士, ハンター, 人狼×2, 狂人, 妖狐',
    description: '第三勢力の妖狐が加わることで、より高度な推理が求められる編成。',
    strategy: '妖狐の存在により、占い師の呪殺が重要な要素に。人狼も妖狐を処理しなければ負けるため、複雑な駆け引きが生まれる。',
    difficulty: '中級',
  },
  {
    name: '猫又入り9人村',
    players: 9,
    roles: '市民×2, 占い師, 霊媒師, 猫又, 人狼×2, 狂人, 妖狐',
    description: '猫又の道連れ効果が戦略に大きな影響を与える。襲撃先の選択が重要。',
    strategy: '人狼は猫又を襲撃すると道連れにされるため、慎重に襲撃先を選ぶ必要がある。猫又は積極的にCOして襲撃を抑制することも。',
    difficulty: '中級',
  },
  {
    name: '双子入り11人村',
    players: 11,
    roles: '市民×2, 占い師, 霊媒師, 騎士, 双子×2, 人狼×2, 狂人, 妖狐',
    description: '双子の確定白情報を活かした推理が鍵となる編成。',
    strategy: '双子は互いの正体を知っているため、確定情報として強力。ただし、片方が処刑されると情報が失われるので、露出のタイミングが重要。',
    difficulty: '中級',
  },
  {
    name: 'ハンター入り10人村',
    players: 10,
    roles: '市民×3, 占い師, 霊媒師, ハンター, 人狼×2, 狂人, 妖狐',
    description: 'ハンターの道連れ能力が村の切り札となる。',
    strategy: 'ハンターが確実に人狼を道連れにできるかが勝負の分かれ目。推理を固めてからのハンターCOが効果的。',
    difficulty: '初級',
  },
  {
    name: '15人村（大人数）',
    players: 15,
    roles: '市民×5, 占い師, 霊媒師, 騎士, 猫又, ハンター, 人狼×3, 狂人, 妖狐',
    description: '大人数ならではの混沌とした議論が楽しめる上級者向け編成。',
    strategy: '人狼3匹で襲撃力が高い。村人陣営は早めに役職を確定させ、グレーを絞る必要がある。情報量が多いので整理力が問われる。',
    difficulty: '上級',
  },
]

const difficultyColors = {
  初級: 'bg-green-500/20 text-green-300 border-green-500/30',
  中級: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
  上級: 'bg-red-500/20 text-red-300 border-red-500/30',
}

export default function Compositions() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-3xl font-black sm:text-4xl">
          <span className="gradient-text">編成考察</span>
        </h1>
        <p className="text-gray-400">
          人気の編成パターンと各編成の戦略を分析します。
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {compositions.map((comp) => (
          <div key={comp.name} className="card-glow p-6">
            <div className="mb-4 flex items-start justify-between gap-3">
              <h2 className="text-lg font-bold">{comp.name}</h2>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-gray-800 px-2.5 py-0.5 text-xs text-gray-400">
                  {comp.players}人
                </span>
                <span className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${difficultyColors[comp.difficulty]}`}>
                  {comp.difficulty}
                </span>
              </div>
            </div>

            <div className="mb-4 rounded-lg bg-black/30 p-3">
              <p className="text-xs font-medium text-gray-500">構成</p>
              <p className="mt-1 text-sm text-gray-300">{comp.roles}</p>
            </div>

            <p className="mb-3 text-sm text-gray-400">{comp.description}</p>

            <div className="border-t border-gray-800 pt-3">
              <p className="text-xs font-medium text-wolf-400">戦略ポイント</p>
              <p className="mt-1 text-sm leading-relaxed text-gray-400">
                {comp.strategy}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
