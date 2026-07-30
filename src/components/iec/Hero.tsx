import { motion } from "motion/react";
import { ArrowRight, Sparkles } from "lucide-react";
import { Cta } from "./Cta";

const pillars = [
  "Artificial Intelligence",
  "Cyber Security",
  "Software Engineering",
  "Cloud Computing",
  "Digital Innovation",
];

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 26 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] as const },
});

export function Hero() {
  return (
    <section id="top" className="relative px-6 pb-24 pt-40 sm:pt-48">
      <div className="mx-auto max-w-4xl text-center">
        <motion.div {...fade(0.05)} className="flex justify-center">
          <span className="glass-panel inline-flex items-center gap-2.5 rounded-full px-4 py-1.5 text-[0.7rem] font-medium uppercase tracking-[0.22em] text-foreground/80">
            <Sparkles className="h-3.5 w-3.5 text-rose" aria-hidden />
            Interactive Technology Exhibition
          </span>
        </motion.div>

        <motion.h1
          {...fade(0.15)}
          className="mt-8 text-balance text-4xl font-semibold leading-[1.05] sm:text-6xl lg:text-7xl"
        >
          Masa Depan Teknologi{" "}
          <span className="text-gradient block sm:inline">Dimulai dari Sini</span>
        </motion.h1>

        <motion.p
          {...fade(0.25)}
          className="mx-auto mt-7 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          Jelajahi Artificial Intelligence, Cyber Security, Software Engineering, Cloud
          Computing, dan Digital Innovation melalui pengalaman interaktif yang dirancang
          Fakultas Informatika Universitas Harkat Negeri.
        </motion.p>

        <motion.div
          {...fade(0.35)}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <Cta href="#pengalaman" size="lg">
            Mulai Menjelajah
            <ArrowRight
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden
            />
          </Cta>
          <Cta href="#tentang" variant="glass" size="md">
            Tentang IEC
          </Cta>
        </motion.div>

        <motion.ul
          {...fade(0.45)}
          className="mt-14 flex flex-wrap items-center justify-center gap-x-3 gap-y-2.5"
        >
          {pillars.map((p) => (
            <li
              key={p}
              className="rounded-full border border-glass-border bg-glass px-3.5 py-1.5 text-xs text-muted-foreground backdrop-blur-md"
            >
              {p}
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
