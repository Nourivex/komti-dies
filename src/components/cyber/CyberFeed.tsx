/**
 * CyberFeed - Live Telemetry Attack Stream.
 */

import { motion, AnimatePresence } from "motion/react";
import type { Attack } from "@/lib/cyber-engine";

interface CyberFeedProps {
  attacks: Attack[];
  selectedCategory: string;
}

export function CyberFeed({ attacks, selectedCategory }: CyberFeedProps) {
  const filteredAttacks = attacks.filter((atk) => {
    if (selectedCategory === "all") return true;
    if (selectedCategory === "critical") return atk.type.severity === "critical";
    if (selectedCategory === "indonesia")
      return atk.source.country === "Indonesia" || atk.target.country === "Indonesia";
    return atk.type.id === selectedCategory;
  }).slice(0, 25);

  return (
    <div className="space-y-2 overflow-hidden font-mono text-xs">
      <AnimatePresence initial={false}>
        {filteredAttacks.map((attack) => (
          <motion.div
            key={attack.id}
            initial={{ opacity: 0, x: 24, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -24, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="glass-panel group relative overflow-hidden rounded-xl border border-glass-border p-3 transition-all hover:border-rose/50"
          >
            {/* Left Severity Accent Bar */}
            <div
              className="absolute inset-y-0 left-0 w-1"
              style={{ backgroundColor: attack.type.color }}
            />

            <div className="flex items-center justify-between gap-2 pl-2">
              {/* Type Badge & Icon */}
              <div className="flex items-center gap-2 min-w-0">
                <span
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-sm shadow-sm"
                  style={{
                    backgroundColor: `${attack.type.color}25`,
                    color: attack.type.color,
                  }}
                >
                  {attack.type.icon}
                </span>

                <div className="truncate">
                  <span
                    className="font-semibold tracking-wide text-sm block truncate"
                    style={{ color: attack.type.color }}
                  >
                    {attack.type.name}
                  </span>
                  <span className="text-[0.65rem] text-muted-foreground">
                    Port {attack.port} • {attack.protocol} • {attack.bandwidth}
                  </span>
                </div>
              </div>

              {/* Timestamp */}
              <span className="shrink-0 text-[0.65rem] text-muted-foreground font-sans">
                {getTimeAgo(attack.timestamp)}
              </span>
            </div>

            {/* Source & Target IP Route */}
            <div className="mt-2.5 flex items-center justify-between rounded-lg bg-black/30 px-2.5 py-1.5 text-[0.7rem] pl-2">
              <div className="flex items-center gap-1.5 truncate">
                <span className="font-semibold text-foreground">{attack.source.name}</span>
                <span className="text-muted-foreground">({attack.sourceIP})</span>
              </div>
              <span className="text-rose font-bold px-1">➔</span>
              <div className="flex items-center gap-1.5 truncate text-right">
                <span className="font-semibold text-foreground">{attack.target.name}</span>
                <span className="text-muted-foreground">({attack.targetIP})</span>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {filteredAttacks.length === 0 && (
        <div className="py-8 text-center text-xs text-muted-foreground">
          Menunggu aliran data simulasi...
        </div>
      )}
    </div>
  );
}

function getTimeAgo(timestamp: number): string {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  if (seconds < 2) return "LIVE";
  if (seconds < 60) return `${seconds}s lalu`;
  const minutes = Math.floor(seconds / 60);
  return `${minutes}m lalu`;
}
