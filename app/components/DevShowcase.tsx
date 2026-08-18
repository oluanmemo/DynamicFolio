"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { trackEvent } from "../lib/analytics";
import { devProofs } from "../lib/homeProofs";
import type { DevProof, Language } from "../lib/homeProofs";
import { localizePath } from "../lib/locale";
import styles from "./DevShowcase.module.css";

interface DevShowcaseProps {
  lang: Language;
}

function BrowserChrome({ label }: { label: string }) {
  return (
    <div className={styles.browserChrome} aria-hidden="true">
      <span /><span /><span />
      <b>{label}</b>
    </div>
  );
}

function getSecondaryLabel(proofId: string, lang: Language) {
  if (proofId === "riffmaker") return "Google Play";
  if (proofId === "vaccari") return lang === "pt" ? "Visitar site" : "Visit site";
  return lang === "pt" ? "Portal do Revendedor" : "Reseller portal";
}

export default function DevShowcase({ lang }: DevShowcaseProps) {
  const [activeId, setActiveId] = useState<DevProof["id"]>("vaccari");
  const [vaccariViewport, setVaccariViewport] = useState(0);
  const [riffMain, setRiffMain] = useState(1);
  const cardRefs = useRef<Record<string, HTMLElement | null>>({});

  const active = devProofs.find((proof) => proof.id === activeId) ?? devProofs[0];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("data-proof-id") as DevProof["id"];
            if (id) {
              setActiveId(id);
              trackEvent("proof_scroll_view", { lane: "dev", proof: id, lang });
            }
          }
        });
      },
      {
        rootMargin: "-28% 0px -40% 0px",
        threshold: [0.1, 0.3, 0.6],
      }
    );

    Object.values(cardRefs.current).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [lang]);

  const selectProof = (proof: DevProof) => {
    setActiveId(proof.id);
    trackEvent("proof_select", { lane: "dev", proof: proof.id, lang });
  };

  return (
    <div className={styles.showcase} style={{ "--dev-proof": active.accent } as CSSProperties}>
      {/* LEFT COLUMN: Narrative chapter cards */}
      <div className={styles.chapters}>
        {devProofs.map((proof) => {
          const isActive = proof.id === active.id;
          const secondaryLabel = getSecondaryLabel(proof.id, lang);

          return (
            <article
              key={proof.id}
              ref={(el) => { cardRefs.current[proof.id] = el; }}
              data-proof-id={proof.id}
              style={{ "--card-accent": proof.accent } as CSSProperties}
              className={`${styles.chapterCard} ${isActive ? styles.chapterCardActive : ""}`}
              onClick={() => selectProof(proof)}
            >
              <div className={styles.chapterHeader}>
                <span className={styles.chapterIndex}>
                  <i className={styles.chapterDot} aria-hidden="true" />
                  {proof.label[lang]}
                </span>
              </div>

              <h3 className={styles.chapterTitle}>{proof.title[lang]}</h3>
              <p className={styles.chapterDesc}>{proof.description[lang]}</p>

              <div className={styles.chapterStack}>
                {proof.stack.split("·").map((tech) => (
                  <span key={tech.trim()} className={styles.stackTag}>
                    {tech.trim()}
                  </span>
                ))}
              </div>

              <div className={styles.chapterActions}>
                <Link
                  href={localizePath(proof.internalHref, lang)}
                  className={styles.primaryAction}
                  onClick={(e) => {
                    e.stopPropagation();
                    trackEvent("proof_link_click", { lane: "dev", proof: proof.id, destination: "internal", lang });
                  }}
                >
                  <span>{lang === "pt" ? "Ver case" : "View case"}</span>
                  <ArrowUpRight size={14} />
                </Link>

                <a
                  href={proof.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.secondaryAction}
                  onClick={(e) => {
                    e.stopPropagation();
                    trackEvent("proof_link_click", { lane: "dev", proof: proof.id, destination: "external", lang });
                  }}
                >
                  <span>{secondaryLabel}</span>
                  <ArrowUpRight size={13} className={styles.secondaryArrow} />
                </a>
              </div>
            </article>
          );
        })}
      </div>

      {/* RIGHT COLUMN: Sticky Visual Canvas */}
      <div className={styles.stickyColumn}>
        <div className={styles.stickyCanvasWrapper}>
          {/* Ambient Glow */}
          <div className={styles.ambientGlow} aria-hidden="true" />

          {/* Canvas Viewports */}
          <div className={styles.canvasContainer}>
            {/* 01. VACCARI CANVAS */}
            <div
              className={`${styles.visualCanvas} ${styles.browserCanvas} ${active.id === "vaccari" ? styles.canvasActive : ""}`}
              aria-hidden={active.id !== "vaccari"}
            >
              <div className={`${styles.browserWindow} ${vaccariViewport === 1 ? styles.browserWindowMobile : ""}`}>
                <BrowserChrome label="vaccari-padaria.vercel.app" />
                <div className={styles.browserViewport}>
                  <Image
                    src={devProofs[0].media[vaccariViewport].src}
                    alt={devProofs[0].media[vaccariViewport].alt[lang]}
                    fill
                    sizes="(min-width: 900px) 45vw, 90vw"
                    className={styles.browserImage}
                  />
                </div>
              </div>
              <div className={styles.visualSwitch} role="tablist" aria-label={lang === "pt" ? "Visualização do site" : "Website viewport"}>
                {devProofs[0].media.map((item, index) => (
                  <button
                    key={item.src}
                    type="button"
                    role="tab"
                    aria-selected={vaccariViewport === index}
                    className={vaccariViewport === index ? styles.visualSwitchActive : ""}
                    onClick={(e) => {
                      e.stopPropagation();
                      setVaccariViewport(index);
                    }}
                  >
                    {item.label[lang]}
                  </button>
                ))}
              </div>
            </div>

            {/* 02. RIFF MAKER CANVAS */}
            <div
              className={`${styles.visualCanvas} ${styles.phoneCanvas} ${active.id === "riffmaker" ? styles.canvasActive : ""}`}
              aria-hidden={active.id !== "riffmaker"}
            >
              <div className={`${styles.phone} ${styles.phonePrimary}`}>
                <Image
                  src={devProofs[1].media[riffMain].src}
                  alt={devProofs[1].media[riffMain].alt[lang]}
                  fill
                  sizes="(min-width: 900px) 20vw, 45vw"
                  className={styles.phoneImage}
                />
              </div>
              <button
                type="button"
                className={`${styles.phone} ${styles.phoneSecondary}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setRiffMain(riffMain === 1 ? 2 : 1);
                }}
                aria-label={`${lang === "pt" ? "Alternar tela" : "Switch screen"}`}
              >
                <Image
                  src={devProofs[1].media[riffMain === 1 ? 2 : 1].src}
                  alt={devProofs[1].media[riffMain === 1 ? 2 : 1].alt[lang]}
                  fill
                  sizes="(min-width: 900px) 16vw, 36vw"
                  className={styles.phoneImage}
                />
              </button>
              <div className={styles.riffScreens} role="tablist" aria-label={lang === "pt" ? "Telas do Riff Maker" : "Riff Maker screens"}>
                {devProofs[1].media.map((item, index) => (
                  <button
                    key={item.src}
                    type="button"
                    role="tab"
                    aria-selected={riffMain === index}
                    onClick={(e) => {
                      e.stopPropagation();
                      setRiffMain(index);
                    }}
                  >
                    <Image src={item.src} alt="" fill sizes="48px" className={styles.riffThumb} />
                    <span>{item.label[lang]}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 03. MULTILASER CANVAS */}
            <div
              className={`${styles.visualCanvas} ${styles.ecosystemCanvas} ${active.id === "multilaser" ? styles.canvasActive : ""}`}
              aria-hidden={active.id !== "multilaser"}
            >
              <div className={`${styles.browserWindow} ${styles.ecosystemPrimary}`}>
                <BrowserChrome label="Portal do Revendedor" />
                <div className={styles.browserViewport}>
                  <Image
                    src={devProofs[2].media[0].src}
                    alt={devProofs[2].media[0].alt[lang]}
                    fill
                    sizes="(min-width: 900px) 42vw, 85vw"
                    className={styles.browserImage}
                  />
                </div>
              </div>
              <div className={`${styles.browserWindow} ${styles.ecosystemSecondary}`}>
                <BrowserChrome label="Multi Notify · produto distinto" />
                <div className={styles.browserViewport}>
                  <Image
                    src={devProofs[2].media[1].src}
                    alt={devProofs[2].media[1].alt[lang]}
                    fill
                    sizes="(min-width: 900px) 26vw, 55vw"
                    className={styles.browserImage}
                  />
                </div>
              </div>
              <span className={styles.ecosystemNote}>{devProofs[2].media[1].label[lang]}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
