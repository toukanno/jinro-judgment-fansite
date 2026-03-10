import Link from "next/link";

const features = [
  {
    title: "役職一覧",
    description: "市民陣営・人狼陣営・第三陣営の全役職を詳しく解説。能力や立ち回りのコツも紹介します。",
    href: "/roles",
    color: "text-villager",
  },
  {
    title: "初心者ガイド",
    description: "人狼ジャッジメントを始めたばかりの方へ。ゲームの流れや基本的な考え方を解説します。",
    href: "/guide",
    color: "text-accent-light",
  },
];

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <section className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">
          人狼ジャッジメント<span className="text-accent">攻略</span>
        </h1>
        <p className="text-muted text-lg max-w-2xl mx-auto">
          役職情報・立ち回り・初心者向け解説・編成考察をまとめたファンサイト
        </p>
      </section>

      <section className="grid md:grid-cols-2 gap-6 mb-16">
        {features.map((feature) => (
          <Link
            key={feature.href}
            href={feature.href}
            className="block bg-surface border border-custom rounded-lg p-6 hover:bg-surface-light transition-colors"
          >
            <h2 className={`text-xl font-bold mb-2 ${feature.color}`}>
              {feature.title}
            </h2>
            <p className="text-muted text-sm">{feature.description}</p>
          </Link>
        ))}
      </section>

      <section className="bg-surface border border-custom rounded-lg p-8">
        <h2 className="text-xl font-bold mb-4">人狼ジャッジメントとは</h2>
        <p className="text-muted text-sm leading-relaxed mb-4">
          人狼ジャッジメントは、株式会社そらいろが開発したオンライン人狼ゲームアプリです。
          プレイヤーは「市民陣営」と「人狼陣営」に分かれ、議論と推理を通じて勝利を目指します。
        </p>
        <p className="text-muted text-sm leading-relaxed mb-4">
          最大20人でのオンライン対戦が可能で、豊富な役職と多彩な編成が魅力です。
          テキストチャットでの議論を基本とし、論理的思考力やコミュニケーション能力が試されます。
        </p>
        <p className="text-muted text-sm leading-relaxed">
          初心者部屋から上級者部屋まで幅広いレベルの部屋が用意されており、
          自分の実力に合ったプレイが楽しめます。
        </p>
      </section>
    </div>
  );
}
