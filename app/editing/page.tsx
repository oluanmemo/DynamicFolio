import type { Metadata } from "next";
import EditingPortfolio from "../components/EditingPortfolio";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://oluanmedrado.com";

export const metadata: Metadata = {
    title: "Luan Medrado | Editor de Vídeo e Produtor Audiovisual",
    description: "Portfólio de Luan Medrado. Edição de vídeo, produção audiovisual, motion e conteúdo para YouTube, marcas e projetos digitais.",
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
        title: "Luan Medrado | Editor de Vídeo e Produtor Audiovisual",
        description: "Portfólio de Luan Medrado. Edição de vídeo, produção audiovisual, motion e conteúdo para YouTube, marcas e projetos digitais.",
        images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Luan Medrado" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Luan Medrado | Editor de Vídeo e Produtor Audiovisual",
        description: "Portfólio de Luan Medrado. Edição de vídeo, produção audiovisual, motion e conteúdo para YouTube, marcas e projetos digitais.",
    },
};

export default function EditingPage() {
    return <EditingPortfolio />;
}
