"use client";

import { useEffect, useRef, useState } from "react";
import { loadYouTubeAPI, type YouTubePlayer } from "../lib/youtubePlayer";
import styles from "./SelectedEdits.module.css";

interface Props {
  videoId: string;
  title: string;
  lang: "pt" | "en";
}

export default function SelectedEditPlayer({ videoId, title, lang }: Props) {
  const container = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error" | "blocked">("loading");
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let disposed = false;
    let player: YouTubePlayer | undefined;
    const timeout = window.setTimeout(() => {
      if (!disposed) setStatus("error");
    }, 20000);

    loadYouTubeAPI().then((api) => {
      if (disposed || !container.current) return;
      const target = document.createElement("div");
      container.current.appendChild(target);
      player = new api.Player(target, {
        host: "https://www.youtube-nocookie.com",
        videoId,
        width: "100%",
        height: "100%",
        playerVars: { autoplay: 1, playsinline: 1, rel: 0, origin: window.location.origin },
        events: {
          onReady: ({ target: readyPlayer }) => {
            window.clearTimeout(timeout);
            if (disposed) return;
            setStatus("ready");
            const iframe = readyPlayer.getIframe();
            iframe.title = title;
            iframe.focus({ preventScroll: true });
          },
          onError: () => {
            window.clearTimeout(timeout);
            if (!disposed) setStatus("error");
          },
          onAutoplayBlocked: () => {
            if (!disposed) setStatus("blocked");
          },
        },
      });
      const iframe = player.getIframe();
      iframe.title = title;
      iframe.referrerPolicy = "strict-origin-when-cross-origin";
    }).catch(() => {
      window.clearTimeout(timeout);
      if (!disposed) setStatus("error");
    });

    const host = container.current;
    return () => {
      disposed = true;
      window.clearTimeout(timeout);
      player?.destroy();
      host?.replaceChildren();
    };
  }, [videoId, title, attempt]);

  return (
    <>
      <div ref={container} className={styles.playerHost} />
      {status === "loading" ? (
        <div className={styles.playerStatus} role="status">
          <span className={styles.loader} aria-hidden="true" />
          {lang === "pt" ? "Carregando vídeo…" : "Loading video…"}
        </div>
      ) : status === "error" ? (
        <div className={styles.playerStatus} role="alert">
          <p>{lang === "pt" ? "Não foi possível reproduzir aqui. Você pode assistir no YouTube." : "Playback is unavailable here. You can watch on YouTube."}</p>
          <button type="button" className={styles.retry} onClick={() => { setStatus("loading"); setAttempt(value => value + 1); }}>
            {lang === "pt" ? "Tentar novamente" : "Try again"}
          </button>
        </div>
      ) : status === "blocked" ? (
        <p className={styles.blockedNotice} role="status">{lang === "pt" ? "Toque no play do vídeo para assistir." : "Press play in the video to watch."}</p>
      ) : null}
    </>
  );
}
