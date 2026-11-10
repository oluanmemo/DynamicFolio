"use client";

import { useLanguage } from "../context/LanguageContext";
import { useMode } from "../context/ModeContext";
import { PremiereLogo, AfterEffectsLogo, DaVinciLogo, PhotoshopLogo, CapCutLogo, ElevenLabsLogo } from "./EditingToolLogos";
import styles from "./Sobre.module.css";

/* ── Brand logos as inline SVGs ───────────────────────────── */
const ReactLogo = () => (
    <svg width="18" height="18" viewBox="0 0 100 100" aria-hidden="true">
        <ellipse cx="50" cy="50" rx="46" ry="18" stroke="#61DAFB" strokeWidth="6" fill="none"/>
        <ellipse cx="50" cy="50" rx="46" ry="18" stroke="#61DAFB" strokeWidth="6" fill="none" transform="rotate(60 50 50)"/>
        <ellipse cx="50" cy="50" rx="46" ry="18" stroke="#61DAFB" strokeWidth="6" fill="none" transform="rotate(120 50 50)"/>
        <circle cx="50" cy="50" r="8" fill="#61DAFB"/>
    </svg>
);

const TypeScriptLogo = () => (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
        <rect width="18" height="18" rx="2" fill="#3178C6"/>
        <text x="2.2" y="13.8" fontFamily="system-ui,sans-serif" fontWeight="800" fontSize="9" fill="white">TS</text>
    </svg>
);

const TailwindLogo = () => (
    <svg width="18" height="18" viewBox="0 0 54 33" aria-hidden="true" fill="#38BDF8">
        <path fillRule="evenodd" clipRule="evenodd" d="M27 0C19.8 0 15.3 3.6 13.5 10.8C16.2 7.2 19.35 5.85 22.95 6.75C25.004 7.264 26.472 8.753 28.097 10.403C30.744 13.09 33.808 16.2 40.5 16.2C47.7 16.2 52.2 12.6 54 5.4C51.3 9 48.15 10.35 44.55 9.45C42.496 8.936 41.028 7.447 39.403 5.797C36.756 3.11 33.692 0 27 0ZM13.5 16.2C6.3 16.2 1.8 19.8 0 27C2.7 23.4 5.85 22.05 9.45 22.95C11.504 23.464 12.972 24.953 14.597 26.603C17.244 29.29 20.308 32.4 27 32.4C34.2 32.4 38.7 28.8 40.5 21.6C37.8 25.2 34.65 26.55 31.05 25.65C28.996 25.136 27.528 23.647 25.903 21.997C23.256 19.31 20.192 16.2 13.5 16.2Z"/>
    </svg>
);

const FigmaLogo = () => (
    <svg width="18" height="18" viewBox="0 0 38 57" aria-hidden="true">
        <path d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" fill="#1ABCFE"/>
        <path d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0z" fill="#0ACF83"/>
        <path d="M19 0v19h9.5a9.5 9.5 0 0 0 0-19H19z" fill="#FF7262"/>
        <path d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" fill="#F24E1E"/>
        <path d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" fill="#A259FF"/>
    </svg>
);

const NodeLogo = () => (
    <svg width="18" height="18" viewBox="0 0 100 115" aria-hidden="true">
        <path d="M50 4L96 30v55L50 111L4 85V30L50 4z" fill="#5FA04E"/>
        <text x="50" y="74" fontFamily="system-ui,sans-serif" fontWeight="900" fontSize="54" fill="white" textAnchor="middle">N</text>
    </svg>
);

const devSkills = [
    { icon: <ReactLogo />, name: "React / Next.js" },
    { icon: <TypeScriptLogo />, name: "TypeScript" },
    { icon: <TailwindLogo />, name: "CSS / Tailwind" },
    { icon: <FigmaLogo />, name: "Figma / UI Design" },
    { icon: <NodeLogo />, name: "Node.js / APIs" },
    { icon: <ReactLogo />, name: "React Native" },
];

const devProof = {
    pt: ["Remoto desde o início", "Entregas em etapas claras", "Fuso UTC-3 (Brasil)", "Clientes no Brasil e exterior"],
    en: ["Remote-first workflow", "Staged delivery", "UTC-3 (Brazil)", "Clients in Brazil and abroad"],
};

