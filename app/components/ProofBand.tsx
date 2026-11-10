'use client';

import CountUp from './CountUp';
import { useLanguage } from '../context/LanguageContext';
import { useMode } from '../context/ModeContext';
import styles from './ProofBand.module.css';

export default function ProofBand() {
  const { lang } = useLanguage();
  const { mode } = useMode();

  if (mode !== 'editor') return null;

  const data = lang === 'pt' ? [
      { value: '+2', target: 2, prefix: '+', label: ['Anos de produção', 'recorrente'] },
      { value: '200K+', target: 200, suffix: 'K+', label: ['Views em vídeos', 'editados'] },
      { value: '3', target: 3, label: ['Vídeos institucionais', 'no Grupo Multi'] }
  ] : [
      { value: '+2', target: 2, prefix: '+', label: ['Years of recurring', 'production'] },
      { value: '200K+', target: 200, suffix: 'K+', label: ['Views on edited', 'videos'] },
      { value: '3', target: 3, label: ['Institutional videos', 'at Grupo Multi'] }
  ];

  return (
    <section id="prova" className={styles.proofBand}>
      <div className={styles.container}>
        {data.map((item) => (
          <div data-editing-reveal key={item.value} className={styles.metric}>
            <CountUp className={styles.value} target={item.target} prefix={item.prefix} suffix={item.suffix} />
            <p className={styles.label}>{item.label.map(line => <span key={line}>{line}</span>)}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
