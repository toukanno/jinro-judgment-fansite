const sections = [
  {
    title: 'ゲームの基本ルール',
    content: [
      '人狼ジャッジメントは、「村人陣営」と「人狼陣営」に分かれて戦うオンライン対戦ゲームです。',
      '昼のターンでは全員で議論し、怪しいプレイヤーを投票で処刑します。',
      '夜のターンでは人狼が村人を一人襲撃します。各役職も夜に能力を使用します。',
      '村人陣営は人狼を全員処刑すれば勝利。人狼陣営は村人の数を人狼と同数以下にすれば勝利です。',
    ],
  },
  {
    title: 'はじめに覚える3つのこと',
    items: [
      {
        subtitle: '1. とにかく発言しよう',
        text: '黙っていると怪しまれます。自分の考えを積極的に発言しましょう。間違っても大丈夫。発言することが最も大事です。',
      },
      {
        subtitle: '2. 他の人の発言をよく読もう',
        text: '矛盾した発言や不自然な行動をしている人がいないか注意深く観察しましょう。メモを取るのも有効です。',
      },
      {
        subtitle: '3. 役職COのタイミングを覚えよう',
        text: 'CO（カミングアウト）とは自分の役職を公開すること。占い師は初日朝、霊媒師は占い結果が割れた時などが一般的です。',
      },
    ],
  },
  {
    title: '初心者におすすめの役職',
    items: [
      {
        subtitle: '市民',
        text: '特殊能力がないので、議論に集中できます。まずは議論の流れを掴むことから始めましょう。',
      },
      {
        subtitle: '霊媒師',
        text: '処刑結果を確認するだけなので能力の使い方がシンプル。結果を報告する練習にもなります。',
      },
      {
        subtitle: '騎士',
        text: '守り先を選ぶだけのシンプルな能力。重要な役職を守る楽しさを味わえます。',
      },
    ],
  },
  {
    title: 'よくある用語集',
    terms: [
      { term: 'CO', meaning: 'カミングアウト。自分の役職を公開すること。' },
      { term: 'GJ', meaning: 'グッジョブ。騎士が人狼の襲撃を防いだこと。' },
      { term: 'PP', meaning: 'パワープレイ。人狼と狂人で投票を合わせて勝つこと。' },
      { term: 'RPP', meaning: 'ランダムパワープレイ。同数投票で引き分けを狙うこと。' },
      { term: '確白', meaning: '確定白。人狼でないことが確定しているプレイヤー。' },
      { term: 'グレー', meaning: 'まだ白とも黒とも判断がつかないプレイヤー。' },
      { term: 'ライン', meaning: 'プレイヤー同士の関係性。かばい合いなどから推理する。' },
      { term: '身内切り', meaning: '人狼が仲間の人狼に投票して村人のふりをすること。' },
    ],
  },
]

export default function Beginners() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-3xl font-black sm:text-4xl">
          <span className="gradient-text">初心者ガイド</span>
        </h1>
        <p className="text-gray-400">
          人狼ジャッジメントをこれから始める方へ。基本ルールから立ち回りのコツまで解説します。
        </p>
      </div>

      <div className="space-y-10">
        {sections.map((section) => (
          <div key={section.title} className="card-glow p-6 sm:p-8">
            <h2 className="mb-5 text-xl font-bold text-wolf-300">
              {section.title}
            </h2>

            {section.content && (
              <ul className="space-y-3">
                {section.content.map((text, i) => (
                  <li key={i} className="flex gap-3 text-sm leading-relaxed text-gray-300">
                    <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-wolf-500" />
                    {text}
                  </li>
                ))}
              </ul>
            )}

            {section.items && (
              <div className="space-y-5">
                {section.items.map((item) => (
                  <div key={item.subtitle}>
                    <h3 className="mb-1.5 font-semibold text-white">
                      {item.subtitle}
                    </h3>
                    <p className="text-sm leading-relaxed text-gray-400">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {section.terms && (
              <div className="grid gap-3 sm:grid-cols-2">
                {section.terms.map((t) => (
                  <div key={t.term} className="rounded-lg bg-black/20 p-3">
                    <span className="font-mono text-sm font-bold text-wolf-400">
                      {t.term}
                    </span>
                    <p className="mt-1 text-xs text-gray-400">{t.meaning}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
