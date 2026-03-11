import Sidebar from "@/components/Sidebar";
import AdSlot from "@/components/AdSlot";

export default function PrivacyPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">プライバシーポリシー</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg p-6 space-y-6 text-sm">
            <section>
              <h2 className="text-lg font-bold mb-2">広告について</h2>
              <p className="text-[var(--color-text-muted)]">
                当サイトでは、第三者配信の広告サービス（Google AdSense）を利用しています。
                広告配信事業者は、ユーザーの興味に応じた商品やサービスの広告を表示するため、
                Cookie を使用することがあります。
              </p>
            </section>
            <section>
              <h2 className="text-lg font-bold mb-2">アクセス解析について</h2>
              <p className="text-[var(--color-text-muted)]">
                当サイトでは、サイトの利用状況を把握するためにアクセス解析ツールを使用しています。
                データは匿名で収集されており、個人を特定するものではありません。
              </p>
            </section>
            <section>
              <h2 className="text-lg font-bold mb-2">Cookie について</h2>
              <p className="text-[var(--color-text-muted)]">
                当サイトでは、一部の機能でCookieを使用しています。
                ブラウザの設定により、Cookieの受け入れを拒否することができますが、
                その場合一部のサービスがご利用いただけない場合があります。
              </p>
            </section>
            <section>
              <h2 className="text-lg font-bold mb-2">個人情報の取り扱い</h2>
              <p className="text-[var(--color-text-muted)]">
                お問い合わせフォームで送信された個人情報は、お問い合わせへの対応以外の目的では使用しません。
                第三者への提供は行いません。
              </p>
            </section>
            <section>
              <h2 className="text-lg font-bold mb-2">ポリシーの変更</h2>
              <p className="text-[var(--color-text-muted)]">
                本プライバシーポリシーは、必要に応じて変更することがあります。
                変更後のポリシーは当ページにて公開します。
              </p>
              <p className="text-[var(--color-text-muted)] mt-2">最終更新日: 2026年3月11日</p>
            </section>
          </div>
          <AdSlot slot="after-content" className="mt-6" />
        </div>
        <Sidebar />
      </div>
    </main>
  );
}
