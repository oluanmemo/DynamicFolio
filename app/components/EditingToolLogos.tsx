import Image from "next/image";

export const PremiereLogo = () => (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
        <rect width="18" height="18" rx="3" fill="#0D0B1E"/>
        <text x="2" y="13.5" fontFamily="system-ui,sans-serif" fontWeight="800" fontSize="9.5" fill="#9999FF">Pr</text>
    </svg>
);

export const AfterEffectsLogo = () => (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
        <rect width="18" height="18" rx="3" fill="#00005B"/>
        <text x="1.8" y="13.5" fontFamily="system-ui,sans-serif" fontWeight="800" fontSize="9.5" fill="#9999FF">Ae</text>
    </svg>
);

export const DaVinciLogo = () => (
    /* 3 teardrops em triângulo + anel arco-íris, logo real do DaVinci Resolve */
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
        <defs>
            <linearGradient id="dvRing" x1="0" y1="1" x2="1" y2="0">
                <stop offset="0%"   stopColor="#FF3030"/>
                <stop offset="18%"  stopColor="#FF9900"/>
                <stop offset="36%"  stopColor="#EEFF00"/>
                <stop offset="54%"  stopColor="#00FF88"/>
                <stop offset="72%"  stopColor="#0088FF"/>
                <stop offset="88%"  stopColor="#7744FF"/>
                <stop offset="100%" stopColor="#FF3088"/>
            </linearGradient>
        </defs>
        {/* Fundo círculo escuro */}
        <circle cx="9" cy="9" r="9" fill="#252E3A"/>
        {/* Anel arco-íris */}
        <circle cx="9" cy="9" r="7.8" fill="none" stroke="url(#dvRing)" strokeWidth="2"/>
        {/* Teardrop topo, cyan (tip aponta para centro) */}
        <path d="M9,8 C10.5,7.5 11.5,6 11.5,4 A2.5,2.5 0 0,0 6.5,4 C6.5,6 7.5,7.5 9,8 Z" fill="#4DC8E8"/>
        {/* Teardrop inferior-direito, rosa (120° CW) */}
        <path d="M9,8 C10.5,7.5 11.5,6 11.5,4 A2.5,2.5 0 0,0 6.5,4 C6.5,6 7.5,7.5 9,8 Z" fill="#E86070" transform="rotate(120,9,9)"/>
        {/* Teardrop inferior-esquerdo, verde-limão (240° CW) */}
        <path d="M9,8 C10.5,7.5 11.5,6 11.5,4 A2.5,2.5 0 0,0 6.5,4 C6.5,6 7.5,7.5 9,8 Z" fill="#A8CC20" transform="rotate(240,9,9)"/>
    </svg>
);

export const ElevenLabsLogo = () => (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
        <rect width="18" height="18" rx="3" fill="#111111"/>
        <rect x="4" y="4" width="3" height="10" rx="1.5" fill="white"/>
        <rect x="11" y="4" width="3" height="10" rx="1.5" fill="white"/>
    </svg>
);

export const PhotoshopLogo = () => (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
        <rect width="18" height="18" rx="3" fill="#001E36"/>
        <text x="2" y="13.5" fontFamily="system-ui,sans-serif" fontWeight="800" fontSize="9.5" fill="#31A8FF">Ps</text>
    </svg>
);

export const CapCutLogo = () => (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
        <rect width="18" height="18" rx="4" fill="#000000"/>
        <path d="M4 9 L9 4 L14 9 L9 14 Z" fill="none" stroke="#FFF" strokeWidth="2.2" strokeLinejoin="round"/>
        <path d="M7 9 L9 7 L11 9 L9 11 Z" fill="#FFF"/>
    </svg>
);


// OpenAI mark from Simple Icons v15, sourced from https://openai.com/brand/.
export const GPTLogo = () => <Image src="/icons/openai.svg" alt="" aria-hidden="true" width={18} height={18} style={{filter: "invert(1)"}} />;
