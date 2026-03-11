import Link from "next/link";

export const metadata = {
  title: "初心者ガイド - 人狼ジャッジメント攻略",
};

const sections = [
  {
    title: "人狼ジャッジメントとは？",
    content:
      "人狼ジャッジメントは、村人陣営と人狼陣営に分かれて戦う対話型の推理ゲームです。プレイヤーはそれぞれ秘密の役職を持ち、昼の議論と夜の行動を繰り返しながら勝利を目指します。",
  },
  {
    title: "ゲームの流れ",
    content:
      "ゲームは「昼のターン」と「夜のターン」を繰り返します。昼は全員で議論し、投票で一人を処刑します。夜は人狼が襲撃先を選び、占い師や騎士などが能力を使います。村人陣営は人狼を全員処刑すれば勝利、人狼陣営は村人と同数以下になれば勝利です。",
  },
  {
    title: "基本用語",
    terms: [
      { term: "CO（カミングアウト）", desc: "自分の役職を公開すること" },
      { term: "グレー", desc: "まだ占われていない、役職が不明な人物" },
      { term: "白／黒", desc: "占い結果で村人（白）か人狼（黒）かを示す" },
      { term: "ローラー", desc: "疑わしい候補者を順番に処刑していく戦略" },
      { term: "GJ（グッジョブ）", desc: "騎士が人狼の襲撃を防ぐこと" },
      { term: "確定白", desc: "村人であることが確定した人物" },
      { term: "ライン", desc: "プレイヤー間の関係性や繋がり" },
    ],
  },
  {
    title: "初心者が覚えるべき5つのポイント",
    points: [
      {
        heading: "1. 発言量を確保しよう",
        detail:
          "寡黙（あまり発言しない）プレイヤーは疑われやすいです。根拠のある発言を心がけましょう。",
      },
      {
        heading: "2. メモを取ろう",
        detail:
          "各プレイヤーの発言や投票先を記録しておくと、矛盾を見つけやすくなります。",
      },
      {
        heading: "3. 役職COのタイミングを覚えよう",
        detail:
          "占い師は初日朝、霊媒師は占い師CO後など、定番のタイミングがあります。",
      },
      {
        heading: "4. 投票先に理由をつけよう",
        detail:
          "「なんとなく怪しい」ではなく、具体的な根拠を持って投票しましょう。",
      },
      {
        heading: "5. 負けても楽しもう",
        detail:
          "人狼ゲームは勝ち負けよりも推理と議論のプロセスが醍醐味です。失敗から学びましょう。",
      },
    ],
  },
];

export default function GuidePage() {
  return (
    <div className="space-y-10">
      <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
        初心者ガイド
      </h1>

      {sections.map((section, i) => (
        <section
          key={i}
          className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900"
        >
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
            {section.title}
          </h2>

          {section.content && (
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
              {section.content}
            </p>
          )}

          {section.terms && (
            <dl className="space-y-3">
              {section.terms.map((item) => (
                <div key={item.term}>
                  <dt className="font-medium text-zinc-900 dark:text-zinc-100">
                    {item.term}
                  </dt>
                  <dd className="text-sm text-zinc-600 dark:text-zinc-400 ml-4">
                    {item.desc}
                  </dd>
                </div>
              ))}
            </dl>
          )}

          {section.points && (
            <div className="space-y-4">
              {section.points.map((point) => (
                <div key={point.heading}>
                  <h3 className="font-medium text-zinc-900 dark:text-zinc-100">
                    {point.heading}
                  </h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                    {point.detail}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>
      ))}

      <div className="text-center">
        <Link
          href="/roles"
          className="rounded-lg bg-zinc-900 px-6 py-3 text-sm font-medium text-white hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
        >
          役職一覧を見る
        </Link>
      </div>
    </div>
  );
}
