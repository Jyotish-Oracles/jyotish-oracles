import type { ChartPlanet } from "@/lib/astro/types";

interface Props {
  planets: ChartPlanet[];
}

function formatDegree(deg: number): string {
  const d = Math.floor(deg);
  const m = Math.floor((deg - d) * 60);
  const s = Math.floor(((deg - d) * 60 - m) * 60);
  return `${d}°${m}'${s}"`;
}

export default function PositionsTable({ planets }: Props) {
  return (
    <div>
      <h3 className="mb-3 font-serif text-lg font-semibold">Planetary Positions</h3>
      <div className="overflow-x-auto rounded-xl border border-border-light">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border-light bg-surface text-left">
              <th className="px-3 py-2.5 font-medium text-text-secondary">Planet</th>
              <th className="px-3 py-2.5 font-medium text-text-secondary">Longitude</th>
              <th className="px-3 py-2.5 font-medium text-text-secondary">Rashi</th>
              <th className="px-3 py-2.5 font-medium text-text-secondary">Nakshatra</th>
              <th className="px-3 py-2.5 font-medium text-text-secondary">Pada</th>
              <th className="px-3 py-2.5 font-medium text-text-secondary">Lord</th>
              <th className="px-3 py-2.5 font-medium text-text-secondary">Speed</th>
            </tr>
          </thead>
          <tbody>
            {planets.map((p) => (
              <tr
                key={p.id}
                className="border-b border-border-light last:border-none hover:bg-surface/50 transition-colors"
              >
                <td className="px-3 py-2.5 font-medium">
                  {p.name}
                  <span className="ml-1 text-xs text-text-tertiary">{p.sanskrit}</span>
                </td>
                <td className="px-3 py-2.5 font-mono text-xs">
                  {formatDegree(p.longitude)}
                </td>
                <td className="px-3 py-2.5">
                  {p.rashiName}
                  <span className="ml-1 text-xs text-text-tertiary">
                    {formatDegree(p.rashiDegree)}
                  </span>
                </td>
                <td className="px-3 py-2.5">{p.nakshatraName}</td>
                <td className="px-3 py-2.5 text-center">{p.pada}</td>
                <td className="px-3 py-2.5 text-text-secondary">{p.nakshatraLord}</td>
                <td className="px-3 py-2.5 font-mono text-xs">
                  {p.isRetrograde && (
                    <span className="mr-1 rounded bg-accent-light px-1.5 py-0.5 text-[10px] font-semibold text-accent">
                      R
                    </span>
                  )}
                  {Math.abs(p.speed).toFixed(4)}°/d
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
