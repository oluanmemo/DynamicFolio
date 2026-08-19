'use client';

import { useLanguage } from '../context/LanguageContext';
import { useMode } from '../context/ModeContext';
import styles from './Timeline.module.css';

export default function Timeline() {
  const { lang } = useLanguage();
  const { mode } = useMode();

  if (mode !== 'editor') return null;

  const data = lang === 'pt' ? [
    { period: '2024 - AGORA', title: 'Editor de vídeo freelancer', desc: 'Edição recorrente para YouTube e operações internacionais.' },
    { period: '2025 - 2026', title: 'Grupo Multi', desc: 'Tecnologia + produção audiovisual corporativa.' },
    { period: '2026 - AGORA', title: 'Van Life Insider', desc: 'Produção completa de conteúdo para canal internacional.' }
  ] : [
    { period: '2024 - NOW', title: 'Freelance video editor', desc: 'Recurring editing for YouTube and international operations.' },
    { period: '2025 - 2026', title: 'Grupo Multi', desc: 'Technology + corporate audiovisual production.' },
    { period: '2026 - NOW', title: 'Van Life Insider', desc: 'Complete content production for an international channel.' }
  ];

  return (
    <section id="experiencia" className={styles.timelineSection}>
      <div className={styles.container}>
        <div className={styles.sectionLabel}>
          {lang === 'pt' ? 'Experiência' : 'Experience'}
        </div>
        
        <div className={styles.timeline}>
          {data.map((item, index) => (
            <div key={index} className={styles.entry}>
              <div className={styles.dot} />
              <div className={styles.period}>{item.period}</div>
              <h3 className={styles.title}>{item.title}</h3>
              <p className={styles.desc}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
