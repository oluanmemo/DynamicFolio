'use client';

import { useEffect, useRef, useState } from 'react';

export default function CountUp({ target, prefix = '', suffix = '', className }: { target: number; prefix?: string; suffix?: string; className?: string }) {
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
    <div ref={ref} className={className} aria-label={`${prefix}${target}${suffix}`}>
      <span aria-hidden="true">{prefix}{value}{suffix}</span>
    </div>
  );
}

