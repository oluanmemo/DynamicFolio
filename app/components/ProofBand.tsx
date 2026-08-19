'use client';

import { useLanguage } from '../context/LanguageContext';
import { useMode } from '../context/ModeContext';
import styles from './ProofBand.module.css';

export default function ProofBand() {
  const { lang } = useLanguage();
  const { mode } = useMode();

  if (mode !== 'editor') return null;

  const data = lang === 'pt' ? [
      { value: '+2 anos', label: 'produção recorrente' },
      { value: '~6 vídeos/semana', label: 'para operação internacional' },
      { value: '200K+ views', label: 'em vídeos editados' },
      { value: '3 vídeos institucionais', label: 'produzidos no Grupo Multi' }
  ] : [
      { value: '+2 years', label: 'recurring production' },
      { value: '~6 videos/week', label: 'for international operation' },
      { value: '200K+ views', label: 'on edited videos' },
      { value: '3 institutional videos', label: 'produced at Grupo Multi' }
  ];

  return (
    <section id="prova" className={styles.proofBand}>
      <div className={styles.container}>
        {data.map((item, index) => (
          <div key={index} className={styles.metric}>
            <div className={styles.value}>{item.value}</div>
            <div className={styles.label}>{item.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
