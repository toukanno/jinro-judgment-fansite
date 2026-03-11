import { characters } from '@/data/characters';
import Link from 'next/link';

export const metadata = {
  title: 'キャラクター一覧 | 人狼ジャッジメント ファンサイト',
};

function OverallRating(rating: { usability: number; beginnerFriendly: number; advancedPlay: number; versatility: number; popularity: number }) {
  return (
    (rating.usability + rating.beginnerFriendly + rating.advancedPlay + rating.versatility + rating.popularity) / 5
  );
}

export default function CharactersPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">キャラクター一覧</h1>
      <p className="text-gray-400 mb-8">
        各キャラクターのステータス・評価・役職適性を確認できます
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {characters.map((char) => {
          const avg = OverallRating(char.rating);
          const bestRole = char.roleAffinities.find((r) => r.affinity === 'S') || char.roleAffinities[0];

          return (
            <Link
              key={char.id}
              href={`/characters/${char.id}`}
              className="card group flex gap-4"
            >
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold shrink-0"
                style={{
                  backgroundColor: char.color + '22',
                  color: char.color,
                }}
              >
                {char.name[0]}
              </div>
              <div className="min-w-0">
                <h2 className="text-lg font-bold group-hover:text-red-400 transition-colors">
                  {char.name}
                  <span className="text-xs text-gray-500 ml-2 font-normal">
                    {char.nameEn}
                  </span>
                </h2>
                <p className="text-sm text-gray-500">{char.title}</p>
                <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
                  <span>
                    総合{' '}
                    <span className="text-yellow-400">
                      {'★'.repeat(Math.round(avg))}
                    </span>
                  </span>
                  {bestRole && (
                    <span>
                      得意: {bestRole.role}
                      <span
                        className={`ml-1 affinity-badge affinity-${bestRole.affinity} !w-5 !h-5 !text-xs`}
                      >
                        {bestRole.affinity}
                      </span>
                    </span>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
