"use client";

import { TrendingUp } from "lucide-react";
import CountUp from "./CountUp";
import { useLanguage } from "../context/LanguageContext";
import styles from "./ProofBand.module.css";

export default function ProofBand() {
  const { lang } = useLanguage();

  return (
    <div id="prova" className={styles.proof}>
      <div className={styles.badge}>
        <span className={styles.icon} aria-hidden="true"><TrendingUp size={16} strokeWidth={1.5} /></span>
        <div className={styles.badgeCopy}>
          <CountUp className={styles.value} target={200} suffix="K+" />
          <span className={styles.label}>{lang === "pt" ? "views em vídeos editados" : "views on edited videos"}</span>
        </div>
      </div>
      <div className={styles.details}>
        <div><CountUp className={styles.smallValue} target={2} prefix="+" /> {lang === "pt" ? "anos de produção recorrente" : "years of recurring production"}</div>
      </div>
    </div>
  );
}
