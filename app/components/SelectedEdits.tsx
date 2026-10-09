"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useRef, useState } from "react";
import { ArrowUpRight, Play, X } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { selectedEdits, type SelectedEdit } from "../lib/selectedEdits";
import { trackEvent } from "../lib/analytics";
import styles from "./SelectedEdits.module.css";
import SelectedLocalPlayer from "./SelectedLocalPlayer";

const SelectedEditPlayer = dynamic(() => import("./SelectedEditPlayer"), {
  ssr: false,
  loading: () => <div className={styles.playerStatus} role="status"><span className={styles.loader} aria-hidden="true" /></div>,
});

function Edit({ project, index, active, onSelect }: {
  project: SelectedEdit;
  index: number;
  active: boolean;
  onSelect: (id: string | null) => void;
}) {
  const { lang } = useLanguage();
  const playButton = useRef<HTMLButtonElement>(null);
  const [thumbnailFailed, setThumbnailFailed] = useState(false);
  const title = project.title[lang];
  const close = () => {
    onSelect(null);
    requestAnimationFrame(() => playButton.current?.focus({ preventScroll: true }));
  };

  return (
    <article className={project.featured ? styles.featured : styles.edit} aria-labelledby={`edit-${project.id}`} onKeyDown={event => { if (active && event.key === "Escape") close(); }}>
      <div className={`${styles.media} ${project.status === "pending" || project.format === "horizontal" ? styles.horizontal : styles.vertical}`}>
        {project.status === "pending" ? (
          <div className={styles.pending}>
            <span className={styles.pendingLabel}>{lang === "pt" ? "Teste de edição" : "Editing test"}</span>
            <span className={styles.pendingTitle}>{title.split(" — ")[0]}</span>
            <span className={styles.pendingStatus}>{lang === "pt" ? "Vídeo em preparação" : "Video coming soon"}</span>
          </div>
        ) : active ? (
          <>
            {project.provider === "youtube" ? (
              <SelectedEditPlayer videoId={project.videoId} title={title} lang={lang} />
            ) : (
              <SelectedLocalPlayer src={project.src} title={title} lang={lang} />
            )}
            <button type="button" className={styles.close} onClick={close} aria-label={lang === "pt" ? `Fechar vídeo: ${title}` : `Close video: ${title}`}>
              <X size={18} aria-hidden="true" />
            </button>
          </>
        ) : (
          <button
            ref={playButton}
            type="button"
            className={styles.posterButton}
            aria-label={`${lang === "pt" ? "Assistir" : "Watch"}: ${title}`}
            onClick={() => {
              onSelect(project.id);
              trackEvent("selected_edit_play", { project: project.id, lang, category: "editor" });
            }}
          >
            {!thumbnailFailed ? (
              <Image src={project.thumbnail} alt="" fill unoptimized={project.provider === "youtube"} loading="lazy" sizes={project.featured ? "(max-width: 1100px) 90vw, 625px" : "(max-width: 600px) 320px, (max-width: 1100px) 300px, 240px"} className={styles.poster} onError={() => setThumbnailFailed(true)} />
            ) : (
              <span className={styles.missingPoster}>{lang === "pt" ? "Prévia indisponível" : "Preview unavailable"}</span>
            )}
            <span className={styles.play} aria-hidden="true"><Play size={22} fill="currentColor" /></span>
            <span className={styles.watchLabel}>{lang === "pt" ? "Assistir" : "Watch"}</span>
          </button>
        )}
      </div>

      <div className={styles.caption}>
        <span className={styles.index} aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
        <div>
          <p className={styles.category}>{project.category[lang]}</p>
          <h3 id={`edit-${project.id}`}>{title}</h3>
          <p className={styles.description}>{project.description[lang]}</p>
          {project.status === "available" ? (
            <a href={project.originalUrl} target="_blank" rel="noopener noreferrer" className={styles.external} aria-label={`${project.provider === "youtube" ? (lang === "pt" ? "Abrir no YouTube" : "Open on YouTube") : (lang === "pt" ? "Abrir vídeo" : "Open video")}: ${title}`}>
              {project.provider === "youtube" ? (lang === "pt" ? "Abrir no YouTube" : "Open on YouTube") : (lang === "pt" ? "Abrir vídeo" : "Open video")}<ArrowUpRight size={15} aria-hidden="true" />
            </a>
          ) : (
            <p className={styles.pendingNote}>{lang === "pt" ? "Em breve nesta seleção." : "Coming soon to this selection."}</p>
          )}
        </div>
      </div>
    </article>
  );
}

export default function SelectedEdits() {
  const { lang } = useLanguage();
  const [activeId, setActiveId] = useState<string | null>(null);
  return (
    <section id="trabalhos" className={styles.section} aria-labelledby="selected-edits-title">
      <div className={styles.container}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>04 / {lang === "pt" ? "Edições selecionadas" : "Selected edits"}</p>
          <h2 id="selected-edits-title">{lang === "pt" ? "Edição em diferentes formatos." : "Editing across formats."}</h2>
          <p>{lang === "pt" ? "Games, eventos e conteúdo autoral. Diferentes linguagens, uma seleção para dar play." : "Games, events and independent content. Different styles, a selection to press play."}</p>
        </header>
        <div className={styles.layout}>
          {selectedEdits.filter(project => project.featured).map(project => <Edit key={project.id} project={project} index={selectedEdits.indexOf(project)} active={activeId === project.id} onSelect={setActiveId} />)}
          <div className={styles.shorts}>
            {selectedEdits.filter(project => !project.featured).map(project => <Edit key={project.id} project={project} index={selectedEdits.indexOf(project)} active={activeId === project.id} onSelect={setActiveId} />)}
          </div>
        </div>
      </div>
    </section>
  );
}
