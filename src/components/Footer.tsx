import Link from "next/link";
import AdSlot from "./AdSlot";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-surface)] mt-12">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <AdSlot slot="footer" className="mb-6" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm text-[var(--color-text-muted)]">
          <div>
            <h4 className="font-bold text-[var(--color-text)] mb-2">コンテンツ</h4>
            <ul className="space-y-1">
              <li><Link href="/roles" className="hover:text-[var(--color-text)]">役職一覧</Link></li>
              <li><Link href="/strategies" className="hover:text-[var(--color-text)]">攻略</Link></li>
              <li><Link href="/compositions" className="hover:text-[var(--color-text)]">構成</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-[var(--color-text)] mb-2">ガイド</h4>
            <ul className="space-y-1">
              <li><Link href="/beginners" className="hover:text-[var(--color-text)]">初心者ガイド</Link></li>
              <li><Link href="/glossary" className="hover:text-[var(--color-text)]">用語集</Link></li>
              <li><Link href="/faq" className="hover:text-[var(--color-text)]">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-[var(--color-text)] mb-2">サイト情報</h4>
            <ul className="space-y-1">
              <li><Link href="/about" className="hover:text-[var(--color-text)]">このサイトについて</Link></li>
              <li><Link href="/contact" className="hover:text-[var(--color-text)]">お問い合わせ</Link></li>
              <li><Link href="/privacy" className="hover:text-[var(--color-text)]">プライバシーポリシー</Link></li>
            </ul>
          </div>
        </div>
        <p className="text-center text-xs text-[var(--color-text-muted)] mt-6">
          &copy; 2026 人狼ジャッジメント攻略ファンサイト. 当サイトは非公式ファンサイトです。
        </p>
      </div>
    </footer>
  );
}
