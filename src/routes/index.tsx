import { createFileRoute } from "@tanstack/react-router";
import { Background } from "@/components/iec/Background";
import { Header } from "@/components/iec/Header";
import { Hero } from "@/components/iec/Hero";
import { Experiences } from "@/components/iec/Experiences";
import { Stats } from "@/components/iec/Stats";
import { About } from "@/components/iec/About";
import { Footer } from "@/components/iec/Footer";
import { useTheme } from "@/components/ThemeProvider";

const title = "Informatics Experience Center — Universitas Harkat Negeri";
const description =
  "Pameran teknologi interaktif Fakultas Informatika Universitas Harkat Negeri: jelajahi AI, Cyber Security, Cloud, dan inovasi digital di Dies Natalis 2026.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Event",
          name: "Informatics Experience Center — Dies Natalis 2026",
          description,
          organizer: {
            "@type": "CollegeOrUniversity",
            name: "Universitas Harkat Negeri",
          },
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={`${theme} relative min-h-screen overflow-x-hidden`}>
      <Background />
      <Header isDark={theme === "dark"} onToggleTheme={toggleTheme} />
      <main>
        <Hero />
        <Experiences />
        <Stats />
        <About />
      </main>
      <Footer />
    </div>
  );
}
