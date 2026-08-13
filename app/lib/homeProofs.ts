export type Language = "pt" | "en";
export type LocalizedText = Record<Language, string>;

export interface EvidenceMetric {
  value: string;
  label: LocalizedText;
  scope: "single-video" | "edited-video-set";
  sourceUrls: string[];
  capturedAt: string;
}

export const verifiedMetrics: EvidenceMetric[] = [];

export type DevComposition = "browser" | "phones" | "ecosystem";

export interface DevProof {
  id: "vaccari" | "riffmaker" | "multilaser";
  composition: DevComposition;
  title: LocalizedText;
  label: LocalizedText;
  status: LocalizedText;
  description: LocalizedText;
  role: LocalizedText;
  delivery: LocalizedText;
  stack: string;
  href: string;
  internalHref: string;
  accent: string;
  media: Array<{
    src: string;
    label: LocalizedText;
    alt: LocalizedText;
  }>;
}

export const devProofs: DevProof[] = [
  {
    id: "vaccari",
    composition: "browser",
    title: { pt: "Panificadora Vaccari", en: "Vaccari Bakery" },
    label: { pt: "Direção visual", en: "Visual direction" },
    status: {
      pt: "Case autoral · prospecção · não oficial",
      en: "Self-initiated concept · prospecting · unofficial",
    },
    description: {
      pt: "Uma experiência editorial para uma padaria tradicional, levada do conceito à publicação.",
      en: "An editorial experience for a traditional bakery, taken from concept through publishing.",
    },
    role: {
      pt: "Direção visual, UI/UX e desenvolvimento front-end",
      en: "Visual direction, UI/UX and front-end development",
    },
    delivery: {
      pt: "Site responsivo publicado e case navegável",
      en: "Published responsive website and navigable case",
    },
    stack: "Next.js · TypeScript · UI/UX",
    href: "https://vaccari-padaria.vercel.app",
    internalHref: "/projects/vaccari-padaria",
    accent: "#d9ad32",
    media: [
      {
        src: "/proofs/vaccari-home.webp",
        label: { pt: "Desktop", en: "Desktop" },
        alt: { pt: "Página inicial do case Vaccari em desktop", en: "Vaccari concept home page on desktop" },
      },
      {
        src: "/proofs/vaccari-mobile.webp",
        label: { pt: "Mobile", en: "Mobile" },
        alt: { pt: "Página inicial do case Vaccari em celular", en: "Vaccari concept home page on mobile" },
      },
    ],
  },
  {
    id: "riffmaker",
    composition: "phones",
    title: { pt: "Riff Maker", en: "Riff Maker" },
    label: { pt: "Produto mobile", en: "Mobile product" },
    status: {
      pt: "Produto autoral · publicado no Google Play",
      en: "Original product · published on Google Play",
    },
    description: {
      pt: "Um produto próprio para músicos registrarem riffs sem quebrar o fluxo criativo.",
      en: "An original product that lets musicians capture riffs without breaking their creative flow.",
    },
    role: {
      pt: "Conceito, identidade, UI, arquitetura e implementação",
      en: "Concept, identity, UI, architecture and implementation",
    },
    delivery: {
      pt: "Aplicativo Android offline-first publicado",
      en: "Published offline-first Android application",
    },
    stack: "React Native · Expo · SQLite",
    href: "https://play.google.com/store/apps/details?id=com.oluanmedrado.riffmaker",
    internalHref: "/riffmaker",
    accent: "#f03a3a",
    media: [
      {
        src: "/riff-1.jpg",
        label: { pt: "Abertura", en: "Opening" },
        alt: { pt: "Tela de abertura vermelha do Riff Maker", en: "Red Riff Maker opening screen" },
      },
      {
        src: "/riff-2.jpg",
        label: { pt: "Projetos", en: "Projects" },
        alt: { pt: "Tela de projetos do aplicativo Riff Maker", en: "Riff Maker projects screen" },
      },
      {
        src: "/riff-3.jpg",
        label: { pt: "Ideias", en: "Ideas" },
        alt: { pt: "Tela de ideias musicais do aplicativo Riff Maker", en: "Riff Maker musical ideas screen" },
      },
    ],
  },
  {
    id: "multilaser",
    composition: "ecosystem",
    title: { pt: "Ecossistema B2B Multilaser", en: "Multilaser B2B ecosystem" },
    label: { pt: "Produção corporativa", en: "Corporate production" },
    status: {
      pt: "Produtos distintos · mesmo ecossistema corporativo",
      en: "Distinct products · one corporate ecosystem",
    },
    description: {
      pt: "Portal de autosserviço para revendedores e uma plataforma interna de campanhas, apresentados como duas entregas distintas.",
      en: "A reseller self-service portal and an internal campaign platform, shown as two distinct deliveries.",
    },
    role: {
      pt: "Front-end, redesign, APIs internas e refatoração",
      en: "Front-end, redesign, internal APIs and refactoring",
    },
    delivery: {
      pt: "Portal em produção + dashboard operacional interno",
      en: "Live portal + internal operations dashboard",
    },
    stack: "React · TypeScript · APIs internas",
    href: "https://revendedor.grupomultilaser.com.br/",
    internalHref: "/projects/revendedor-multilaser",
    accent: "#438cf5",
    media: [
      {
        src: "/revendedor-prints/revendedor.png",
        label: { pt: "Portal do Revendedor", en: "Reseller Portal" },
        alt: { pt: "Página inicial do Portal do Revendedor Multilaser", en: "Multilaser Reseller Portal home page" },
      },
      {
        src: "/notify-prints/dashboard.png",
        label: { pt: "Multi Notify · produto distinto", en: "Multi Notify · distinct product" },
        alt: { pt: "Dashboard interno Multi Notify", en: "Internal Multi Notify dashboard" },
      },
    ],
  },
];

