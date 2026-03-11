interface Props {
  label: string;
  value: number;
  max?: number;
  color: string;
}

export default function StatusBar({ label, value, max = 100, color }: Props) {
  const pct = Math.min((value / max) * 100, 100);

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-gray-400 w-16 shrink-0">{label}</span>
      <div className="status-bar flex-1">
        <div
          className="status-bar-fill"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
      </div>
      <span className="text-sm font-mono text-gray-300 w-8 text-right">
        {value}
      </span>
    </div>
  );
}