const modeContent = {
    pt: {
        aboutLabel: "Sobre mim",
        dev: {
            title: (<>Front-end com visão de produto e acabamento de marca</>),
            text: (
                <>
                    Construo interfaces para negócios digitais que precisam parecer sólidos desde o primeiro contato.
                    <br />
                    Trabalho com React, Next.js, TypeScript, React Native e UI/UX, conectando visual, código e decisões de produto.
                </>
            ),
            skills: devSkills,
            stackGroups: [
                ["Front-end", "React, Next.js, TypeScript, CSS/Tailwind"],
                ["Mobile", "React Native, Expo, SQLite, publicação Android"],
                ["Produto/UI", "Figma, UI/UX, design system, responsividade"],
                ["Integrações", "APIs, Node.js, analytics, deploy"],
            ],
        },
        editor: {
            title: (<>O que eu <strong>faço</strong></>),
            text: (
                <>Edição, motion, conteúdo e design - do material bruto à entrega final.</>
            ),
            skills: [],
            stackGroups: [
                ["EDIÇÃO", "Long-form · Short-form · montagem · ritmo · storytelling"],
                ["MOTION", "Motion graphics · rotoscopia · composição"],
                ["CONTEÚDO", "Pesquisa · roteiro · YouTube · retenção · formatos"],
                ["DESIGN", "Thumbnails · identidade visual · peças digitais"],
            ],
        },
    },
    en: {
        aboutLabel: "About me",
        dev: {
            title: (<>Frontend with product sense and polished delivery</>),
            text: (
                <>
                    I build for remote teams that need evidence, not buzzwords: shipped products, production systems and clear product decisions.
                    <br />
                    My stack is React, Next.js, TypeScript and React Native, with enough design and product ownership to move from scope to shipped work.
                </>
            ),
            skills: devSkills,
            stackGroups: [
                ["Front-end", "React, Next.js, TypeScript, CSS/Tailwind"],
                ["Mobile", "React Native, Expo, SQLite, Android publishing"],
                ["Product/UI", "Figma, UI/UX, design system, responsive layout"],
                ["Integrations", "APIs, Node.js, analytics, deploy"],
            ],
        },
        editor: {
            title: (<>What I <strong>do</strong></>),
            text: (
                <>Editing, motion, content and design - from raw material to final delivery.</>
            ),
            skills: [],
            stackGroups: [
                ["EDITING", "Long-form · Short-form · cuts · pacing · storytelling"],
                ["MOTION", "Motion graphics · rotoscoping · composition"],
                ["CONTENT", "Research · scripting · YouTube · retention · formats"],
                ["DESIGN", "Thumbnails · visual identity · digital assets"],
            ],
        },
    },
};

export default function Sobre() {
    const { mode } = useMode();
    const { lang } = useLanguage();
    const c = modeContent[lang][mode];

    if (mode === "editor") {
        const tools = [
            { name: "Premiere Pro", icon: <PremiereLogo /> },
            { name: "After Effects", icon: <AfterEffectsLogo /> },
            { name: "DaVinci Resolve", icon: <DaVinciLogo /> },
            { name: "Photoshop", icon: <PhotoshopLogo /> },
            { name: "CapCut", icon: <CapCutLogo /> },
            { name: "ElevenLabs", icon: <ElevenLabsLogo /> },
        ];

        return (
            <section id="sobre" className={styles.editorAbout} aria-labelledby="editing-about-title">
                <header data-editing-reveal className={styles.intro}>
                    <p className={styles.eyebrow}>{modeContent[lang].aboutLabel}</p>
                    <h2 id="editing-about-title">{c.title}</h2>
                    <p className={styles.description}>{c.text}</p>
                </header>
                <div data-editing-reveal className={styles.competencies}>
                    <p className={styles.eyebrow}>{lang === "pt" ? "Competências" : "Skills"}</p>
                    <div className={styles.disciplines}>
                        {c.stackGroups.map(([label, value]) => (
                            <div className={styles.discipline} key={label}>
                                <h3>{label}</h3>
                                <p>{value.replaceAll(" · ", ", ")}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div data-editing-reveal className={styles.tools}>
                    <p className={styles.eyebrow}>{lang === "pt" ? "Ferramentas" : "Tools"}</p>
                    <ul className={styles.toolList}>
                        {tools.map(tool => <li key={tool.name}>{tool.icon}<span>{tool.name}</span></li>)}
                    </ul>
                </div>
            </section>
        );
    }

    return (
        <section className="about" id="sobre">
            <div className="about-left">
                <p className="about-label">{modeContent[lang].aboutLabel}</p>
                <h2 key={`title-${mode}`} className="about-title mode-fade">{c.title}</h2>
                <p key={`text-${mode}`} className="about-text mode-fade">{c.text}</p>
                {mode === "dev" && (
                    <div className="about-proof-strip" aria-label={lang === "en" ? "Remote collaboration proof" : "Provas de colaboração remota"}>
                        {devProof[lang].map((item) => (
                            <span key={item}>{item}</span>
                        ))}
                    </div>
                )}

            </div>
            <div className="about-right" id="skills">
                <div className="skills-grid" id="skillsGrid">
                    {c.skills.map((skill, i) => (
                        <div key={i} className="skill-pill">
                            <span className="skill-pill-icon">{skill.icon}</span>
                            <span className="skill-pill-name">{skill.name}</span>
                        </div>
                    ))}
                </div>
                <div className="editor-competencias-group">
                    <div className="stack-groups" aria-label={lang === "en" ? "Organized stack" : "Stack organizada"}>
                        {c.stackGroups.map(([label, value]) => (
                            <div className="stack-group" key={label}>
                                <strong>{label}</strong>
                                <span>{value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
