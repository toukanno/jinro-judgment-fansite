interface Props {
  label: string;
  value: number;
  max?: number;
}

export default function RatingStars({ label, value, max = 5 }: Props) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-gray-400 w-28 shrink-0">{label}</span>
      <div className="flex gap-0.5">
        {Array.from({ length: max }, (_, i) => (
          <span
            key={i}
            className={`rating-star ${i < value ? 'text-yellow-400' : 'text-gray-700'}`}
          >
            ★
          </span>
        ))}
      </div>
    </div>
  );
}
