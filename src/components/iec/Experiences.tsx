import { motion } from "motion/react";
import {
  ArrowUpRight,
  Brain,
  Globe2,
  MessageCircle,
  type LucideIcon,
} from "lucide-react";
import globeImg from "@/assets/globe.png";
import { Cta } from "./Cta";
import { AiOrbit } from "./AiOrbit";
import { TikaChat } from "./TikaChat";

type Experience = {
  id: string;
  tag: string;
  icon: LucideIcon;
  title: string;
  description: string;
  points: string[];
  action: string;
  preview: "globe" | "ai" | "tika";
};

const experiences: Experience[] = [
  {
    id: "cyber",
    tag: "Live Visualization",
    icon: Globe2,
    title: "Global Cyber Intelligence",
    description:
      "Saksikan visualisasi ancaman siber dunia secara langsung melalui peta interaktif, aliran serangan real-time, dan statistik keamanan global.",
    points: [
      "Peta dunia interaktif",
      "Busur serangan animatif",
      "Indikator peristiwa langsung",
    ],
    action: "Launch Experience",
    preview: "globe",
  },
  {
    id: "ai",
    tag: "AI Powered",
    icon: Brain,
    title: "AI Career Navigator",
    description:
      "Temukan jalur karier teknologi masa depanmu dengan bantuan kecerdasan buatan yang memetakan minat, kemampuan, dan potensimu.",
    points: [
      "Radar minat & kepribadian",
      "Grafik kecocokan karier",
      "Roadmap keterampilan personal",
    ],
    action: "Start Analysis",
    preview: "ai",
  },
  {
    id: "tika",
    tag: "Chat Assistant",
    icon: MessageCircle,
    title: "TIKA - Campus Assistant",
    description:
      "Tanya apa saja tentang kampus, program studi, pendaftaran, fasilitas, dan karier lulusan. TIKA siap membantu!",
    points: [
      "Info program studi Informatika",
      "Panduan pendaftaran mahasiswa baru",
      "Prospek karier & beasiswa",
    ],
    action: "Chat with TIKA",
    preview: "tika",
  },
];

export function Experiences() {
  return (
    <section id="pengalaman" className="relative px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl"
        >
          <p className="text-[0.7rem] font-medium uppercase tracking-[0.24em] text-rose">
            Tiga Pengalaman Interaktif
          </p>
          <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
            Rasakan teknologi, bukan sekadar melihatnya.
          </h2>
        </motion.div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {experiences.map((exp, i) => (
            <motion.article
              key={exp.id}
              initial={{ opacity: 0, y: 42 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.8,
                delay: i * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="glass-panel group relative overflow-hidden rounded-3xl p-8 transition-all duration-500 hover:border-rose/35 sm:p-10"
            >
              <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[radial-gradient(circle,var(--wine),transparent_70%)] opacity-40 blur-2xl transition-opacity duration-500 group-hover:opacity-70" />

              <div className="relative flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-glass-border bg-glass">
                  <exp.icon className="h-5 w-5 text-rose" aria-hidden />
                </span>
                <span className="rounded-full border border-rose/30 px-3 py-1 text-[0.65rem] font-medium uppercase tracking-[0.18em] text-rose">
                  {exp.tag}
                </span>
              </div>

              <h3 className="relative mt-7 text-2xl font-semibold sm:text-3xl">
                {exp.title}
              </h3>
              <p className="relative mt-4 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-[0.95rem]">
                {exp.description}
              </p>

              <ul className="relative mt-6 space-y-2.5">
                {exp.points.map((point) => (
                  <li
                    key={point}
                    className="flex items-center gap-3 text-sm text-foreground/80"
                  >
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-rose shadow-[0_0_10px_var(--rose)]" />
                    {point}
                  </li>
                ))}
              </ul>

              <div className="relative mt-8">
                {exp.id === "tika" ? (
                  <Cta href="/tika" size="md">
                    {exp.action}
                    <ArrowUpRight
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden
                    />
                  </Cta>
                ) : (
                  <Cta
                    href={
                      exp.id === "ai"
                        ? "/navigator"
                        : exp.id === "cyber"
                          ? "/cyber"
                          : "#pengalaman"
                    }
                    size="md"
                  >
                    {exp.action}
                    <ArrowUpRight
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden
                    />
                  </Cta>
                )}
              </div>

              <div className="relative mt-10 h-64 sm:h-72">
                {exp.preview === "globe" ? (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="absolute h-56 w-56 rounded-full bg-[radial-gradient(circle,var(--wine),transparent_65%)] opacity-60 blur-2xl" />
                    <img
                      src={globeImg}
                      alt="Visualisasi globe ancaman siber global"
                      loading="lazy"
                      width={1024}
                      height={1024}
                      className="animate-float-slow relative h-full w-auto object-contain drop-shadow-[0_20px_60px_var(--wine)]"
                    />
                    <span className="glass-panel absolute right-2 top-4 rounded-full px-3 py-1.5 text-[0.65rem] uppercase tracking-[0.16em]">
                      <span className="animate-pulse-soft mr-2 inline-block h-1.5 w-1.5 rounded-full bg-rose align-middle" />
                      Live feed
                    </span>
                  </div>
                ) : exp.preview === "tika" ? (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="absolute h-56 w-56 rounded-full bg-[radial-gradient(circle,var(--rose),transparent_65%)] opacity-40 blur-2xl" />
                    {/* Chat bubble mockup */}
                    <div className="relative space-y-3">
                      <div className="glass-panel ml-8 max-w-[200px] rounded-2xl rounded-bl-sm px-4 py-2.5 text-xs">
                        <span className="mb-1 block text-[0.6rem] font-medium text-rose">
                          TIKA
                        </span>
                        Halo! Ada yang bisa aku bantu? 😊
                      </div>
                      <div className="mr-8 max-w-[180px] rounded-2xl rounded-br-sm bg-[image:var(--gradient-cta)] px-4 py-2.5 text-xs text-white">
                        Apa itu Teknik Informatika?
                      </div>
                      <div className="glass-panel ml-8 max-w-[200px] rounded-2xl rounded-bl-sm px-4 py-2.5 text-xs">
                        <span className="mb-1 block text-[0.6rem] font-medium text-rose">
                          TIKA
                        </span>
                        S-1 Teknik Informatika fokus pada Software Engineering,
                        AI, Cyber Security! 🚀
                      </div>
                    </div>
                    <span className="glass-panel absolute right-2 top-4 rounded-full px-3 py-1.5 text-[0.65rem] uppercase tracking-[0.16em]">
                      <span className="animate-pulse-soft mr-2 inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 align-middle" />
                      Online
                    </span>
                  </div>
                ) : (
                  <AiOrbit />
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* TIKA Chatbot - floating button */}
      <TikaChat />
    </section>
  );
}
