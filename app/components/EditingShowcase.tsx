"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Play, VolumeX, Maximize2 } from "lucide-react";
import { useState } from "react";
import type { CSSProperties } from "react";
import { trackEvent } from "../lib/analytics";
import { editingProofs } from "../lib/homeProofs";
import type { EditingFormat, EditingProof, GameplayProof, Language } from "../lib/homeProofs";
import styles from "./EditingShowcase.module.css";

interface EditingShowcaseProps {
  lang: Language;
}

/* ── Poster / Player ───────────────────────────────────── */

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

function PosterPlayer({
  playerKey, title, duration, poster, accent, kind, src, playingKey, onPlay, lang, portrait = false,
}: PosterPlayerProps) {
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
        className={styles.playerMedia}
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
      <Image
        src={poster}
        alt=""
        fill
        sizes={portrait ? "(min-width: 960px) 26vw, 70vw" : "(min-width: 960px) 58vw, 100vw"}
        className={`${styles.posterImage} ${portrait ? styles.portraitPoster : ""}`}
      />
      <span className={styles.posterShade} />
      <span className={styles.playControl} aria-hidden="true"><Play size={26} fill="currentColor" /></span>
      <span className={styles.playLabel}>{lang === "pt" ? "Reproduzir" : "Play"}</span>
      <span className={styles.playerDuration}>{duration}</span>
      <span className={styles.controlPreview} aria-hidden="true">
        <i><b /></i>
        <VolumeX size={14} />
        <Maximize2 size={14} />
      </span>
    </button>
  );
}

/* ── Gameplay thumb ─────────────────────────────────────── */

function GameplayThumb({
  gameplay, selected, lang, onSelect,
}: { gameplay: GameplayProof; selected: boolean; lang: Language; onSelect: () => void }) {
  return (
    <button
      type="button"
      className={selected ? styles.gameThumbActive : ""}
      aria-pressed={selected}
      onClick={onSelect}
    >
      <span className={styles.gameThumbImage}>
        <Image src={gameplay.poster} alt="" fill sizes="(min-width: 960px) 14vw, 40vw" />
      </span>
      <span className={styles.gameThumbCopy}>
        <strong>{gameplay.title}</strong>
        <small>{gameplay.duration}</small>
      </span>
      <span className={styles.srOnly}>{lang === "pt" ? "Selecionar gameplay" : "Select gameplay"}</span>
    </button>
  );
}

/* ── Meta strip ────────────────────────────────────────── */

function MetaStrip({ proof, lang }: { proof: EditingProof; lang: Language }) {
  const tags = proof.contribution[lang].split(" · ");
  return (
    <div className={styles.metaStrip}>
      <p className={styles.metaEyebrow}>
        {proof.label[lang]} · {proof.duration} · {proof.format}
      </p>
      <h3 className={styles.metaTitle}>{proof.title[lang]}</h3>
      <p className={styles.metaDesc}>{proof.description[lang]}</p>
      <div className={styles.tags} aria-label={lang === "pt" ? "Técnicas" : "Techniques"}>
        {tags.map((tag) => (
          <span key={tag} className={styles.tag}>{tag}</span>
        ))}
      </div>
      {proof.href ? (
        <Link
          href={proof.href}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.proofLink}
          onClick={() => trackEvent("proof_link_click", { lane: "editing", proof: proof.id, destination: "external", lang })}
        >
          {lang === "pt" ? "Ver projeto completo" : "View full project"}
          <ArrowUpRight size={14} />
        </Link>
      ) : null}
    </div>
  );
}

/* ── Main component ─────────────────────────────────────── */

export default function EditingShowcase({ lang }: EditingShowcaseProps) {
  const [activeId, setActiveId] = useState<EditingFormat>("reel");
  const [gameplayId, setGameplayId] = useState("arena");
  const [playingKey, setPlayingKey] = useState<string | null>(null);

  const active = editingProofs.find((p) => p.id === activeId) ?? editingProofs[0];
  const gameplayProof = editingProofs.find((p) => p.id === "gameplay");
  const gameplays = gameplayProof?.related ?? [];
  const activeGameplay = gameplays.find((g) => g.id === gameplayId) ?? gameplays[0];

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

  /* determine aspect for current active proof */
  const isPortrait = active.format === "9:16";
  const aspect = isPortrait ? "9/16" : "16/9";

  /* player key & props vary by panel type */
  const playerKey = active.id === "gameplay" && activeGameplay
    ? `gameplay-${activeGameplay.id}`
    : active.id;

  const playerSrc = active.id === "gameplay" && activeGameplay
    ? activeGameplay.videoId
    : (active.src ?? "");

  const playerPoster = active.id === "gameplay" && activeGameplay
    ? activeGameplay.poster
    : (active.poster ?? "");

  const playerKind: "local" | "youtube" = active.id === "gameplay" ? "youtube" : "local";

  const playerTitle = active.id === "gameplay" && activeGameplay
    ? activeGameplay.title
    : active.title[lang];

  const playerDuration = active.id === "gameplay" && activeGameplay
    ? activeGameplay.duration
    : active.duration;

  return (
    <div
      className={styles.showcase}
      style={{ "--editing-proof": active.accent } as CSSProperties}
    >
      {/* LEFT: selector */}
      <div
        className={styles.selector}
        role="tablist"
        aria-label={lang === "pt" ? "Formatos de edição" : "Editing formats"}
      >
        {editingProofs.map((proof) => (
          <button
            key={proof.id}
            type="button"
            role="tab"
            aria-selected={proof.id === active.id}
            aria-controls="editing-canvas"
            className={proof.id === active.id ? styles.selectorActive : ""}
            onClick={() => selectProof(proof)}
          >
            <span>{proof.label[lang]}</span>
            <strong>{proof.title[lang]}</strong>
            <Play size={14} fill="currentColor" aria-hidden="true" />
          </button>
        ))}
      </div>

      {/* RIGHT: sticky canvas */}
      <div
        id="editing-canvas"
        role="tabpanel"
        className={styles.stickyColumn}
        key={active.id}
      >
        {/* Player */}
        <div className={styles.playerShell} data-aspect={aspect}>
          <PosterPlayer
            playerKey={playerKey}
            title={playerTitle}
            duration={playerDuration}
            poster={playerPoster}
            accent={active.accent}
            kind={playerKind}
            src={playerSrc}
            playingKey={playingKey}
            onPlay={play}
            lang={lang}
            portrait={isPortrait}
          />
        </div>

        {/* Gameplay: active title row + thumbnails */}
        {active.id === "gameplay" && activeGameplay && (
          <>
            <div className={styles.gameTitleRow}>
              <strong>{activeGameplay.title}</strong>
              <span>{activeGameplay.duration} · 16:9</span>
            </div>
            <div
              className={styles.gameplayThumbs}
              aria-label={lang === "pt" ? "Selecionar gameplay" : "Select gameplay"}
            >
              {gameplays.map((gameplay) => (
                <GameplayThumb
                  key={gameplay.id}
                  gameplay={gameplay}
                  selected={gameplay.id === activeGameplay.id}
                  lang={lang}
                  onSelect={() => selectGameplay(gameplay)}
                />
              ))}
            </div>
          </>
        )}

        {/* Meta strip — always below player/thumbs */}
        <MetaStrip proof={active} lang={lang} />
      </div>
    </div>
  );
}
