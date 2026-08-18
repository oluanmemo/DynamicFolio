import type { Metadata } from "next";
import PortfolioPage from "../components/PortfolioPage";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://oluanmedrado.com";

export const metadata: Metadata = {
    title: "Edição de Vídeo para YouTube e Reels",
    description: "Transformo material bruto em vídeos com ritmo, clareza e acabamento.",
    alternates: {
        canonical: `${BASE_URL}/editing`,
        languages: {
            "pt-BR": `${BASE_URL}/editing`,
            "en-US": `${BASE_URL}/en/editing`,
        },
    },
    openGraph: {
        type: "website",
        locale: "pt_BR",
        url: `${BASE_URL}/editing`,
        siteName: "Luan Medrado",
        title: "Edição de Vídeo para YouTube e Reels",
        description: "Transformo material bruto em vídeos com ritmo, clareza e acabamento.",
        images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Luan Medrado" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Edição de Vídeo para YouTube e Reels",
        description: "Transformo material bruto em vídeos com ritmo, clareza e acabamento.",
    },
};

export default function EditingPage() {
    return <PortfolioPage />;
}
