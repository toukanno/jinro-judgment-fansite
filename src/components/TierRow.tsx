import { TierData } from "@/data/bias-tier-list";

function YahooScore({ score }: { score: number }) {
  return (
    <span className="text-xs text-gray-400 whitespace-nowrap" title="Yahoo!知恵袋での言及度">
      {"📢".repeat(score)}{"⬜".repeat(5 - score)}
    </span>
  );
}

export default function TierRow({ data }: { data: TierData }) {
  return (
    <div className={`rounded-lg border bg-gradient-to-r ${data.color} mb-4 overflow-hidden`}>
      <div className="flex flex-col sm:flex-row">
        {/* Tier badge */}
        <div className="flex items-center justify-center sm:w-20 py-3 sm:py-0 font-black text-3xl shrink-0 border-b sm:border-b-0 sm:border-r border-inherit">
          {data.tier}
        </div>

        {/* Entries */}
        <div className="flex-1 p-3 space-y-3">
          <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">
            {data.label}
          </p>
          {data.entries.map((entry) => (
            <div
              key={entry.role}
              className="bg-gray-900/60 rounded-md p-3 hover:bg-gray-900/80 transition"
            >
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span className="font-bold text-white">{entry.role}</span>
                <span className="text-sm text-gray-300">— {entry.bias}</span>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                {entry.detail}
              </p>
              <div className="mt-2 flex items-center gap-2">
                <span className="text-xs text-gray-500">Yahoo!知恵袋頻出度:</span>
                <YahooScore score={entry.yahooScore} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
