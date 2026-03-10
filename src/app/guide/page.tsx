import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "初心者ガイド | 人狼ジャッジメント攻略",
  description: "人狼ジャッジメント初心者向けの基本ルール・ゲームの流れ・立ち回りのコツを解説します。",
};

const sections = [
  {
    title: "ゲームの基本ルール",
    content: [
      "プレイヤーは「市民陣営」と「人狼陣営」（＋第三陣営）に分かれます。",
      "市民陣営は議論と投票で人狼を全員処刑すれば勝利。",
      "人狼陣営は市民の数を人狼以下にすれば勝利。",
      "各プレイヤーには秘密の役職が割り当てられます。",
    ],
  },
  {
    title: "ゲームの流れ",
    steps: [
      {
        name: "昼の議論フェーズ",
        description:
          "全員でテキストチャットによる議論を行います。怪しい人物を推理し、処刑候補を決めましょう。",
      },
      {
        name: "投票フェーズ",
        description:
          "議論の結果をもとに、処刑したい人に投票します。最多票の人が処刑されます。",
      },
      {
        name: "夜のフェーズ",
        description:
          "人狼は襲撃先を選び、占い師や騎士などの特殊役職は能力を使用します。",
      },
      {
        name: "翌朝",
        description:
          "夜の結果が発表され、再び議論フェーズへ。これを繰り返してゲームが進行します。",
      },
    ],
  },
];

const tips = [
  {
    title: "発言は積極的に",
    description:
      "寡黙（発言が少ない）プレイヤーは「考察を落とさない怪しい人物」として処刑対象になりやすいです。自分の考えを積極的に発言しましょう。",
  },
  {
    title: "メモを活用しよう",
    description:
      "ゲーム内のメモ機能を使って、各プレイヤーの発言や投票先を記録しましょう。推理の精度が大幅に上がります。",
  },
  {
    title: "CO（カミングアウト）を理解する",
    description:
      "COとは自分の役職を公表することです。占い師や霊能者は適切なタイミングでCOすることが重要です。",
  },
  {
    title: "投票先に注目",
    description:
      "誰が誰に投票したかは重要な情報です。人狼は仲間に投票しにくいため、投票パターンから推理できることがあります。",
  },
  {
    title: "初心者部屋を活用",
    description:
      "まずは初心者部屋でゲームに慣れましょう。失敗を恐れず、楽しみながら経験を積むことが上達への近道です。",
  },
  {
    title: "暴言・煽りはNG",
    description:
      "人狼ゲームはコミュニケーションが大切。マナーを守り、全員が楽しめるプレイを心がけましょう。",
  },
];

export default function GuidePage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">初心者ガイド</h1>
      <p className="text-muted mb-10">
        人狼ジャッジメントを始めたばかりの方へ。
        基本ルールからゲームの流れ、上達のコツまでを解説します。
      </p>

      {/* 基本ルール */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-villager">
          {sections[0].title}
        </h2>
        <ul className="space-y-2">
          {sections[0].content!.map((item, i) => (
            <li key={i} className="bg-surface border border-custom rounded-lg p-4 text-sm text-muted">
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* ゲームの流れ */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-villager">
          {sections[1].title}
        </h2>
        <div className="space-y-4">
          {sections[1].steps!.map((step, i) => (
            <div key={i} className="bg-surface border border-custom rounded-lg p-5">
              <div className="flex items-center gap-3 mb-2">
                <span className="bg-accent text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full">
                  {i + 1}
                </span>
                <h3 className="font-bold">{step.name}</h3>
              </div>
              <p className="text-muted text-sm pl-9">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 上達のコツ */}
      <section>
        <h2 className="text-2xl font-bold mb-6 text-accent-light">
          上達のコツ
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {tips.map((tip) => (
            <div
              key={tip.title}
              className="bg-surface border border-custom rounded-lg p-5"
            >
              <h3 className="font-bold mb-2">{tip.title}</h3>
              <p className="text-muted text-sm">{tip.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
