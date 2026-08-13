"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Maximize2, Play, VolumeX } from "lucide-react";
import { useState } from "react";
import type { CSSProperties } from "react";
import { trackEvent } from "../lib/analytics";
import { editingProofs } from "../lib/homeProofs";
import type { EditingFormat, EditingProof, GameplayProof, Language } from "../lib/homeProofs";
import styles from "./EditingShowcase.module.css";

interface EditingShowcaseProps {
  lang: Language;
}

interface PosterPlayerProps {
  playerKey: string;
  title: string;
  duration: string;
  poster: string;
  accent: string;
  kind: "local" | "youtube";
  src: string;
  playingKey: string | null;
  onPlay: (key: string, provider: "local" | "youtube") => void;
  lang: Language;
  portrait?: boolean;
}

function PosterPlayer({ playerKey, title, duration, poster, accent, kind, src, playingKey, onPlay, lang, portrait = false }: PosterPlayerProps) {
  const isPlaying = playingKey === playerKey;

  if (isPlaying) {
    if (kind === "youtube") {
      return (
        <iframe
          className={styles.playerMedia}
          src={`https://www.youtube-nocookie.com/embed/${src}?autoplay=1&mute=1&rel=0&modestbranding=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      );
    }

    return (
      <video
        className={`${styles.playerMedia} ${portrait ? styles.portraitVideo : ""}`}
        controls
        playsInline
        muted
        autoPlay
        preload="metadata"
        poster={poster}
        aria-label={`${lang === "pt" ? "Reproduzindo" : "Playing"} ${title}`}
      >
        <source src={src} type="video/mp4" />
      </video>
    );
  }

  return (
    <button
      type="button"
      className={styles.poster}
      style={{ "--player-accent": accent } as CSSProperties}
      onClick={() => onPlay(playerKey, kind)}
      aria-label={`${lang === "pt" ? "Reproduzir" : "Play"} ${title}`}
    >
      <Image src={poster} alt="" fill sizes={portrait ? "(min-width: 900px) 28vw, 78vw" : "(min-width: 900px) 60vw, 100vw"} className={`${styles.posterImage} ${portrait ? styles.portraitPoster : ""}`} />
      <span className={styles.posterShade} />
      <span className={styles.playControl} aria-hidden="true"><Play size={28} fill="currentColor" /></span>
      <span className={styles.playLabel}>{lang === "pt" ? "Reproduzir" : "Play"}</span>
      <span className={styles.playerDuration}>{duration}</span>
      <span className={styles.controlPreview} aria-hidden="true">
        <i><b /></i>
        <VolumeX size={15} />
        <Maximize2 size={15} />
      </span>
    </button>
  );
}

function ProofDetails({ proof, lang }: { proof: EditingProof; lang: Language }) {
  return (
    <div className={styles.details}>
      <div className={styles.detailHeading}>
        <span>{proof.label[lang]} · {proof.duration} · {proof.format}</span>
        <h3>{proof.title[lang]}</h3>
      </div>
      <p>{proof.description[lang]}</p>
      <dl>
        <div><dt>{lang === "pt" ? "Minha participação" : "My contribution"}</dt><dd>{proof.contribution[lang]}</dd></div>
      </dl>
      {proof.href ? (
        <Link href={proof.href} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent("proof_link_click", { lane: "editing", proof: proof.id, destination: "external", lang })}>
          {lang === "pt" ? "Ver projeto completo" : "View full project"}<ArrowUpRight size={16} />
        </Link>
      ) : null}
    </div>
  );
}

function GameplayThumb({ gameplay, selected, lang, onSelect }: { gameplay: GameplayProof; selected: boolean; lang: Language; onSelect: () => void }) {
  return (
    <button type="button" className={selected ? styles.gameThumbActive : ""} aria-pressed={selected} onClick={onSelect}>
      <span className={styles.gameThumbImage}><Image src={gameplay.poster} alt="" fill sizes="(min-width: 900px) 13vw, 38vw" /></span>
      <span className={styles.gameThumbCopy}><strong>{gameplay.title}</strong><small>{gameplay.duration}</small></span>
      <Play size={14} fill="currentColor" aria-hidden="true" />
      <span className={styles.srOnly}>{lang === "pt" ? "Selecionar gameplay" : "Select gameplay"}</span>
    </button>
  );
}

export default function EditingShowcase({ lang }: EditingShowcaseProps) {
  const [activeId, setActiveId] = useState<EditingFormat>("reel");
  const [gameplayId, setGameplayId] = useState("arena");
  const [playingKey, setPlayingKey] = useState<string | null>(null);
  const active = editingProofs.find((proof) => proof.id === activeId) ?? editingProofs[0];
  const gameplayProof = editingProofs.find((proof) => proof.id === "gameplay");
  const gameplays = gameplayProof?.related ?? [];
  const activeGameplay = gameplays.find((item) => item.id === gameplayId) ?? gameplays[0];

  const selectProof = (proof: EditingProof) => {
    setPlayingKey(null);
    setActiveId(proof.id);
    trackEvent("proof_select", { lane: "editing", proof: proof.id, lang });
  };

  const selectGameplay = (gameplay: GameplayProof) => {
    setPlayingKey(null);
    setGameplayId(gameplay.id);
    trackEvent("proof_select", { lane: "editing", proof: `gameplay-${gameplay.id}`, lang });
  };

  const play = (key: string, provider: "local" | "youtube") => {
    setPlayingKey(key);
    trackEvent("proof_media_play", { lane: "editing", proof: key, provider, lang });
  };

  const renderPanel = () => {
    if (active.id === "reel") {
      return (
        <div className={`${styles.formatPanel} ${styles.reelPanel}`}>
          <ProofDetails proof={active} lang={lang} />
          <div className={`${styles.playerShell} ${styles.reelPlayer}`}>
            <PosterPlayer playerKey="reel" title={active.title[lang]} duration={active.duration} poster={active.poster!} accent={active.accent} kind="local" src={active.src!} playingKey={playingKey} onPlay={play} lang={lang} portrait />
          </div>
        </div>
      );
    }

    if (active.id === "gameplay" && activeGameplay) {
      return (
        <div className={`${styles.formatPanel} ${styles.gameplayPanel}`}>
          <div className={styles.gameplayMain}>
            <div className={styles.playerShell}>
              <PosterPlayer playerKey={`gameplay-${activeGameplay.id}`} title={activeGameplay.title} duration={activeGameplay.duration} poster={activeGameplay.poster} accent={active.accent} kind="youtube" src={activeGameplay.videoId} playingKey={playingKey} onPlay={play} lang={lang} />
            </div>
            <div className={styles.gameTitleRow}><strong>{activeGameplay.title}</strong><span>{activeGameplay.duration} · 16:9</span></div>
          </div>
          <div className={styles.gameplayThumbs} aria-label={lang === "pt" ? "Selecionar gameplay" : "Select gameplay"}>
            {gameplays.map((gameplay) => <GameplayThumb key={gameplay.id} gameplay={gameplay} selected={gameplay.id === activeGameplay.id} lang={lang} onSelect={() => selectGameplay(gameplay)} />)}
          </div>
          <ProofDetails proof={active} lang={lang} />
        </div>
      );
    }

    return (
      <div className={`${styles.formatPanel} ${styles.tutorialPanel}`}>
        <div className={styles.playerShell}>
          <PosterPlayer playerKey="tutorial" title={active.title[lang]} duration={active.duration} poster={active.poster!} accent={active.accent} kind="local" src={active.src!} playingKey={playingKey} onPlay={play} lang={lang} />
        </div>
        <ProofDetails proof={active} lang={lang} />
      </div>
    );
  };

  return (
    <div className={styles.showcase} style={{ "--editing-proof": active.accent } as CSSProperties}>
      <div className={styles.selector} role="tablist" aria-label={lang === "pt" ? "Formatos de edição" : "Editing formats"}>
        {editingProofs.map((proof) => (
          <button key={proof.id} type="button" role="tab" aria-selected={proof.id === active.id} aria-controls="editing-proof-panel" className={proof.id === active.id ? styles.selectorActive : ""} onClick={() => selectProof(proof)}>
            <span>{proof.label[lang]}</span>
            <strong>{proof.title[lang]}</strong>
            <Play size={15} fill="currentColor" aria-hidden="true" />
          </button>
        ))}
      </div>

      <div className={styles.panel} id="editing-proof-panel" role="tabpanel" key={active.id}>{renderPanel()}</div>
    </div>
  );
}
