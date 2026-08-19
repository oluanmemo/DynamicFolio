"use client";

import { Fragment, useEffect, useRef } from "react";
import Image from "next/image";
import styles from "./YouTubeGrid.module.css";
import { useLanguage } from "../context/LanguageContext";
import { trackEvent } from "../lib/analytics";

const BLUR_PLACEHOLDER = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxIiBoZWlnaHQ9IjEiPjxyZWN0IGZpbGw9IiMxYTFhMWEiLz48L3N2Zz4=";

interface ChannelData {
  name: string;
  type: string;
  typeEn: string;
  role: string;
  roleEn: string;
  roleTag: string;
  roleTagEn: string;
  avatarSrc?: string;
  fallbackInitials: string;
  href: string;
  isSpecial?: boolean;
}

const channels: ChannelData[] = [
  {
    name: "True Sailing Life",
    type: "Travel / Lifestyle",
    typeEn: "Travel / Lifestyle",
    role: "Edição recorrente · pesquisa visual · ritmo",
    roleEn: "Recurring editing · visual research · pacing",
    roleTag: "~80% dos uploads editados",
    roleTagEn: "~80% of uploads edited",
    avatarSrc: "/True Sailing Life.jpg",
    fallbackInitials: "TS",
    href: "https://www.youtube.com/@TrueSailingLife",
  },
  {
    name: "UK Motorhome Guide",
    type: "Travel / Motorhome",
    typeEn: "Travel / Motorhome",
    role: "Edição recorrente · long-form",
    roleEn: "Recurring editing · long-form",
    roleTag: "Maioria dos 11 vídeos editada",
    roleTagEn: "Majority of 11 videos edited",
    avatarSrc: "/UKMotorhomeGuide.jpg",
    fallbackInitials: "UK",
    href: "https://www.youtube.com/@UKMotorhomeGuide",
  },
  {
    name: "Van Life Insider",
    type: "Canal próprio",
    typeEn: "Owned channel",
    role: "Produção completa: pesquisa, roteiro, thumb e edição",
    roleEn: "Full production: research, script, thumb and edit",
    roleTag: "Produção completa · 45K no maior vídeo",
    roleTagEn: "Full production · 45K top video",
    avatarSrc: "/VanLifeInsider.jpg",
    fallbackInitials: "VL",
    href: "#case-vanlife",
    isSpecial: true,
  },
  {
    name: "Switch Game List",
    type: "Games / Multi-idioma · EN / ES / FR",
    typeEn: "Gaming / Multi-language · EN / ES / FR",
    role: "Edição recorrente · gaming · long-form",
    roleEn: "Recurring editing · gaming · long-form",
    roleTag: "Operação multi-idioma",
    roleTagEn: "Multi-language operation",
    avatarSrc: "/Switch Game List.jpg",
    fallbackInitials: "SG",
    href: "https://www.youtube.com/@SwitchGameList",
  },
  {
    name: "Road Life Guide",
    type: "Travel / Dark Content",
    typeEn: "Travel / Dark Content",
    role: "Edição recorrente · long-form",
    roleEn: "Recurring editing · long-form",
    roleTag: "Conteúdo internacional",
    roleTagEn: "International content",
    avatarSrc: "/RoadLifeGuide.jpg",
    fallbackInitials: "RL",
    href: "https://www.youtube.com/@RoadLifeGuide",
  },
  {
    name: "Money Cultures",
    type: "Finanças / Dark Content",
    typeEn: "Finance / Dark Content",
    role: "Edição recorrente · ritmo · retenção",
    roleEn: "Recurring editing · pacing · retention",
    roleTag: "Dark content",
    roleTagEn: "Dark content",
    avatarSrc: "/Money Cultures.jpg",
    fallbackInitials: "MC",
    href: "https://www.youtube.com/@MoneyCultures",
  },
  {
    name: "Global Travel List",
    type: "Travel / Listas",
    typeEn: "Travel / Lists",
    role: "Edição recorrente · pesquisa visual",
    roleEn: "Recurring editing · visual research",
    roleTag: "Travel / Listas",
    roleTagEn: "Travel / Lists",
    avatarSrc: "/Global Travel List.jpg",
    fallbackInitials: "GT",
    href: "https://www.youtube.com/@GlobalTravelList",
  },
];

export default function YouTubeGrid() {
  const { lang } = useLanguage();
  const channelRefs = useRef<Array<HTMLAnchorElement | null>>([]);

  useEffect(() => {
    const items = channelRefs.current.filter((item): item is HTMLAnchorElement => item !== null);

    if (!items.length) {
      return;
    }

    const timers: number[] = [];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          const index = items.indexOf(entry.target as HTMLAnchorElement);
          const timer = window.setTimeout(() => {
            entry.target.classList.add(styles.itemVisible);
          }, index * 70);

          timers.push(timer);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.1 }
    );

    items.forEach((item) => observer.observe(item));

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
      observer.disconnect();
    };
  }, []);

  return (
    <div className={styles.wrapper} id="trabalhos">
      <h2 className={styles.title}>
        {lang === "en" ? <><span>Channels</span> and projects</> : <>Canais e <span>projetos</span></>}
      </h2>
      <p className={styles.subtitle}>
        {lang === "en" 
          ? "Channels where I delivered recurring editing, content production or audiovisual projects." 
          : "Canais em que atuei com edição recorrente, produção de conteúdo ou projetos audiovisuais."}
      </p>

      <div className={styles.channels}>
        {channels.map((channel, index) => (
          <Fragment key={channel.name}>
            <a
              href={channel.href}
              target={channel.href.startsWith("#") ? undefined : "_blank"}
              rel={channel.href.startsWith("#") ? undefined : "noopener noreferrer"}
              className={`${styles.channel} ${channel.isSpecial ? styles.channelSpecial : ""}`}
              onClick={() => trackEvent("project_click", { project: channel.name, category: "editor", platform: "youtube", lang })}
              ref={(element) => {
                channelRefs.current[index] = element;
              }}
            >
              <div className={styles.avatar}>
                {channel.avatarSrc ? (
                  <Image 
                    src={channel.avatarSrc} 
                    alt={channel.name} 
                    fill 
                    sizes="64px" 
                    className={styles.avatarImage} 
                    placeholder="blur" 
                    blurDataURL={BLUR_PLACEHOLDER} 
                  />
                ) : (
                  <div className={styles.avatarFallback}>
                    {channel.fallbackInitials}
                  </div>
                )}
                <div className={styles.avatarArrow} aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </div>
              </div>
              <span className={styles.channelName}>{channel.name}</span>
              <span className={styles.channelMeta}>{lang === "en" ? channel.typeEn : channel.type}</span>
              <span className={styles.channelRole}>{lang === "en" ? channel.roleEn : channel.role}</span>
              <span className={styles.roleTag}>{lang === "en" ? channel.roleTagEn : channel.roleTag}</span>
              <div className={styles.actionPill}>
                {channel.isSpecial
                  ? (lang === "en" ? "VER CASE ↘" : "VER CASE ↘")
                  : (lang === "en" ? "VER CANAL ↗" : "VER CANAL ↗")}
              </div>
            </a>
            {index < channels.length - 1 && <div className={styles.dotDivider} aria-hidden="true"></div>}
          </Fragment>
        ))}
      </div>
    </div>
  );
}
