import type { Metadata } from "next";
import EditingPortfolio from "../../components/EditingPortfolio";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://oluanmedrado.com";

export const metadata: Metadata = {
    title: "Luan Medrado | Video Editor and Audiovisual Producer",
    description: "Luan Medrado's Portfolio. Video editing, audiovisual production, motion and content for YouTube, brands and digital projects.",
    alternates: {
        canonical: `${BASE_URL}/en/editing`,
        languages: {
            "pt-BR": `${BASE_URL}/editing`,
            "en-US": `${BASE_URL}/en/editing`,
        },
    },
    openGraph: {
        type: "website",
        locale: "en_US",
        url: `${BASE_URL}/en/editing`,
        siteName: "Luan Medrado",
        title: "Luan Medrado | Video Editor and Audiovisual Producer",
        description: "Luan Medrado's Portfolio. Video editing, audiovisual production, motion and content for YouTube, brands and digital projects.",
        images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Luan Medrado" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Luan Medrado | Video Editor and Audiovisual Producer",
        description: "Luan Medrado's Portfolio. Video editing, audiovisual production, motion and content for YouTube, brands and digital projects.",
    },
};

export default function EnglishEditingPage() {
    return <EditingPortfolio />;
}
