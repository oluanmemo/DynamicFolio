"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "../context/LanguageContext";
import { trackEvent } from "../lib/analytics";
import styles from "./RelatedEditingWork.module.css";
import { useState } from "react";

const BLUR_PLACEHOLDER = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxIiBoZWlnaHQ9IjEiPjxyZWN0IGZpbGw9IiMxYTFhMWEiLz48L3N2Zz4=";

const SWITCH_GAME_LIST_VIDEO_URL = "https://youtu.be/hHqW-W3-LPE";

const work = [
  {
    id: "switchgame",
    title: "Switch Game List - Top 10",
    meta: { pt: "LONG-FORM · INTERNACIONAL · B-ROLL · SOUND DESIGN", en: "LONG-FORM · INTERNATIONAL · B-ROLL · SOUND DESIGN" },
    href: SWITCH_GAME_LIST_VIDEO_URL,
    thumb: "/Switch Game List.jpg",
  },
  {
    id: "emultitech",
    title: "E-Multitech - Apresentação",
    meta: { pt: "CORPORATIVO · MOTION · UI DEMO · NARRAÇÃO", en: "CORPORATE · MOTION · UI DEMO · NARRATION" },
    href: "https://www.behance.net/gallery/243412563/Apresentacao-E-Multitech",
    thumb: "/emultitech.webp",
  },
  {
    id: "laercio",
    title: "Laércio Refundini",
    meta: { pt: "TALKING HEAD · ROTOSCOPIA · RITMO · B-ROLL", en: "TALKING HEAD · ROTOSCOPING · PACING · B-ROLL" },
    href: "https://www.behance.net/gallery/208794979/Testes",
    thumb: "/testes.webp",
  },
  {
    id: "throne",
    title: "Novato - Throne and Liberty",
    meta: { pt: "GAMEPLAY · FACECAM · MEMES · CAPTIONS", en: "GAMEPLAY · FACECAM · MEMES · CAPTIONS" },
    href: "https://youtu.be/w13sG3Yy2hc",
    thumb: "/novato.webp",
  },
  {
    id: "guitarra",
    title: "Aulas de Guitarra",
    meta: { pt: "EDUCACIONAL · ÁUDIO · SINCRONIZAÇÃO DE TABLATURA", en: "EDUCATIONAL · AUDIO · TABLATURE SYNC" },
    href: "https://www.behance.net/gallery/245289239/Aulas-de-Guitarra",
    thumb: "/guitarragospel.jpg",
  },
] as const;

export default function RelatedEditingWork() {
  const { lang } = useLanguage();
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section className={styles.section} aria-labelledby="related-editing-title">
      <div className={styles.heading}>
        <span>{lang === "en" ? "Selected edits" : "Edições selecionadas"}</span>
        <h2 id="related-editing-title">{lang === "en" ? "Watch my work." : "Assista ao meu trabalho."}</h2>
      </div>
      <div className={styles.list}>
        {work.map((item, index) => (
          <Link
            key={item.id}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.row}
            onMouseEnter={() => setHoveredId(item.id)}
            onMouseLeave={() => setHoveredId(null)}
            onClick={() => trackEvent("project_click", { project: item.id, category: "editing_related", lang })}
          >
            <div className={styles.rowContent}>
              <span className={styles.index}>{String(index + 1).padStart(2, "0")}</span>
              <div className={styles.textStack}>
                <span className={styles.title}>{item.title}</span>
                <span className={styles.meta}>{item.meta[lang]}</span>
              </div>
            </div>
            
            <div className={styles.rowRight}>
              <div className={`${styles.previewWrapper} ${hoveredId === item.id ? styles.previewVisible : ""}`}>
                <div className={styles.previewImage}>
                  <Image 
                    src={item.thumb}
                    alt={item.title}
                    fill
                    sizes="200px"
                    style={{ objectFit: 'cover' }}
                    placeholder="blur"
                    blurDataURL={BLUR_PLACEHOLDER}
                  />
                  <div className={styles.playOverlay}>
                    <svg viewBox="0 0 24 24" fill="currentColor" stroke="none">
                      <polygon points="5 3 19 12 5 21 5 3"></polygon>
                    </svg>
                  </div>
                </div>
              </div>
              <div className={styles.ctaGroup}>
                <span className={styles.ctaText}>{lang === "en" ? "Watch" : "Assistir"}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
