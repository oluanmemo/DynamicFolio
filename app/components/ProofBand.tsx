'use client';

import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useMode } from '../context/ModeContext';
import styles from './ProofBand.module.css';

function CountUp({ target, prefix = '', suffix = '' }: { target: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState(target);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (motion.matches) return;

    let frame = requestAnimationFrame(() => setValue(0));
    const observer = new IntersectionObserver(entries => {
      if (!entries.some(entry => entry.isIntersecting)) return;
      observer.disconnect();
      const start = performance.now();
      const tick = (now: number) => {
        const progress = Math.min((now - start) / 1600, 1);
        setValue(Math.floor(target * (1 - Math.pow(1 - progress, 2))));
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    }, { threshold: 0.5 });
    observer.observe(element);

    const onMotionChange = () => {
      if (motion.matches) {
        observer.disconnect();
        cancelAnimationFrame(frame);
        setValue(target);
      }
    };
    motion.addEventListener('change', onMotionChange);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      motion.removeEventListener('change', onMotionChange);
    };
  }, [target]);

  return (
    <div ref={ref} className={styles.value} aria-label={`${prefix}${target}${suffix}`}>
      <span aria-hidden="true">{prefix}{value}{suffix}</span>
    </div>
  );
}

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
            <CountUp target={item.target} prefix={item.prefix} suffix={item.suffix} />
            <p className={styles.label}>{item.label.map(line => <span key={line}>{line}</span>)}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
