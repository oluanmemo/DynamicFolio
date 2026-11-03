'use client';

import { useLanguage } from '../context/LanguageContext';
import { useMode } from '../context/ModeContext';
import styles from './ProofBand.module.css';

export default function ProofBand() {
  const { lang } = useLanguage();
  const { mode } = useMode();

  if (mode !== 'editor') return null;

  const data = lang === 'pt' ? [
      { value: '+2', label: ['Anos de produção', 'recorrente'] },
      { value: '200K+', label: ['Views em vídeos', 'editados'] },
      { value: '3', label: ['Vídeos institucionais', 'no Grupo Multi'] }
  ] : [
      { value: '+2', label: ['Years of recurring', 'production'] },
      { value: '200K+', label: ['Views on edited', 'videos'] },
      { value: '3', label: ['Institutional videos', 'at Grupo Multi'] }
  ];

  return (
    <section id="prova" className={styles.proofBand}>
      <div className={styles.container}>
        {data.map((item) => (
          <div key={item.value} className={styles.metric}>
            <div className={styles.value}>{item.value}</div>
            <p className={styles.label}>{item.label.map(line => <span key={line}>{line}</span>)}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
