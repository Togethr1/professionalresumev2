import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

// ── Color tokens ─────────────────────────────────────────────────────────────
// - INK:    primary typography (warm off-white, tinted toward the accent hue)
// - ACCENT: red, reserved for structural elements and small callouts
// - MUTED:  dim ink for secondary copy

const INK = '#F5EFE8';
const ACCENT = '#FF3A2D';

// ── Content ──────────────────────────────────────────────────────────────────

// Proof cards — a single rotating slot on the right side. Each card is a
// three-part composition: big number, descriptor, attribution. Together they
// prove range without a list.

interface ProofCard {
  metric: string;
  descriptor: string;
  attribution: string;
}

const PROOF_CARDS: ProofCard[] = [
  { metric: '$2M',  descriptor: 'Pre-seed raised',        attribution: 'Fansub · Atento Capital · 2022' },
  { metric: '30K',  descriptor: 'Festival attendees',     attribution: 'Produced end-to-end · 2023' },
  { metric: '×3',   descriptor: "President\u2019s Club",  attribution: 'PHMG · Senior SDR, Team Lead' },
  { metric: '104%', descriptor: 'Q1 quota attainment',    attribution: 'ServiceTitan · SMB Trades' },
  { metric: '50K',  descriptor: 'Users on platform',      attribution: 'Fansub · creator economy' },
  { metric: '38%',  descriptor: 'Conversion lift',        attribution: 'Enertia Studios · med spa client' },
  { metric: '4×',   descriptor: 'ROAS on $100K+ spend',   attribution: '720 Digital · 2019\u20132020' },
  { metric: '75%',  descriptor: 'Renewal rate',           attribution: 'Scripted · $500K enterprise book' },
];

// ── Background wash: three drifting red orbs create ambient color temperature
// Each orb animates on its own cycle (28s / 34s / 42s) so the pattern never
// repeats — slow enough to feel atmospheric, not distracting. Inset -12%
// gives the drift room so hard edges never appear at the viewport boundary.

function BackgroundWash() {
  return (
    <div
      aria-hidden
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      <motion.div
        animate={{ x: [0, 80, -40, 0], y: [0, -60, 40, 0] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          inset: '-12%',
          background:
            'radial-gradient(ellipse 44% 32% at 18% 32%, rgba(255, 58, 45, 0.18) 0%, transparent 60%)',
        }}
      />
      <motion.div
        animate={{ x: [0, -60, 40, 0], y: [0, 50, -30, 0] }}
        transition={{ duration: 34, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          inset: '-12%',
          background:
            'radial-gradient(ellipse 38% 28% at 82% 78%, rgba(255, 58, 45, 0.13) 0%, transparent 62%)',
        }}
      />
      <motion.div
        animate={{ x: [0, 40, -30, 0], y: [0, 30, -20, 0] }}
        transition={{ duration: 42, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          inset: '-12%',
          background:
            'radial-gradient(ellipse 50% 34% at 50% 102%, rgba(255, 58, 45, 0.09) 0%, transparent 65%)',
        }}
      />
    </div>
  );
}

// ── Film grain overlay — red-tinted, layered on warm base ────────────────────

const GRAIN_URL = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix type='matrix' values='0 0 0 0 1  0 0 0 0 0.42  0 0 0 0 0.36  0 0 0 0.28 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")`;

function GrainOverlay() {
  return (
    <div
      aria-hidden
      style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: GRAIN_URL,
        backgroundSize: '300px 300px',
        mixBlendMode: 'screen',
        opacity: 0.38,
        pointerEvents: 'none',
        zIndex: 1,
      }}
    />
  );
}

// ── Corner marks ─────────────────────────────────────────────────────────────

