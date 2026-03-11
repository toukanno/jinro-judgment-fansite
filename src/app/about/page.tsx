import Sidebar from "@/components/Sidebar";
import AdSlot from "@/components/AdSlot";

export default function AboutPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">このサイトについて</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg p-6 space-y-4 text-sm">
            <p>
              「人狼ジャッジメント攻略ファンサイト」は、スマートフォンアプリ「人狼ジャッジメント」の非公式ファンサイトです。
            </p>
            <h2 className="text-lg font-bold">サイトの目的</h2>
            <p className="text-[var(--color-text-muted)]">
              人狼ジャッジメントの役職情報、攻略戦略、初心者向けガイド、構成考察など、
              ゲームを楽しむための情報を網羅的にまとめることを目的としています。
            </p>
            <h2 className="text-lg font-bold">免責事項</h2>
            <p className="text-[var(--color-text-muted)]">
              本サイトは非公式のファンサイトであり、ゲームの開発・運営元とは一切関係がありません。
              掲載情報の正確性には努めていますが、ゲームのアップデートにより内容が古くなる場合があります。
            </p>
            <h2 className="text-lg font-bold">著作権について</h2>
            <p className="text-[var(--color-text-muted)]">
              ゲーム内の画像やキャラクターの権利は、開発・運営元に帰属します。
              本サイトで使用している画像は、ファン活動の範囲内で使用しています。
            </p>
          </div>
          <AdSlot slot="after-content" className="mt-6" />
        </div>
        <Sidebar />
      </div>
    </main>
  );
}
