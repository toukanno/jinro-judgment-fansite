import Link from "next/link";

const navItems = [
  { href: "/roles", label: "役職一覧" },
  { href: "/strategies", label: "攻略" },
  { href: "/beginners", label: "初心者ガイド" },
  { href: "/compositions", label: "構成" },
  { href: "/glossary", label: "用語集" },
  { href: "/faq", label: "FAQ" },
];

export default function Header() {
  return (
    <header className="border-b border-[var(--color-border)] bg-[var(--color-surface)]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold text-[var(--color-primary)]">
            人狼ジャッジメント攻略
          </Link>
          <nav className="hidden md:flex gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
