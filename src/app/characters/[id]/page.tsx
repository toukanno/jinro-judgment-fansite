import { characters, getCharacterById } from '@/data/characters';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import StatusRadarChart from '@/components/StatusRadarChart';
import StatusBar from '@/components/StatusBar';
import RatingStars from '@/components/RatingStars';
import RoleAffinityTable from '@/components/RoleAffinityTable';

export function generateStaticParams() {
  return characters.map((c) => ({ id: c.id }));
}

export function generateMetadata({ params }: { params: { id: string } }) {
  const char = getCharacterById(params.id);
  if (!char) return { title: 'Not Found' };
  return {
    title: `${char.name} (${char.nameEn}) | 人狼ジャッジメント ファンサイト`,
    description: char.description,
  };
}

const STATUS_LABELS: Record<string, string> = {
  attack: '攻撃',
  defense: '防御',
  intelligence: '知力',
  charisma: 'カリスマ',
  luck: '運',
  stamina: '体力',
};

export default function CharacterProfilePage({
  params,
}: {
  params: { id: string };
}) {
  const char = getCharacterById(params.id);
  if (!char) notFound();

  const totalStatus = Object.values(char.status).reduce((a, b) => a + b, 0);
  const avgRating =
    Object.values(char.rating).reduce((a, b) => a + b, 0) /
    Object.values(char.rating).length;

  // 前後キャラへのナビゲーション
  const idx = characters.findIndex((c) => c.id === char.id);
  const prev = idx > 0 ? characters[idx - 1] : null;
  const next = idx < characters.length - 1 ? characters[idx + 1] : null;

  return (
    <div>
      {/* パンくず */}
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-gray-300">
          ホーム
        </Link>
        <span className="mx-2">/</span>
        <Link href="/characters" className="hover:text-gray-300">
          キャラクター
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-300">{char.name}</span>
      </nav>

      {/* ヘッダー */}
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <div
          className="w-24 h-24 rounded-2xl flex items-center justify-center text-4xl font-bold shrink-0"
          style={{ backgroundColor: char.color + '22', color: char.color }}
        >
          {char.name[0]}
        </div>
        <div>
          <h1 className="text-3xl font-bold">
            {char.name}
            <span className="text-lg text-gray-500 ml-3 font-normal">
              {char.nameEn}
            </span>
          </h1>
          <p className="text-lg mt-1" style={{ color: char.color }}>
            {char.title}
          </p>
          <p className="text-gray-400 text-sm mt-1">{char.personality}</p>
          <p className="text-gray-300 mt-3 max-w-2xl">{char.description}</p>
          <blockquote
            className="mt-3 text-sm italic border-l-2 pl-3"
            style={{ borderColor: char.color, color: char.color }}
          >
            {char.quote}
          </blockquote>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ステータス */}
        <section className="card">
          <h2 className="text-xl font-bold mb-4">
            ステータス
            <span className="text-sm text-gray-500 ml-2 font-normal">
              合計 {totalStatus}
            </span>
          </h2>
          <div className="flex flex-col items-center mb-6">
            <StatusRadarChart status={char.status} color={char.color} />
          </div>
          <div className="space-y-3">
            {(Object.entries(char.status) as [string, number][]).map(
              ([key, val]) => (
                <StatusBar
                  key={key}
                  label={STATUS_LABELS[key] || key}
                  value={val}
                  color={char.color}
                />
              )
            )}
          </div>
        </section>

        {/* 評価 */}
        <section className="card">
          <h2 className="text-xl font-bold mb-4">
            評価・レーティング
            <span className="text-sm text-gray-500 ml-2 font-normal">
              平均 {avgRating.toFixed(1)}
            </span>
          </h2>
          <div className="space-y-3">
            <RatingStars label="使いやすさ" value={char.rating.usability} />
            <RatingStars
              label="初心者おすすめ"
              value={char.rating.beginnerFriendly}
            />
            <RatingStars label="上級者向け" value={char.rating.advancedPlay} />
            <RatingStars label="汎用性" value={char.rating.versatility} />
            <RatingStars label="人気度" value={char.rating.popularity} />
          </div>

          <h3 className="text-lg font-bold mt-8 mb-4">役職適性</h3>
          <RoleAffinityTable affinities={char.roleAffinities} />
        </section>
      </div>

      {/* 攻略Tips */}
      <section className="card mt-6">
        <h2 className="text-xl font-bold mb-4">攻略Tips</h2>
        <ul className="space-y-2">
          {char.tips.map((tip, i) => (
            <li key={i} className="flex gap-2 text-gray-300">
              <span className="text-red-500 shrink-0">▸</span>
              {tip}
            </li>
          ))}
        </ul>
      </section>

      {/* ステータス比較リンク */}
      <section className="card mt-6">
        <h2 className="text-xl font-bold mb-3">ステータスページ連携</h2>
        <p className="text-gray-400 text-sm mb-4">
          他のキャラクターとステータスを比較してみよう
        </p>
        <div className="flex flex-wrap gap-2">
          {characters
            .filter((c) => c.id !== char.id)
            .map((c) => (
              <Link
                key={c.id}
                href={`/status?compare=${char.id},${c.id}`}
                className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm transition-colors"
              >
                vs {c.name}
              </Link>
            ))}
        </div>
        <Link
          href="/status"
          className="inline-block mt-4 text-sm text-red-400 hover:text-red-300 transition-colors"
        >
          全キャラ比較ページへ →
        </Link>
      </section>

      {/* 前後ナビ */}
      <div className="flex justify-between mt-8">
        {prev ? (
          <Link
            href={`/characters/${prev.id}`}
            className="text-sm text-gray-400 hover:text-gray-200 transition-colors"
          >
            ← {prev.name}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={`/characters/${next.id}`}
            className="text-sm text-gray-400 hover:text-gray-200 transition-colors"
          >
            {next.name} →
          </Link>
        ) : (
          <span />
        )}
      </div>
    </div>
  );
}
