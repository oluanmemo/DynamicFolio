type LocalizedText = { pt: string; en: string };

interface EditDetails {
  id: string;
  title: LocalizedText;
  category: LocalizedText;
  description: LocalizedText;
  featured: boolean;
}

export type SelectedEdit = EditDetails & (
  | { status: "pending"; sourceFile: string }
  | ({ status: "available"; format: "vertical" | "horizontal"; originalUrl: string; thumbnail: string } & (
    | { provider: "youtube"; videoId: string }
    | { provider: "local"; src: string }
  ))
);

export const selectedEdits: SelectedEdit[] = [
  {
    id: "teuzz",
    featured: true,
    status: "available",
    provider: "local",
    format: "horizontal",
    src: "/videos/teuzz-edit.optimized.mp4",
    originalUrl: "/videos/teuzz-edit.optimized.mp4",
    thumbnail: "/proofs/teuzz-edit.webp",
    title: { pt: "Teuzz — Teste de edição", en: "Teuzz — Editing test" },
    category: { pt: "Gameplay · Creator · Teste de edição", en: "Gameplay · Creator · Editing test" },
    description: { pt: "Um teste de edição de gameplay de Fortnite.", en: "A Fortnite gameplay editing test." },
  },
  {
    id: "rock-in-rio",
    featured: false,
    status: "available",
    provider: "youtube",
    format: "vertical",
    videoId: "rooP0ScK9oQ",
    originalUrl: "https://www.youtube.com/shorts/rooP0ScK9oQ",
    thumbnail: "https://i.ytimg.com/vi/rooP0ScK9oQ/oar2.jpg",
    title: { pt: "Rock in Rio — Aftermovie", en: "Rock in Rio — Aftermovie" },
    category: { pt: "Evento · Aftermovie · Short-form", en: "Event · Aftermovie · Short-form" },
    description: { pt: "Um olhar autoral e descontraído sobre o festival.", en: "An independent, lighthearted take on the festival." },
  },
  {
    id: "madebyluan",
    featured: false,
    status: "available",
    provider: "youtube",
    format: "vertical",
    videoId: "zzDNOpqG--U",
    originalUrl: "https://www.youtube.com/shorts/zzDNOpqG--U",
    thumbnail: "https://i.ytimg.com/vi/zzDNOpqG--U/oar2.jpg",
    title: { pt: "MadeByLuan — Primeira prospecção", en: "MadeByLuan — First outreach" },
    category: { pt: "Conteúdo autoral · Short-form", en: "Independent content · Short-form" },
    description: { pt: "A primeira prospecção, contada em um vídeo autoral.", en: "The first outreach experience, told in an independent video." },
  },
];
