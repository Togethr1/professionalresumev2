import { useEffect, useState, useRef, useCallback } from 'react';
import { motion } from 'motion/react';
import { useTextScramble, InfoLine, ScrambleBlock } from '@/components/scramble';
import type { ScrambleMode } from '@/components/scramble';

// ── MouseSmoke ─────────────────────────────────────────────────────────────────

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  radius: number;
  alpha: number;
  decay: number;
}

function MouseSmoke() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const mouse = useRef({ x: -999, y: -999 });
  const raf = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      // Spawn 3-5 particles per frame of movement
      const count = 4;
      for (let i = 0; i < count; i++) {
        particles.current.push({
          x: e.clientX + (Math.random() - 0.5) * 8,
          y: e.clientY + (Math.random() - 0.5) * 8,
          vx: (Math.random() - 0.5) * 0.6,
          vy: -(Math.random() * 1.2 + 0.4),
          radius: Math.random() * 18 + 8,
          alpha: Math.random() * 0.18 + 0.06,
          decay: Math.random() * 0.012 + 0.008,
        });
      }
    };
    window.addEventListener('mousemove', onMove);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = particles.current.length - 1; i >= 0; i--) {
        const p = particles.current[i];
        p.x += p.vx;
        p.y += p.vy;
        p.radius += 0.4;
        p.alpha -= p.decay;
        if (p.alpha <= 0) { particles.current.splice(i, 1); continue; }

        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
        grad.addColorStop(0, `rgba(255, 58, 45, ${p.alpha})`);
        grad.addColorStop(1, `rgba(255, 58, 45, 0)`);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }
      raf.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed', inset: 0,
        pointerEvents: 'none',
        zIndex: 50,
      }}
    />
  );
}

// ── ScrollIndicator ───────────────────────────────────────────────────────────

function ScrollIndicator({ show }: { show: boolean }) {
  const [phase, setPhase] = useState<'in' | 'idle' | 'out'>('in');
  const mounted = useRef(false);

  useEffect(() => {
    if (!show || mounted.current) return;
    mounted.current = true;
    setPhase('in');
  }, [show]);

  const handleEntered = useCallback(() => {
    setPhase('idle');
    setTimeout(() => setPhase('out'), 4200);
  }, []);

  const handleExited = useCallback(() => {
    setTimeout(() => setPhase('in'), 300);
  }, []);

  if (!show) return null;

  return (
    <ScrambleBlock
      lines={['SCROLL', 'DOWN']}
      style={{
        position: 'fixed',
        bottom: '7%',
        right: '4%',
        zIndex: 20,
        textAlign: 'right',
      }}
      fontSize={11}
      phase={phase}
      onEntered={handleEntered}
      onExited={handleExited}
    />
  );
}

// ── NavPills ──────────────────────────────────────────────────────────────────

function NavPills() {
  return (
    <motion.div
      style={{ position: 'absolute', top: 32, left: 32, display: 'flex', flexDirection: 'column', gap: 8, zIndex: 20 }}
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.3 }}
    >
      {['MENU', "LET'S TALK"].map(label => (
        <button key={label} style={{
          background: '#FF3A2D', color: '#000', border: 'none', borderRadius: 999,
          padding: '8px 20px', fontSize: 11, fontWeight: 700, letterSpacing: '0.12em',
          cursor: 'pointer', fontFamily: 'inherit',
        }}>
          {label}
        </button>
      ))}
    </motion.div>
  );
}

// ── ScatteredNumbers ──────────────────────────────────────────────────────────

const NUMBER_DATA = [
  { v: '264', top: '8%',  left: '6%'  }, { v: '300', top: '12%', left: '28%' },
  { v: '345', top: '5%',  left: '52%' }, { v: '370', top: '9%',  left: '74%' },
  { v: '375', top: '15%', left: '88%' }, { v: '241', top: '22%', left: '4%'  },
  { v: '547', top: '28%', left: '32%' }, { v: '460', top: '25%', left: '60%' },
  { v: '552', top: '32%', left: '82%' }, { v: '380', top: '38%', left: '20%' },
  { v: '270', top: '40%', left: '50%' }, { v: '301', top: '42%', left: '70%' },
  { v: '248', top: '48%', left: '8%'  }, { v: '391', top: '50%', left: '42%' },
  { v: '462', top: '52%', left: '88%' }, { v: '189', top: '58%', left: '26%' },
  { v: '520', top: '60%', left: '62%' }, { v: '415', top: '62%', left: '78%' },
  { v: '330', top: '68%', left: '4%'  }, { v: '490', top: '70%', left: '34%' },
  { v: '220', top: '72%', left: '56%' }, { v: '475', top: '75%', left: '90%' },
  { v: '285', top: '80%', left: '16%' }, { v: '395', top: '82%', left: '48%' },
  { v: '510', top: '78%', left: '72%' },
];

