import { createFileRoute } from "@tanstack/react-router";
import { CyberPage } from "@/components/cyber/CyberPage";

const title = "Global Cyber Intelligence — Informatics Experience Center";
const description =
  "Saksikan visualisasi ancaman siber dunia secara langsung melalui peta interaktif, aliran serangan real-time, dan statistik keamanan global.";

export const Route = createFileRoute("/cyber")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/cyber" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/cyber" }],
  }),
  component: CyberPage,
});
