'use client';

import { useLanguage } from '../context/LanguageContext';
import { useMode } from '../context/ModeContext';
import styles from './ProofBand.module.css';

export default function ProofBand() {
  const { lang } = useLanguage();
  const { mode } = useMode();

  if (mode !== 'editor') return null;

  const data = lang === 'pt' ? [
      { value: '+2', unit: 'anos', label: 'produção recorrente' },
      { value: '200K+', unit: 'views', label: 'em vídeos editados' },
      { value: '3', unit: 'vídeos institucionais', label: 'produzidos no Grupo Multi' }
  ] : [
      { value: '+2', unit: 'years', label: 'recurring production' },
      { value: '200K+', unit: 'views', label: 'on edited videos' },
      { value: '3', unit: 'institutional videos', label: 'produced at Grupo Multi' }
  ];

  return (
    <section id="prova" className={styles.proofBand}>
      <div className={styles.container}>
        {data.map((item, index) => (
          <div key={index} className={styles.metric}>
            <div className={styles.value}>{item.value}</div>
            <div className={styles.unit}>{item.unit}</div>
            <div className={styles.label}>{item.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
