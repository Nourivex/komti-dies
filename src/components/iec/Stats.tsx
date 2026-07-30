import { motion } from "motion/react";
import { Activity, Brain, Globe, Sparkles, Users } from "lucide-react";
import { Counter } from "./Counter";

const stats = [
  { icon: Globe, label: "Negara Terhubung", value: 128, suffix: "+" },
  { icon: Activity, label: "Peristiwa Ancaman", value: 24567 },
  { icon: Users, label: "Pengunjung Hari Ini", value: 842 },
  { icon: Brain, label: "Analisis AI", value: 1289 },
  { icon: Sparkles, label: "Pengalaman Interaktif", value: 2 },
];

export function Stats() {
  return (
    <section id="statistik" className="relative px-6 py-20">
      <div className="mx-auto grid max-w-7xl gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="glass-panel group relative overflow-hidden rounded-2xl p-6 transition-colors duration-300 hover:border-rose/35"
          >
            <div className="pointer-events-none absolute inset-x-0 -top-16 h-32 bg-[radial-gradient(ellipse_at_center,var(--wine),transparent_70%)] opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-60" />
            <stat.icon className="relative h-5 w-5 text-rose" aria-hidden />
            <p className="relative mt-6 font-display text-3xl font-semibold">
              <Counter value={stat.value} suffix={stat.suffix} />
            </p>
            <p className="relative mt-2 text-xs uppercase tracking-[0.14em] text-muted-foreground">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
