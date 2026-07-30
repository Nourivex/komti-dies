import { createFileRoute } from "@tanstack/react-router";
import { NavigatorPage } from "@/components/navigator/NavigatorPage";

const title = "AI Career Navigator - Informatics Experience Center";
const description =
  "Temukan jalur karier teknologi masa depanmu dengan bantuan kecerdasan buatan yang memetakan minat, kemampuan, dan potensimu.";

export const Route = createFileRoute("/navigator")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/navigator" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/navigator" }],
  }),
  component: NavigatorPage,
});
