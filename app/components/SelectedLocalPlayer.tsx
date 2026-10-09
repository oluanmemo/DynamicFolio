"use client";

import { useRef, useState } from "react";
import styles from "./SelectedEdits.module.css";

export default function SelectedLocalPlayer({ src, title, lang }: {
  src: string;
  title: string;
  lang: "pt" | "en";
}) {
  const video = useRef<HTMLVideoElement>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  return (
    <>
      <video
        ref={video}
        src={src}
        controls
        playsInline
        autoPlay
        preload="metadata"
        tabIndex={0}
        aria-label={title}
        className={styles.localPlayer}
        onLoadedData={() => {
          setStatus("ready");
          video.current?.focus({ preventScroll: true });
        }}
        onPlaying={() => setStatus("ready")}
        onError={() => setStatus("error")}
      />
      {status === "loading" ? (
        <div className={styles.playerStatus} role="status">
          <span className={styles.loader} aria-hidden="true" />
          {lang === "pt" ? "Carregando vídeo…" : "Loading video…"}
        </div>
      ) : status === "error" ? (
        <div className={styles.playerStatus} role="alert">
          <p>{lang === "pt" ? "Não foi possível carregar o vídeo." : "The video could not be loaded."}</p>
          <button className={styles.retry} type="button" onClick={() => { setStatus("loading"); video.current?.load(); }}>
            {lang === "pt" ? "Tentar novamente" : "Try again"}
          </button>
        </div>
      ) : null}
    </>
  );
}
