"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Boxes, Layers3, Rocket, ScanLine } from "lucide-react";
import { useState } from "react";
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

function DevMedia({ proof, lang }: { proof: DevProof; lang: Language }) {
  const [vaccariViewport, setVaccariViewport] = useState(0);
  const [riffMain, setRiffMain] = useState(1);

  if (proof.composition === "browser") {
    const media = proof.media[vaccariViewport];
    return (
      <div className={`${styles.visualCanvas} ${styles.browserCanvas}`}>
        <div className={`${styles.browserWindow} ${vaccariViewport === 1 ? styles.browserWindowMobile : ""}`}>
          <BrowserChrome label="vaccari-padaria.vercel.app" />
          <div className={styles.browserViewport}>
            <Image key={media.src} src={media.src} alt={media.alt[lang]} fill sizes="(min-width: 900px) 62vw, 100vw" className={styles.browserImage} />
          </div>
        </div>
        <div className={styles.visualSwitch} role="tablist" aria-label={lang === "pt" ? "Visualização do site" : "Website viewport"}>
          {proof.media.map((item, index) => (
            <button
              key={item.src}
              type="button"
              role="tab"
              aria-selected={vaccariViewport === index}
              className={vaccariViewport === index ? styles.visualSwitchActive : ""}
              onClick={() => setVaccariViewport(index)}
            >
              {item.label[lang]}
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (proof.composition === "phones") {
    const secondaryIndex = riffMain === 1 ? 2 : 1;
    const main = proof.media[riffMain];
    const secondary = proof.media[secondaryIndex];

    return (
      <div className={`${styles.visualCanvas} ${styles.phoneCanvas}`}>
        <div className={`${styles.phone} ${styles.phonePrimary}`}>
          <Image key={main.src} src={main.src} alt={main.alt[lang]} fill sizes="(min-width: 900px) 22vw, 48vw" className={styles.phoneImage} />
        </div>
        <button
          type="button"
          className={`${styles.phone} ${styles.phoneSecondary}`}
          onClick={() => setRiffMain(secondaryIndex)}
          aria-label={`${lang === "pt" ? "Mostrar" : "Show"} ${secondary.label[lang]}`}
        >
          <Image key={secondary.src} src={secondary.src} alt={secondary.alt[lang]} fill sizes="(min-width: 900px) 18vw, 40vw" className={styles.phoneImage} />
        </button>
        <div className={styles.riffScreens} role="tablist" aria-label={lang === "pt" ? "Telas do Riff Maker" : "Riff Maker screens"}>
          {proof.media.map((item, index) => (
            <button
              key={item.src}
              type="button"
              role="tab"
              aria-selected={riffMain === index}
              onClick={() => setRiffMain(index)}
            >
              <Image src={item.src} alt="" fill sizes="64px" className={styles.riffThumb} />
              <span>{item.label[lang]}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.visualCanvas} ${styles.ecosystemCanvas}`}>
      <div className={`${styles.browserWindow} ${styles.ecosystemPrimary}`}>
        <BrowserChrome label="Portal do Revendedor" />
        <div className={styles.browserViewport}>
          <Image src={proof.media[0].src} alt={proof.media[0].alt[lang]} fill sizes="(min-width: 900px) 58vw, 100vw" className={styles.browserImage} />
        </div>
      </div>
      <div className={`${styles.browserWindow} ${styles.ecosystemSecondary}`}>
        <BrowserChrome label="Multi Notify · produto distinto" />
        <div className={styles.browserViewport}>
          <Image src={proof.media[1].src} alt={proof.media[1].alt[lang]} fill sizes="(min-width: 900px) 34vw, 72vw" className={styles.browserImage} />
        </div>
      </div>
      <span className={styles.ecosystemNote}>{proof.media[1].label[lang]}</span>
    </div>
  );
}

export default function DevShowcase({ lang }: DevShowcaseProps) {
  const [activeId, setActiveId] = useState<DevProof["id"]>("vaccari");
  const active = devProofs.find((proof) => proof.id === activeId) ?? devProofs[0];

  const selectProof = (proof: DevProof) => {
    setActiveId(proof.id);
    trackEvent("proof_select", { lane: "dev", proof: proof.id, lang });
  };

  return (
    <div className={styles.showcase} style={{ "--dev-proof": active.accent } as CSSProperties}>
      <div className={styles.selector} role="tablist" aria-label={lang === "pt" ? "Projetos de desenvolvimento" : "Development projects"}>
        {devProofs.map((proof) => (
          <button
            key={proof.id}
            type="button"
            role="tab"
            aria-selected={proof.id === active.id}
            aria-controls="dev-proof-panel"
            className={proof.id === active.id ? styles.selectorActive : ""}
            onClick={() => selectProof(proof)}
          >
            <span>{proof.label[lang]}</span>
            <strong>{proof.title[lang]}</strong>
            <ArrowUpRight size={17} aria-hidden="true" />
          </button>
        ))}
      </div>

      <div className={styles.panel} id="dev-proof-panel" role="tabpanel" key={active.id}>
        <DevMedia proof={active} lang={lang} />

        <div className={styles.projectInfo}>
          <div className={styles.projectLead}>
            <span className={styles.status}>{active.status[lang]}</span>
            <h3>{active.title[lang]}</h3>
            <p>{active.description[lang]}</p>
          </div>

          <dl className={styles.facts}>
            <div><dt><ScanLine size={16} />{lang === "pt" ? "Meu papel" : "My role"}</dt><dd>{active.role[lang]}</dd></div>
            <div><dt><Rocket size={16} />{lang === "pt" ? "Entrega" : "Delivery"}</dt><dd>{active.delivery[lang]}</dd></div>
            <div><dt><Boxes size={16} />Stack</dt><dd>{active.stack}</dd></div>
          </dl>

          <div className={styles.actions}>
            <Link href={localizePath(active.internalHref, lang)} onClick={() => trackEvent("proof_link_click", { lane: "dev", proof: active.id, destination: "internal", lang })}>
              {lang === "pt" ? "Abrir case" : "Open case"}<ArrowUpRight size={16} />
            </Link>
            <Link href={active.href} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent("proof_link_click", { lane: "dev", proof: active.id, destination: "external", lang })}>
              <Layers3 size={15} />{lang === "pt" ? "Ver publicado" : "View live"}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