function CornerMark({ position }: { position: 'tl' | 'tr' | 'bl' | 'br' }) {
  const size = 22;
  const color = 'rgba(255, 58, 45, 0.4)';
  const inset = 28;

  const base: React.CSSProperties = {
    position: 'absolute',
    width: size,
    height: size,
    pointerEvents: 'none',
    zIndex: 6,
  };

  const lines: Record<typeof position, React.CSSProperties> = {
    tl: { top: inset, left: inset, borderTop: `1px solid ${color}`, borderLeft: `1px solid ${color}` },
    tr: { top: inset, right: inset, borderTop: `1px solid ${color}`, borderRight: `1px solid ${color}` },
    bl: { bottom: inset, left: inset, borderBottom: `1px solid ${color}`, borderLeft: `1px solid ${color}` },
    br: { bottom: inset, right: inset, borderBottom: `1px solid ${color}`, borderRight: `1px solid ${color}` },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      style={{ ...base, ...lines[position] }}
    />
  );
}

// ── Nav pills ────────────────────────────────────────────────────────────────

function NavPills() {
  return (
    <motion.div
      style={{
        position: 'absolute',
        top: 48,
        left: 60,
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        zIndex: 20,
      }}
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
    >
      {['MENU', "LET\u2019S TALK"].map(label => (
        <button
          key={label}
          style={{
            background: ACCENT,
            color: '#000',
            border: 'none',
            borderRadius: 999,
            padding: '9px 22px',
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.14em',
            cursor: 'pointer',
            fontFamily: 'inherit',
          }}
        >
          {label}
        </button>
      ))}
    </motion.div>
  );
}

// ── MaskReveal ───────────────────────────────────────────────────────────────

function MaskReveal({
  children,
  delay = 0,
  duration = 0.9,
}: {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
}) {
  return (
    <div style={{ overflow: 'hidden', lineHeight: 1 }}>
      <motion.div
        initial={{ y: '110%' }}
        animate={{ y: 0 }}
        transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}

// ── ThesisBlock — editorial voice, primary on the right column ───────────────
// Short dek that establishes voice and positioning. Role words are red+bold
// inline — the magazine pull-quote pattern, where accent color punches
// individual nouns inside a warm-white paragraph.

const ROLES: string[] = [
  'Founder',
  'CMO',
  'Head of Strategic Relations',
  'AI Solutions Architect',
  'Enterprise Account Manager',
  'Team Lead',
];

function ThesisBlock() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
      style={{ marginBottom: 72 }}
    >
      {/* Editorial paragraph — setup line + inline red-bold role names */}
      <p
        style={{
          margin: 0,
          color: INK,
          fontSize: 'clamp(22px, 2vw, 32px)',
          fontWeight: 500,
          letterSpacing: '-0.005em',
          lineHeight: 1.4,
          opacity: 0.92,
          marginBottom: 32,
        }}
      >
        Five years operating every side of every org.{' '}
        {ROLES.map((role, i) => (
          <span key={role}>
            <span style={{ color: '#FFFFFF', fontWeight: 700 }}>{role}.</span>
            {i < ROLES.length - 1 ? ' ' : ''}
          </span>
        ))}
      </p>

      {/* Punchline */}
      <div
        style={{
          color: ACCENT,
          fontSize: 'clamp(22px, 2vw, 32px)',
          fontWeight: 700,
          letterSpacing: '-0.005em',
          lineHeight: 1.2,
        }}
      >
        Operator. Builder. Orchestrator.
      </div>
    </motion.div>
  );
}

// ── ProofCardRotator — secondary block below thesis ──────────────────────────
// Scaled down from its earlier "hero-weight" size to read as supporting
// evidence beneath the thesis. Still rotates every 7.5s.

