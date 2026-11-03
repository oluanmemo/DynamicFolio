// Pop type (https://design.how/vault/pop-type), card.tsx.
// FIXED. Change the VARIABLE values in params instead (PALETTE, GROUND, WORD, CONTACT_MS, SQUASH, SWELL_PEAK, FONT_VAR).
'use client';

import './fonts.css';
import {useEffect, useRef} from 'react';
import {prefersReducedMotion, usePause} from './runtime/use-pause';
import {PopType} from './engine';
import {FONT_VAR, FONT_WEIGHT, GROUND} from './params';

export default function PopTypeCard({className}: {className?: string}) {
  const box = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const engine = useRef<PopType | null>(null);
  const running = usePause(box, run => {
    if (run) engine.current?.start();
    else {
      engine.current?.stop();
      if (prefersReducedMotion()) engine.current?.renderStill();
    }
  });

  useEffect(() => {
    const element = canvas.current;
    if (!element) return;
    let cancelled = false;
    const raf = requestAnimationFrame(() => {
      const probe = document.createElement('span');
      probe.style.cssText = `position:absolute;visibility:hidden;font-family:var(${FONT_VAR})`;
      probe.textContent = 'Ag';
      document.body.appendChild(probe);
      const family = getComputedStyle(probe).fontFamily || 'sans-serif';
      probe.remove();

      const next = new PopType(element, family);
      engine.current = next;
      if (!next.ok) return;
      element.dataset.ready = 'true';
      if (prefersReducedMotion()) next.renderStill();
      else if (running.current) next.start();
      const first = family.split(',')[0].replace(/["']/g, '').trim();
      document.fonts?.load(`${FONT_WEIGHT} 1em "${first}"`).then(() => { if (!cancelled) engine.current?.refreshFont(); }, () => {});
    });

    let timer = 0;
    const onResize = () => { window.clearTimeout(timer); timer = window.setTimeout(() => engine.current?.resize(), 120); };
    window.addEventListener('resize', onResize);
    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      window.clearTimeout(timer);
      engine.current?.destroy();
      engine.current = null;
    };
  }, [running]);

  return <div
    ref={box}
    aria-hidden="true"
    className={className}
    style={{position: 'relative', width: '100%', height: '100%', backgroundColor: GROUND, touchAction: 'pan-y'}}
  >
    <canvas ref={canvas} style={{display: 'block', width: '100%', height: '100%'}}/>
  </div>;
}
