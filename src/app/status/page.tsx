'use client';

import { characters } from '@/data/characters';
import { Character, CharacterStatus } from '@/types/character';
import StatusRadarChart from '@/components/StatusRadarChart';
import StatusBar from '@/components/StatusBar';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';

const STATUS_KEYS: { key: keyof CharacterStatus; label: string }[] = [
  { key: 'attack', label: '攻撃' },
  { key: 'defense', label: '防御' },
  { key: 'intelligence', label: '知力' },
  { key: 'charisma', label: 'カリスマ' },
  { key: 'luck', label: '運' },
  { key: 'stamina', label: '体力' },
];

function StatusCompareContent() {
  const searchParams = useSearchParams();
  const compareParam = searchParams.get('compare');

  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    if (compareParam) {
      setSelected(compareParam.split(',').filter((id) => characters.some((c) => c.id === id)));
    }
  }, [compareParam]);

  const toggleCharacter = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const selectedChars = selected
    .map((id) => characters.find((c) => c.id === id))
    .filter(Boolean) as Character[];

  // ランキング計算
  const rankings = STATUS_KEYS.map(({ key, label }) => {
    const sorted = [...characters].sort((a, b) => b.status[key] - a.status[key]);
    return { key, label, ranking: sorted };
  });

  const totalRanking = [...characters].sort(
    (a, b) =>
      Object.values(b.status).reduce((s, v) => s + v, 0) -
      Object.values(a.status).reduce((s, v) => s + v, 0)
  );

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">ステータス比較</h1>
      <p className="text-gray-400 mb-6">
        キャラクターを選択してステータスを比較。プロフィールページからも直接比較できます。
      </p>

      {/* キャラ選択 */}
      <div className="flex flex-wrap gap-2 mb-8">
        {characters.map((char) => (
          <button
            key={char.id}
            onClick={() => toggleCharacter(char.id)}
            className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
              selected.includes(char.id)
                ? ''
                : 'bg-gray-800 hover:bg-gray-700'
            }`}
            style={
              selected.includes(char.id)
                ? { backgroundColor: char.color + '22', color: char.color, outlineColor: char.color, outlineStyle: 'solid', outlineWidth: '2px' }
                : undefined
            }
          >
            {char.name}
          </button>
        ))}
      </div>

      {/* 比較表示 */}
      {selectedChars.length > 0 && (
        <section className="card mb-8">
          <h2 className="text-xl font-bold mb-6">選択キャラ比較</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {selectedChars.map((char) => (
              <div key={char.id}>
                <Link
                  href={`/characters/${char.id}`}
                  className="flex items-center gap-3 mb-4 group"
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center font-bold"
                    style={{
                      backgroundColor: char.color + '22',
                      color: char.color,
                    }}
                  >
                    {char.name[0]}
                  </div>
                  <div>
                    <span className="font-bold group-hover:text-red-400 transition-colors">
                      {char.name}
                    </span>
                    <span className="text-xs text-gray-500 ml-2">
                      合計 {Object.values(char.status).reduce((a, b) => a + b, 0)}
                    </span>
                  </div>
                </Link>
                <div className="flex justify-center">
                  <StatusRadarChart
                    status={char.status}
                    color={char.color}
                    size={220}
                  />
                </div>
                <div className="space-y-2 mt-4">
                  {STATUS_KEYS.map(({ key, label }) => (
                    <StatusBar
                      key={key}
                      label={label}
                      value={char.status[key]}
                      color={char.color}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 総合ランキング */}
      <section className="card mb-6">
        <h2 className="text-xl font-bold mb-4">総合ステータスランキング</h2>
        <div className="space-y-2">
          {totalRanking.map((char, i) => {
            const total = Object.values(char.status).reduce((a, b) => a + b, 0);
            return (
              <Link
                key={char.id}
                href={`/characters/${char.id}`}
                className="flex items-center gap-3 py-2 hover:bg-gray-800/50 rounded-lg px-2 transition-colors"
              >
                <span className="text-lg font-bold text-gray-500 w-8">
                  {i + 1}
                </span>
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                  style={{
                    backgroundColor: char.color + '22',
                    color: char.color,
                  }}
                >
                  {char.name[0]}
                </div>
                <span className="font-medium flex-1">{char.name}</span>
                <div className="w-48">
                  <div className="status-bar">
                    <div
                      className="status-bar-fill"
                      style={{
                        width: `${(total / 600) * 100}%`,
                        backgroundColor: char.color,
                      }}
                    />
                  </div>
                </div>
                <span className="text-sm font-mono text-gray-400 w-10 text-right">
                  {total}
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 各ステータスランキング */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {rankings.map(({ key, label, ranking }) => (
          <div key={key} className="card">
            <h3 className="font-bold mb-3">{label}ランキング</h3>
            <div className="space-y-1">
              {ranking.slice(0, 5).map((char, i) => (
                <Link
                  key={char.id}
                  href={`/characters/${char.id}`}
                  className="flex items-center gap-2 text-sm py-1 hover:text-red-400 transition-colors"
                >
                  <span className="text-gray-500 w-5">{i + 1}.</span>
                  <span className="flex-1">{char.name}</span>
                  <span className="font-mono text-gray-400">
                    {char.status[key]}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function StatusPage() {
  return (
    <Suspense fallback={<div className="text-gray-400">読み込み中...</div>}>
      <StatusCompareContent />
    </Suspense>
  );
}
