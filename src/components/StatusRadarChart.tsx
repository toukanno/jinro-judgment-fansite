'use client';

import { CharacterStatus } from '@/types/character';

interface Props {
  status: CharacterStatus;
  color: string;
  size?: number;
}

const STATUS_LABELS: { key: keyof CharacterStatus; label: string }[] = [
  { key: 'attack', label: '攻撃' },
  { key: 'defense', label: '防御' },
  { key: 'intelligence', label: '知力' },
  { key: 'charisma', label: 'カリスマ' },
  { key: 'luck', label: '運' },
  { key: 'stamina', label: '体力' },
];

function polarToCartesian(
  cx: number,
  cy: number,
  r: number,
  angleDeg: number
) {
  const angleRad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(angleRad), y: cy + r * Math.sin(angleRad) };
}

export default function StatusRadarChart({ status, color, size = 280 }: Props) {
  const cx = size / 2;
  const cy = size / 2;
  const maxR = size * 0.38;
  const n = STATUS_LABELS.length;

  const gridLevels = [0.2, 0.4, 0.6, 0.8, 1.0];

  const dataPoints = STATUS_LABELS.map((s, i) => {
    const angle = (360 / n) * i;
    const value = status[s.key] / 100;
    const point = polarToCartesian(cx, cy, maxR * value, angle);
    const labelPoint = polarToCartesian(cx, cy, maxR + 20, angle);
    return { ...s, angle, value, point, labelPoint };
  });

  const polygonPoints = dataPoints.map((d) => `${d.point.x},${d.point.y}`).join(' ');

  return (
    <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size}>
      {/* Grid */}
      {gridLevels.map((level) => {
        const pts = Array.from({ length: n }, (_, i) => {
          const angle = (360 / n) * i;
          const p = polarToCartesian(cx, cy, maxR * level, angle);
          return `${p.x},${p.y}`;
        }).join(' ');
        return (
          <polygon
            key={level}
            points={pts}
            fill="none"
            stroke="#374151"
            strokeWidth="1"
          />
        );
      })}

      {/* Axes */}
      {dataPoints.map((d) => {
        const end = polarToCartesian(cx, cy, maxR, d.angle);
        return (
          <line
            key={d.key}
            x1={cx}
            y1={cy}
            x2={end.x}
            y2={end.y}
            stroke="#374151"
            strokeWidth="1"
          />
        );
      })}

      {/* Data polygon */}
      <polygon
        points={polygonPoints}
        fill={color + '33'}
        stroke={color}
        strokeWidth="2"
      />

      {/* Data dots */}
      {dataPoints.map((d) => (
        <circle
          key={d.key}
          cx={d.point.x}
          cy={d.point.y}
          r={4}
          fill={color}
        />
      ))}

      {/* Labels */}
      {dataPoints.map((d) => (
        <text
          key={d.key}
          x={d.labelPoint.x}
          y={d.labelPoint.y}
          textAnchor="middle"
          dominantBaseline="central"
          fill="#9ca3af"
          fontSize="12"
        >
          {d.label}
        </text>
      ))}
    </svg>
  );
}
