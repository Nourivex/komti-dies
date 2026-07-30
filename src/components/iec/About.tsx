import { motion } from "motion/react";

const facts = [
  {
    title: "Untuk siapa?",
    body: "Siswa SMA, siswa SMK, orang tua, dan pengunjung umum yang ingin melihat langsung arah masa depan teknologi.",
  },
  {
    title: "Apa itu IEC?",
    body: "Informatics Experience Center adalah ruang pameran interaktif Fakultas Informatika untuk memperkenalkan teknologi secara menyenangkan dan mudah dipahami.",
  },
  {
    title: "Kapan?",
    body: "Berlangsung sepanjang rangkaian Dies Natalis 2026 Universitas Harkat Negeri, terbuka untuk umum tanpa biaya.",
  },
];

export function About() {
  return (
    <section id="tentang" className="relative px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="glass-panel overflow-hidden rounded-3xl p-8 sm:p-12"
        >
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-[0.7rem] font-medium uppercase tracking-[0.24em] text-rose">
                Tentang IEC
              </p>
              <h2 className="mt-4 text-3xl font-semibold leading-tight sm:text-4xl">
                Ruang pameran teknologi milik Fakultas Informatika.
              </h2>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
                Kami merancang pengalaman yang bisa disentuh, dicoba, dan dipahami siapa saja —
                agar setiap pengunjung pulang dengan gambaran nyata tentang karier di dunia
                teknologi.
              </p>
            </div>

            <dl className="grid gap-px overflow-hidden rounded-2xl border border-glass-border bg-glass-border sm:grid-cols-3">
              {facts.map((fact) => (
                <div key={fact.title} className="bg-background/60 p-6 backdrop-blur-md">
                  <dt className="font-display text-base font-semibold">{fact.title}</dt>
                  <dd className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {fact.body}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
