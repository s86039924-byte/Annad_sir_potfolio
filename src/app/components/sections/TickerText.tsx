'use client';
import { useEffect, useMemo, useRef, useState } from 'react';

export function TickerText() {
  const phrases = useMemo(
    () => ["Practice.", "Analyse.", "Improve."],
    []
  );
  const [i, setI] = useState(0);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    const next = () => setI(p => (p + 1) % phrases.length);
    const id = window.setInterval(next, 2200);
    timer.current = id;
    return () => { if (timer.current) window.clearInterval(timer.current); };
  }, [phrases.length]);

  return (
    <span className="rw-ticker" aria-live="polite">
      <span key={i} className="rw-ticker__item">{phrases[i]}</span>
    </span>
  );
}
