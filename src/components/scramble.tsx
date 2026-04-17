import { useEffect, useState, useRef, useCallback } from 'react';
import type { CSSProperties } from 'react';

// ── Scramble core ─────────────────────────────────────────────────────────────

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@$%&!?/\\[]<>{}*^';
const rc = () => CHARS[Math.floor(Math.random() * CHARS.length)];
const noise = (s: string) => s.split('').map(c => (c === ' ' ? ' ' : rc())).join('');

export type ScrambleMode = 'in' | 'out' | 'idle';

export function useTextScramble(text: string, mode: ScrambleMode, onComplete?: () => void): string {
  const [display, setDisplay] = useState(text);
  const cbRef = useRef(onComplete);
  cbRef.current = onComplete;

  useEffect(() => {
    if (mode === 'idle') {
      setDisplay(text);
      return;
    }
    const TICK = 36;
    if (mode === 'in') {
      setDisplay(noise(text));
      let iter = 0;
      const iv = setInterval(() => {
        iter += 0.75;
        if (iter >= text.length) { setDisplay(text); clearInterval(iv); cbRef.current?.(); return; }
        setDisplay(text.split('').map((c, i) => c === ' ' ? ' ' : i < iter ? c : rc()).join(''));
      }, TICK);
      return () => clearInterval(iv);
    }
    if (mode === 'out') {
      let iter = text.length;
      const iv = setInterval(() => {
        iter -= 0.85;
        if (iter <= 0) { setDisplay(noise(text)); clearInterval(iv); cbRef.current?.(); return; }
        setDisplay(text.split('').map((c, i) => c === ' ' ? ' ' : i < iter ? c : rc()).join(''));
      }, TICK);
      return () => clearInterval(iv);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, text]);

  return display;
}

// ── InfoLine ──────────────────────────────────────────────────────────────────

export function InfoLine({ text, mode, onComplete, fontSize = 22 }: {
  text: string; mode: ScrambleMode; onComplete: () => void; fontSize?: number;
}) {
  const display = useTextScramble(text, mode, onComplete);
  const hasAnimated = useRef(false);
  if (mode !== 'idle') hasAnimated.current = true;
  return (
    <div style={{
      height: '1.6em',
      color: '#FF3A2D',
      fontSize,
      fontWeight: 600,
      letterSpacing: '0.08em',
      lineHeight: '1.6em',
      whiteSpace: 'nowrap',
      textTransform: 'uppercase',
      fontFamily: 'inherit',
      fontVariantNumeric: 'tabular-nums',
      visibility: !hasAnimated.current ? 'hidden' : 'visible',
    }}>
      {display}
    </div>
  );
}

// ── ScrambleBlock ─────────────────────────────────────────────────────────────
// Single-use block. Parent controls phase. Lines enter sequentially, exit together.

export function ScrambleBlock({
  lines,
  style,
  phase,
  onEntered,
  onExited,
  fontSize,
}: {
  lines: string[];
  style: CSSProperties;
  phase: 'in' | 'idle' | 'out';
  onEntered: () => void;
  onExited: () => void;
  fontSize?: number;
}) {
  const [activeLine, setActiveLine] = useState(-1);
  const exitedCount = useRef(0);
  const prevPhase = useRef<typeof phase>('idle');
  const onEnteredRef = useRef(onEntered);
  onEnteredRef.current = onEntered;
  const onExitedRef = useRef(onExited);
  onExitedRef.current = onExited;

  useEffect(() => {
    if (phase === 'in' && prevPhase.current !== 'in') setActiveLine(0);
    prevPhase.current = phase;
  }, [phase]);

  const handleLineIn = useCallback((idx: number) => {
    if (idx < lines.length - 1) setTimeout(() => setActiveLine(idx + 1), 60);
    else onEnteredRef.current();
  }, [lines.length]);

  const handleLineOut = useCallback(() => {
    exitedCount.current += 1;
    if (exitedCount.current >= lines.length) { exitedCount.current = 0; onExitedRef.current(); }
  }, [lines.length]);

  const getMode = (i: number): ScrambleMode => {
    if (phase === 'out') return 'out';
    if (phase === 'in' && activeLine >= i) return 'in';
    return 'idle';
  };

  return (
    <div style={{ position: 'absolute', ...style }}>
      {lines.map((line, i) => (
        <InfoLine
          key={i}
          text={line}
          mode={getMode(i)}
          fontSize={fontSize}
          onComplete={phase === 'out' ? handleLineOut : () => handleLineIn(i)}
        />
      ))}
    </div>
  );
}