function ProofCardRotator({
  pool,
  interval = 7500,
  delay = 1.4,
}: {
  pool: ProofCard[];
  interval?: number;
  delay?: number;
}) {
  const [index, setIndex] = useState(0);
  const [active, setActive] = useState(false);
  const total = pool.length;

  useEffect(() => {
    const id = setTimeout(() => setActive(true), delay * 1000);
    return () => clearTimeout(id);
  }, [delay]);

  useEffect(() => {
    if (!active) return;
    const id = setInterval(() => setIndex(i => (i + 1) % total), interval);
    return () => clearInterval(id);
  }, [active, interval, total]);

  const current = pool[index];

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{ width: '100%' }}
    >
      {/* Header rule + label (compact) */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          marginBottom: 22,
        }}
      >
        <span
          style={{
            width: 24,
            height: 1,
            background: ACCENT,
            opacity: 0.75,
          }}
        />
        <span
          style={{
            color: ACCENT,
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            opacity: 0.8,
          }}
        >
          Proof / {String(index + 1).padStart(2, '0')}
          <span style={{ opacity: 0.4 }}> / {String(total).padStart(2, '0')}</span>
        </span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={current.metric + current.descriptor}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Compact two-column: metric on left, copy on right */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'auto 1fr',
              gap: '0 24px',
              alignItems: 'baseline',
            }}
          >
            <div
              style={{
                color: INK,
                fontSize: 'clamp(40px, 4.6vw, 72px)',
                fontWeight: 700,
                letterSpacing: '-0.03em',
                lineHeight: 0.95,
                fontVariantNumeric: 'tabular-nums',
              }}
            >
              {current.metric}
            </div>
            <div>
              <div
                style={{
                  color: INK,
                  fontSize: 'clamp(15px, 1.35vw, 20px)',
                  fontWeight: 500,
                  letterSpacing: '0.01em',
                  lineHeight: 1.3,
                  opacity: 0.88,
                  marginBottom: 6,
                }}
              >
                {current.descriptor}
              </div>
              <div
                style={{
                  color: ACCENT,
                  fontSize: 'clamp(10px, 0.85vw, 12px)',
                  fontWeight: 600,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  opacity: 0.7,
                  lineHeight: 1.5,
                }}
              >
                {current.attribution}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Progress dots */}
      <div
        style={{
          marginTop: 28,
          display: 'flex',
          gap: 5,
        }}
      >
        {pool.map((_, i) => (
          <div
            key={i}
            style={{
              width: i === index ? 16 : 5,
              height: 2,
              background: ACCENT,
              opacity: i === index ? 0.85 : 0.25,
              transition: 'width 0.4s ease, opacity 0.4s ease',
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}

// ── Vertical rule ────────────────────────────────────────────────────────────

function VerticalRule() {
  return (
    <motion.div
      initial={{ opacity: 0, scaleY: 0 }}
      animate={{ opacity: 0.14, scaleY: 1 }}
      transition={{ duration: 1.1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'absolute',
        top: '22%',
        bottom: '22%',
        left: '54%',
        width: 1,
        background: ACCENT,
        transformOrigin: 'top center',
        zIndex: 3,
        pointerEvents: 'none',
      }}
    />
  );
}

// ── Colophon (bottom) ────────────────────────────────────────────────────────

function Colophon() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.65 }}
      transition={{ duration: 0.8, delay: 1.5 }}
      style={{
        position: 'absolute',
        bottom: 56,
        left: 60,
        right: 60,
        display: 'flex',
        alignItems: 'center',
        gap: 20,
        zIndex: 10,
        pointerEvents: 'none',
      }}
    >
      <span
        style={{
          color: ACCENT,
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: '0.24em',
          textTransform: 'uppercase',
          fontVariantNumeric: 'tabular-nums',
          flexShrink: 0,
        }}
      >
        VOL.03 / ED.01
      </span>
      <span
        style={{
          flex: 1,
          height: 1,
          background: 'linear-gradient(90deg, rgba(255,58,45,0.4) 0%, rgba(255,58,45,0.1) 100%)',
        }}
      />
      <span
        style={{
          color: INK,
          fontSize: 15,
          fontWeight: 700,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          opacity: 0.85,
          flexShrink: 0,
        }}
      >
        ARCHITECTING GROWTH SYSTEMS
      </span>
      <span
        style={{
          flex: 1,
          height: 1,
          background: 'linear-gradient(90deg, rgba(255,58,45,0.1) 0%, rgba(255,58,45,0.4) 100%)',
        }}
      />
      <span
        style={{
          color: ACCENT,
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: '0.24em',
          textTransform: 'uppercase',
          flexShrink: 0,
        }}
      >
        CHICAGO · TULSA · LA
      </span>
    </motion.div>
  );
}