export type EditingFormat = "reel" | "gameplay" | "tutorial";

export interface GameplayProof {
  id: string;
  title: string;
  videoId: string;
  duration: string;
  poster: string;
  href: string;
}

export interface EditingProof {
  id: EditingFormat;
  label: LocalizedText;
  title: LocalizedText;
  description: LocalizedText;
  contribution: LocalizedText;
  duration: string;
  format: string;
  accent: string;
  kind: "local" | "youtube-set";
  src?: string;
  poster?: string;
  href?: string;
  related?: GameplayProof[];
}

export const editingProofs: EditingProof[] = [
  {
    id: "reel",
    label: { pt: "Reel", en: "Reel" },
    title: { pt: "Reel EN / Nanogram", en: "English Reel / Nanogram" },
    description: {
      pt: "Games, apps, tipografia cinética e composição em uma prova vertical de 30 segundos.",
      en: "Games, apps, kinetic typography and compositing in a 30-second vertical proof.",
    },
    contribution: { pt: "Edição · motion · composição", en: "Editing · motion · compositing" },
    duration: "00:30",
    format: "9:16",
    accent: "#bd6cff",
    kind: "local",
    src: "/reel-en.mp4",
    poster: "/proofs/reel-nanogram.webp",
  },
  {
    id: "gameplay",
    label: { pt: "Gameplay", en: "Gameplay" },
    title: { pt: "Novato · série de gameplays", en: "Novato · gameplay series" },
    description: {
      pt: "Quatro edições long-form com pacing, captions, facecam e inserts de reação.",
      en: "Four long-form edits shaped through pacing, captions, facecam and reaction inserts.",
    },
    contribution: {
      pt: "Edição · pacing · captions · facecam · inserts",
      en: "Editing · pacing · captions · facecam · inserts",
    },
    duration: "04 trabalhos",
    format: "16:9",
    accent: "#9d62ff",
    kind: "youtube-set",
    related: [
      {
        id: "arena",
        title: "Arena Breakout",
        videoId: "bfZd-m1OcOA",
        duration: "09:37",
        poster: "/proofs/gameplay-arena.webp",
        href: "https://youtu.be/bfZd-m1OcOA",
      },
      {
        id: "throne",
        title: "Throne and Liberty",
        videoId: "w13sG3Yy2hc",
        duration: "11:03",
        poster: "/proofs/gameplay-throne.webp",
        href: "https://youtu.be/w13sG3Yy2hc",
      },
      {
        id: "pokemon",
        title: "Pokémon Unite",
        videoId: "w-FmaATD5vs",
        duration: "07:18",
        poster: "/proofs/gameplay-pokemon.webp",
        href: "https://youtu.be/w-FmaATD5vs",
      },
      {
        id: "dungeonborne",
        title: "Dungeonborne",
        videoId: "Xsf0aGGZAOw",
        duration: "07:20",
        poster: "/proofs/gameplay-dungeonborne.webp",
        href: "https://youtu.be/Xsf0aGGZAOw",
      },
    ],
  },
  {
    id: "tutorial",
    label: { pt: "Tutorial", en: "Tutorial" },
    title: { pt: "E-Multitech", en: "E-Multitech" },
    description: {
      pt: "Uma funcionalidade de interface transformada em apresentação corporativa curta e clara.",
      en: "An interface feature turned into a short, clear corporate product presentation.",
    },
    contribution: {
      pt: "Edição · motion de UI · narração · After Effects",
      en: "Editing · UI motion · narration · After Effects",
    },
    duration: "01:02",
    format: "16:9",
    accent: "#6f73ff",
    kind: "local",
    src: "/Multilaser.mp4",
    poster: "/proofs/emultitech.webp",
    href: "https://www.behance.net/gallery/243412563/Apresentacao-E-Multitech",
  },
];
