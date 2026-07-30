import { createFileRoute } from "@tanstack/react-router";
import { TikaPage } from "@/components/iec/tika3d/TikaPage";

const title = "TIKA - Campus Assistant | Informatics Experience Center";
const description =
  "Tanya apa saja tentang kampus, program studi, pendaftaran, fasilitas, dan karier lulusan Universitas Harkat Negeri.";

export const Route = createFileRoute("/tika")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/tika" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/tika" }],
  }),
  component: TikaPage,
});
