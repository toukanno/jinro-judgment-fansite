import { RoleAffinity } from '@/types/character';

interface Props {
  affinities: RoleAffinity[];
}

export default function RoleAffinityTable({ affinities }: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-800">
            <th className="text-left py-2 text-gray-400 font-medium">役職</th>
            <th className="text-center py-2 text-gray-400 font-medium w-16">
              適性
            </th>
            <th className="text-left py-2 text-gray-400 font-medium">
              コメント
            </th>
          </tr>
        </thead>
        <tbody>
          {affinities.map((a) => (
            <tr key={a.role} className="border-b border-gray-800/50">
              <td className="py-3 font-medium">{a.role}</td>
              <td className="py-3 text-center">
                <span className={`affinity-badge affinity-${a.affinity}`}>
                  {a.affinity}
                </span>
              </td>
              <td className="py-3 text-gray-400">{a.comment}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
