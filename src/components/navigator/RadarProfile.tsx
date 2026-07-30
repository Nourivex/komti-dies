import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import type { RadarScore } from "@/lib/navigator-adaptive-scoring";

interface RadarProfileProps {
  scores: RadarScore[];
}

function CustomTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{ payload: { axis: string; score: number } }>;
}) {
  if (!active || !payload?.length) return null;
  const data = payload[0].payload;
  return (
    <div className="glass-panel rounded-xl px-3 py-2 text-sm">
      <p className="font-medium">{data.axis}</p>
      <p className="text-rose">{data.score}%</p>
    </div>
  );
}

export function RadarProfile({ scores }: RadarProfileProps) {
  const data = scores.map((s) => ({
    ...s,
    fullMark: 100,
  }));

  return (
    <div className="mx-auto max-w-lg">
      <div className="glass-panel rounded-3xl p-6 sm:p-8">
        <ResponsiveContainer width="100%" height={320}>
          <RadarChart data={data} cx="50%" cy="50%" outerRadius="75%">
            <PolarGrid stroke="rgba(255,255,255,0.08)" />
            <PolarAngleAxis
              dataKey="axis"
              tick={{
                fill: "rgba(255,255,255,0.7)",
                fontSize: 12,
                fontWeight: 500,
              }}
            />
            <PolarRadiusAxis
              angle={90}
              domain={[0, 100]}
              tick={false}
              axisLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Radar
              name="Profil"
              dataKey="score"
              stroke="var(--rose)"
              fill="var(--rose)"
              fillOpacity={0.2}
              strokeWidth={2}
            />
          </RadarChart>
        </ResponsiveContainer>

        {/* Score chips */}
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {scores.map((s) => (
            <span
              key={s.axis}
              className="rounded-full border border-glass-border bg-background/60 px-3 py-1 text-xs"
            >
              {s.axis}: <strong className="text-rose">{s.score}%</strong>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