// ── ScrollCue ────────────────────────────────────────────────────────────────

function ScrollCue() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.72 }}
      transition={{ duration: 0.6, delay: 1.7, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'absolute',
        bottom: 96,
        right: 60,
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        zIndex: 10,
        pointerEvents: 'none',
      }}
    >
      <span
        style={{
          color: INK,
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: '0.24em',
          textTransform: 'uppercase',
          opacity: 0.8,
        }}
      >
        EXPERIENCE
      </span>
      <motion.span
        animate={{ y: [0, 4, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        style={{ color: ACCENT, fontSize: 14, lineHeight: 1 }}
      >
        ↓
      </motion.span>
    </motion.div>
  );
}

// ── HeroSection ──────────────────────────────────────────────────────────────

export default function HeroSection() {
  return (
    <section
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        background: '#000000',
        overflow: 'hidden',
        fontFamily: "'General Sans', sans-serif",
      }}
    >
      {/* Ambient red wash — warms the surface */}
      <BackgroundWash />

      {/* Frame */}
      <CornerMark position="tl" />
      <CornerMark position="tr" />
      <CornerMark position="bl" />
      <CornerMark position="br" />

      {/* Material */}
      <GrainOverlay />

      {/* Spine */}
      <VerticalRule />

      {/* Chrome */}
      <NavPills />

      {/* Primary composition: LEFT = identity, RIGHT = proof */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '6vw',
          right: '6vw',
          transform: 'translateY(-50%)',
          display: 'grid',
          gridTemplateColumns: '1fr 0.55fr',
          gap: '6vw',
          alignItems: 'start',
          zIndex: 5,
        }}
      >
        {/* LEFT — identity block */}
        <div style={{ paddingTop: 20 }}>
          {/* Name — warm off-white */}
          <div
            style={{
              fontSize: 'clamp(64px, 10.5vw, 192px)',
              fontWeight: 700,
              color: INK,
              letterSpacing: '-0.035em',
              lineHeight: 0.92,
              marginBottom: 28,
            }}
          >
            <MaskReveal delay={0.5}>
              <div>MICHAEL</div>
            </MaskReveal>
            <MaskReveal delay={0.63}>
              <div>LOMBARDI</div>
            </MaskReveal>
          </div>

          {/* Role — white with pulsing red dot + italic accent */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.05, ease: [0.16, 1, 0.3, 1] }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              flexWrap: 'wrap',
            }}
          >
            <motion.span
              animate={{ opacity: [1, 0.35, 1] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                background: ACCENT,
                flexShrink: 0,
              }}
            />
            <span
              style={{
                color: INK,
                fontSize: 'clamp(22px, 2.2vw, 34px)',
                fontWeight: 600,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                opacity: 0.92,
              }}
            >
              Growth Systems Architect
            </span>
            <span
              style={{
                color: INK,
                fontSize: 'clamp(18px, 1.7vw, 26px)',
                fontWeight: 400,
                fontStyle: 'italic',
                letterSpacing: '0.02em',
                opacity: 0.45,
              }}
            >
              — operator, founder, builder.
            </span>
          </motion.div>
        </div>

        {/* RIGHT — editorial thesis (primary) + rotating proof card (secondary) */}
        <div style={{ paddingTop: 16 }}>
          <ThesisBlock />
          <ProofCardRotator pool={PROOF_CARDS} />
        </div>
      </div>

      <ScrollCue />
      <Colophon />
    </section>
  );
}
