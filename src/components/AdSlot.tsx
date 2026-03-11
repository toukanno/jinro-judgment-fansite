"use client";

type AdSlotProps = {
  slot: "header" | "sidebar-top" | "sidebar-bottom" | "in-content" | "footer" | "after-content";
  className?: string;
};

export default function AdSlot({ slot, className = "" }: AdSlotProps) {
  // 本番では Google AdSense コードをここに挿入
  // 開発時はプレースホルダーを表示
  const sizes: Record<string, string> = {
    header: "h-[90px] w-full",
    "sidebar-top": "h-[250px] w-full",
    "sidebar-bottom": "h-[250px] w-full",
    "in-content": "h-[250px] w-full",
    footer: "h-[90px] w-full",
    "after-content": "h-[250px] w-full",
  };

  return (
    <div className={`ad-slot rounded-lg ${sizes[slot] || "h-[90px]"} ${className}`}>
      <span>広告 ({slot})</span>
    </div>
  );
}
