import Sidebar from "@/components/Sidebar";
import AdSlot from "@/components/AdSlot";

export default function ContactPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">お問い合わせ</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg p-6">
            <p className="text-sm text-[var(--color-text-muted)] mb-6">
              サイトに関するご意見・ご要望・誤りのご指摘がございましたら、以下のフォームよりお問い合わせください。
            </p>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">お名前</label>
                <input
                  type="text"
                  className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-sm"
                  placeholder="お名前"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">メールアドレス</label>
                <input
                  type="email"
                  className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-sm"
                  placeholder="email@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">お問い合わせ内容</label>
                <textarea
                  rows={5}
                  className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-sm"
                  placeholder="お問い合わせ内容をご記入ください"
                />
              </div>
              <button
                type="submit"
                className="bg-[var(--color-primary)] text-white rounded-lg px-6 py-2 text-sm font-medium hover:opacity-90 transition-opacity"
              >
                送信
              </button>
            </form>
          </div>
          <AdSlot slot="after-content" className="mt-6" />
        </div>
        <Sidebar />
      </div>
    </main>
  );
}