function ScatteredNumbers() {
  return (
    <>
      {NUMBER_DATA.map((n, i) => (
        <motion.div key={i} style={{
          position: 'absolute', top: n.top, left: n.left, color: '#FF3A2D',
          fontSize: 10, fontWeight: 500, letterSpacing: '0.05em',
          pointerEvents: 'none', userSelect: 'none', lineHeight: 1,
        }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.28 }}
          transition={{ duration: 0.5, delay: i * 0.03 }}
        >
          {n.v}<sup style={{ fontSize: 7 }}>2</sup>
        </motion.div>
      ))}
    </>
  );
}

// ── OutlineName ───────────────────────────────────────────────────────────────

function OutlineName({ show }: { show: boolean }) {
  return (
    <motion.div style={{
      position: 'absolute', bottom: '2%', left: 0, right: 0,
      pointerEvents: 'none', userSelect: 'none', lineHeight: 0.83, paddingLeft: '2vw',
    }}
      initial={{ y: 50, opacity: 0 }}
      animate={show ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
    >
      {['MICHAEL', 'LOMBARDI'].map(word => (
        <div key={word} style={{
          fontSize: 'clamp(72px, 13vw, 200px)', fontWeight: 700,
          color: 'transparent', WebkitTextStroke: '1.5px #FF3A2D',
          display: 'block', letterSpacing: '-0.02em',
        }}>
          {word}
        </div>
      ))}
    </motion.div>
  );
}

// ── Content ───────────────────────────────────────────────────────────────────

// The two intro lines that appear first in the bottom-left corner
const INTRO_NAME:  string[] = ['Michael Lombardi'];
const INTRO_ROLE:  string[] = ['Growth Systems Architect'];

// Bottom-left corner positions, stacked (role above, name below)
const INTRO_ROLE_STYLE: React.CSSProperties = { bottom: '42%', left: '6%' };
const INTRO_NAME_STYLE: React.CSSProperties = { bottom: '38%', left: '6%' };

// Descriptors that parade one at a time after the name reveals
const PARADE_CONTENT: string[][] = [
  ['Founder / Operator'],
  ['Building Zero to One'],
  ['Former Co-Founder', 'Venture-Backed Startup'],
  ['Creative Operator'],
  ['GTM Architecture'],
  ['Revenue Systems'],
  ['Open to Opportunities'],
];

// 7 positions spread across the upper viewport — each used in rotation
const PARADE_POSITIONS: React.CSSProperties[] = [
  { top: '11%', left: '8%'  },
  { top: '13%', left: '52%' },
  { top: '11%', right: '8%' },
  { top: '30%', left: '22%' },
  { top: '28%', right: '10%'},
  { top: '47%', left: '10%' },
  { top: '47%', right: '14%'},
];

// How long each parade block stays visible before exiting
const SIT_MS = 3800;
// How many ms into the current block's exit the next block starts appearing
const OVERLAP_MS = 500;

// ── HeroSection ───────────────────────────────────────────────────────────────

type IntroState =
  | 'waiting'       // before sequence starts
  | 'name-in'       // "Michael Lombardi" entering
  | 'role-in'       // "Growth Systems Architect" entering
  | 'sitting'       // both visible, reading time
  | 'exiting';      // both scrambling out

interface LiveBlock {
  id: number;
  lines: string[];
  position: React.CSSProperties;
  phase: 'in' | 'idle' | 'out';
}

export default function HeroSection() {
  const [introState, setIntroState] = useState<IntroState>('waiting');
  const [showRole, setShowRole] = useState(false);   // mount GSA block
  const [introMounted, setIntroMounted] = useState(true);
  const [showName, setShowName] = useState(false);
  const [paradeActive, setParadeActive] = useState(false);
  const [liveBlocks, setLiveBlocks] = useState<LiveBlock[]>([]);

  const paradeContent = useRef(0);
  const paradePosition = useRef(0);
  const blockId = useRef(0);
  const introExited = useRef(0);

  // ── Phase 1: kick off intro after a short pause
  useEffect(() => {
    const t = setTimeout(() => setIntroState('name-in'), 600);
    return () => clearTimeout(t);
  }, []);

  // ── "Michael Lombardi" finished entering → wait a beat → start role
  const handleNameEntered = useCallback(() => {
    setTimeout(() => {
      setShowRole(true);
      setIntroState('role-in');
    }, 320);
  }, []);

  // ── "Growth Systems Architect" finished entering → sit, then exit both
  const handleRoleEntered = useCallback(() => {
    setIntroState('sitting');
    setTimeout(() => {
      setIntroState('exiting');
      // 400ms into exit: reveal the big name
      setTimeout(() => setShowName(true), 400);
      // 1400ms after name appears: start parade
      setTimeout(() => setParadeActive(true), 1800);
    }, 2000);
  }, []);

  // ── Track when both intro blocks have finished exiting so we can unmount them
  const handleIntroExited = useCallback(() => {
    introExited.current += 1;
    if (introExited.current >= 2) setIntroMounted(false);
  }, []);

  // ── Parade: spawn one block at a time ─────────────────────────────────────

  const spawnBlock = useCallback(() => {
    const id = ++blockId.current;
    const ci = paradeContent.current++ % PARADE_CONTENT.length;
    const pi = paradePosition.current++ % PARADE_POSITIONS.length;
    setLiveBlocks(prev => [...prev, {
      id, lines: PARADE_CONTENT[ci], position: PARADE_POSITIONS[pi], phase: 'in',
    }]);
  }, []);

  useEffect(() => {
    if (paradeActive) spawnBlock();
  }, [paradeActive, spawnBlock]);

  const handleBlockEntered = useCallback((id: number) => {
    // Move to idle (visible, holding)
    setLiveBlocks(prev => prev.map(b => b.id === id ? { ...b, phase: 'idle' } : b));
    // After sit time: start exit AND overlap-spawn next block
    setTimeout(() => {
      setLiveBlocks(prev => prev.map(b => b.id === id ? { ...b, phase: 'out' } : b));
      setTimeout(spawnBlock, OVERLAP_MS);
    }, SIT_MS);
  }, [spawnBlock]);

  const handleBlockExited = useCallback((id: number) => {
    setLiveBlocks(prev => prev.filter(b => b.id !== id));
  }, []);

  // ── Derive intro block phases ─────────────────────────────────────────────

  const namePhase = (): 'in' | 'idle' | 'out' => {
    if (introState === 'name-in') return 'in';
    if (introState === 'exiting') return 'out';
    return 'idle';
  };

  const rolePhase = (): 'in' | 'idle' | 'out' => {
    if (introState === 'role-in') return 'in';
    if (introState === 'exiting') return 'out';
    return 'idle';
  };

  return (
    <div style={{
      position: 'relative', width: '100vw', height: '100vh',
      background: '#000000', overflow: 'hidden',
      fontFamily: "'General Sans', sans-serif",
    }}>
      <MouseSmoke />
      <ScatteredNumbers />
      <NavPills />
      <ScrollIndicator show={showName} />

      {/* ── Intro: name + role in bottom-left corner ── */}
      {introMounted && (
        <>
          <ScrambleBlock
            lines={INTRO_NAME}
            style={INTRO_NAME_STYLE}
            phase={namePhase()}
            onEntered={handleNameEntered}
            onExited={handleIntroExited}
          />
          {showRole && (
            <ScrambleBlock
              lines={INTRO_ROLE}
              style={INTRO_ROLE_STYLE}
              phase={rolePhase()}
              onEntered={handleRoleEntered}
              onExited={handleIntroExited}
            />
          )}
        </>
      )}

      {/* ── Parade: one descriptor at a time, scattered positions ── */}
      {liveBlocks.map(block => (
        <ScrambleBlock
          key={block.id}
          lines={block.lines}
          style={block.position}
          phase={block.phase}
          onEntered={() => handleBlockEntered(block.id)}
          onExited={() => handleBlockExited(block.id)}
        />
      ))}

      <OutlineName show={showName} />
    </div>
  );
}
