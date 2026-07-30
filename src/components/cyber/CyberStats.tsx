/**
 * CyberStats - Real-Time Telemetry Dashboard Panel.
 */

import { motion } from "motion/react";
import type { CyberStats as StatsType } from "@/lib/cyber-engine";
import { ATTACK_TYPES } from "@/lib/cyber-data";

interface CyberStatsProps {
  stats: StatsType;
}

export function CyberStats({ stats }: CyberStatsProps) {
  const maxCount = Math.max(...Object.values(stats.attackTypeCounts), 1);

  return (
    <div className="space-y-4">
      {/* 4 Core Stat Cards */}
      <div className="grid grid-cols-2 gap-2.5">
        <StatCard
          label="Serangan / Detik"
          value={stats.attacksPerSecond}
          unit="eps"
          color="text-rose font-mono"
        />
        <StatCard
          label="Ancaman Kritis"
          value={stats.criticalAlarms}
          unit="alerts"
          color="text-red-500 font-mono"
        />
        <StatCard
          label="Ancaman Aktif (Globe)"
          value={stats.activeThreats}
          unit="active"
          color="text-amber-400 font-mono"
        />
        <StatCard
          label="Total Serangan Logged"
          value={stats.totalAttacks}
          unit="events"
          color="text-emerald-400 font-mono"
        />
      </div>

      {/* Top Targeted Node */}
      <div className="glass-panel rounded-xl p-3.5 border border-glass-border">
        <div className="flex items-center justify-between text-[0.65rem] uppercase tracking-wider text-muted-foreground">
          <span>Target Teratas</span>
          <span className="h-2 w-2 rounded-full bg-rose animate-ping" />
        </div>
        <p className="mt-1 text-base font-bold text-rose tracking-wide truncate">
          {stats.topTarget}
        </p>
      </div>

      {/* Attack Vectors Distribution */}
      <div className="glass-panel rounded-xl p-3.5 border border-glass-border">
        <p className="mb-3 text-[0.65rem] font-semibold uppercase tracking-wider text-muted-foreground">
          Distribusional Vektor Serangan
        </p>
        <div className="space-y-2.5">
          {ATTACK_TYPES.slice(0, 7).map((type) => {
            const count = stats.attackTypeCounts[type.name] || 0;
            const percent = (count / maxCount) * 100;
            return (
              <div key={type.id} className="text-xs">
                <div className="flex items-center justify-between font-mono">
                  <span className="flex items-center gap-1.5 truncate">
                    <span>{type.icon}</span>
                    <span className="font-medium">{type.name}</span>
                  </span>
                  <span className="font-bold" style={{ color: type.color }}>
                    {count}
                  </span>
                </div>
                <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-black/40">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percent}%` }}
                    transition={{ duration: 0.3 }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: type.color }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  unit,
  color,
}: {
  label: string;
  value: number;
  unit: string;
  color: string;
}) {
  return (
    <div className="glass-panel rounded-xl p-3 border border-glass-border">
      <p className="text-[0.6rem] font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      <div className="mt-1 flex items-baseline gap-1">
        <motion.p
          key={value}
          initial={{ scale: 1.1, opacity: 0.8 }}
          animate={{ scale: 1, opacity: 1 }}
          className={`text-xl font-extrabold ${color}`}
        >
          {value.toLocaleString()}
        </motion.p>
        <span className="text-[0.6rem] text-muted-foreground">{unit}</span>
      </div>
    </div>
  );
}
