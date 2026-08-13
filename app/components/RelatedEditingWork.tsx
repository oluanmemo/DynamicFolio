"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { trackEvent } from "../lib/analytics";
import styles from "./RelatedEditingWork.module.css";

const work = [
  {
    id: "throne",
    title: "Novato — Throne and Liberty",
    format: "Gameplay · 11:03",
    role: { pt: "Edição, facecam e captions", en: "Editing, facecam and captions" },
    href: "https://youtu.be/w13sG3Yy2hc",
  },
  {
    id: "pokemon",
    title: "Novato — Pokémon Unite",
    format: "Gameplay · 07:18",
    role: { pt: "Edição, captions e variações de facecam", en: "Editing, captions and facecam variations" },
    href: "https://youtu.be/w-FmaATD5vs",
  },
  {
    id: "dungeonborne",
    title: "Novato — Dungeonborne",
    format: "Gameplay · 07:20",
    role: { pt: "Edição, facecam e captions", en: "Editing, facecam and captions" },
    href: "https://youtu.be/Xsf0aGGZAOw",
  },
  {
    id: "guitarra",
    title: "Aulas de Guitarra",
    format: "Conteúdo educacional",
    role: { pt: "Edição e sincronização de tablatura", en: "Editing and synchronized tablature" },
    href: "https://www.behance.net/gallery/245289239/Aulas-de-Guitarra",
  },
  {
    id: "laercio",
    title: "Laércio Refundini",
    format: "Talking head",
    role: { pt: "Cortes, enquadramento e ritmo", en: "Cuts, framing and pacing" },
    href: "https://www.behance.net/gallery/208794979/Testes",
  },
  {
    id: "multitech-related",
    title: "Portal de Chamados + Multi Boletos",
    format: "Tutoriais de produto",
    role: { pt: "Edição, motion e narração", en: "Editing, motion and narration" },
    href: "https://www.behance.net/gallery/243412563/Apresentacao-E-Multitech",
  },
] as const;

export default function RelatedEditingWork() {
  const { lang } = useLanguage();

  return (
    <section className={styles.section} aria-labelledby="related-editing-title">
      <div className={styles.heading}>
        <span>{lang === "en" ? "Related work" : "Trabalhos relacionados"}</span>
        <h2 id="related-editing-title">{lang === "en" ? "More formats, without diluting the selection." : "Mais formatos, sem diluir a seleção."}</h2>
      </div>
      <div className={styles.list}>
        {work.map((item, index) => (
          <Link
            key={item.id}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent("project_click", { project: item.id, category: "editing_related", lang })}
          >
            <span className={styles.index}>{String(index + 1).padStart(2, "0")}</span>
            <span className={styles.title}>{item.title}</span>
            <span className={styles.meta}>{item.format}<b>·</b>{item.role[lang]}</span>
            <ArrowUpRight size={17} />
          </Link>
        ))}
      </div>
    </section>
  );
}
