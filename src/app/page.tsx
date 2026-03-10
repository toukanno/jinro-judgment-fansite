import { tierList } from "@/data/bias-tier-list";
import TierRow from "@/components/TierRow";

export default function Home() {
  const totalBiases = tierList.reduce((sum, t) => sum + t.entries.length, 0);

  return (
    <div>
      {/* Hero */}
      <section className="mb-10 text-center">
        <h2 className="text-3xl font-extrabold mb-3">
          人狼ジャッジメント 偏見ティア表
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed">
          Yahoo!知恵袋や掲示板でよく見かける、人狼ジャッジメントの役職に対する
          <strong className="text-gray-200">偏見・あるある</strong>
          をティアランク別にまとめました。
          あなたはいくつ当てはまりますか？
        </p>
        <div className="mt-4 inline-flex items-center gap-4 text-sm text-gray-500 bg-gray-900 rounded-full px-5 py-2">
          <span>全 {totalBiases} 偏見収録</span>
          <span>|</span>
          <span>S〜Dの5段階評価</span>
        </div>
      </section>

      {/* Tier list */}
      <section>
        {tierList.map((tier) => (
          <TierRow key={tier.tier} data={tier} />
        ))}
      </section>

      {/* Legend */}
      <section className="mt-10 bg-gray-900 rounded-lg p-5 text-sm text-gray-400">
        <h3 className="font-bold text-gray-200 mb-2">ティアの見方</h3>
        <ul className="space-y-1">
          <li><strong className="text-red-400">S</strong> — 殿堂入り。初心者から上級者まで一度は見たことがある偏見</li>
          <li><strong className="text-orange-400">A</strong> — Yahoo!知恵袋で質問すると必ず指摘される偏見</li>
          <li><strong className="text-yellow-400">B</strong> — 中級者でもうっかりやりがちな偏見</li>
          <li><strong className="text-green-400">C</strong> — 地味だけど根深く残る偏見</li>
          <li><strong className="text-blue-400">D</strong> — 知る人ぞ知るニッチな偏見</li>
        </ul>
        <div className="mt-3 pt-3 border-t border-gray-800">
          <p>📢 = Yahoo!知恵袋での言及頻度（5段階）</p>
        </div>
      </section>
    </div>
  );
}
