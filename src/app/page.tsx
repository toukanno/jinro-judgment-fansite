import { characters } from '@/data/characters';
import Link from 'next/link';

export default function HomePage() {
  const featured = characters.slice(0, 4);

  return (
    <div>
      <section className="text-center py-16">
        <h1 className="text-4xl font-bold mb-4">
          <span className="text-red-500">人狼ジャッジメント</span>{' '}
          <span className="text-gray-300">ファンサイト</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          キャラクターのステータス・評価・役職適性を徹底分析。
          あなたのプレイスタイルに合ったキャラクターを見つけよう。
        </p>
        <div className="flex gap-4 justify-center mt-8">
          <Link
            href="/characters"
            className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-medium transition-colors"
          >
            キャラクター一覧
          </Link>
          <Link
            href="/status"
            className="px-6 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg font-medium transition-colors"
          >
            ステータス比較
          </Link>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-bold mb-6">注目キャラクター</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featured.map((char) => (
            <Link
              key={char.id}
              href={`/characters/${char.id}`}
              className="card group"
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mb-4"
                style={{ backgroundColor: char.color + '22', color: char.color }}
              >
                {char.name[0]}
              </div>
              <h3 className="text-lg font-bold group-hover:text-red-400 transition-colors">
                {char.name}
              </h3>
              <p className="text-sm text-gray-500">{char.title}</p>
              <p className="text-xs text-gray-600 mt-2 line-clamp-2">
                {char.description}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
