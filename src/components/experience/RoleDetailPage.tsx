import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'motion/react';
import type { Experience, Act, PageVariant } from './types';

// ── Variant config ────────────────────────────────────────────────────────────

const VARIANT: Record<PageVariant, {
  dur: number;
  stagger: number;
  spacing: number;
  statsFirst: boolean;
  storyColumns: number;
}> = {
  kinetic:   { dur: 0.28, stagger: 0.04, spacing: 56,  statsFirst: true,  storyColumns: 1 },
  narrative: { dur: 0.72, stagger: 0.12, spacing: 88,  statsFirst: false, storyColumns: 1 },
  system:    { dur: 0.44, stagger: 0.06, spacing: 64,  statsFirst: false, storyColumns: 2 },
  creative:  { dur: 0.58, stagger: 0.09, spacing: 80,  statsFirst: false, storyColumns: 1 },
};

// ── Reveal ────────────────────────────────────────────────────────────────────

function Reveal({ children, delay = 0, duration = 0.5, y = 20 }: {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  y?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

// ── Divider ───────────────────────────────────────────────────────────────────

function Divider({ spacing }: { spacing: number }) {
  return (
    <div style={{
      height: 1,
      background: 'rgba(255, 58, 45, 0.12)',
      marginBottom: spacing,
      marginTop: spacing,
    }} />
  );
}

// ── StatItem / StatBlock ──────────────────────────────────────────────────────

function StatItem({ value, label, delay, dur }: {
  value: string;
  label: string;
  delay: number;
  dur: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: dur, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{ borderTop: '1px solid rgba(255, 58, 45, 0.18)', paddingTop: 20 }}
    >
      <div style={{
        fontSize: 'clamp(22px, 3vw, 44px)',
        fontWeight: 700,
        color: '#FF3A2D',
        letterSpacing: '-0.02em',
        lineHeight: 1,
        marginBottom: 10,
      }}>
        {value}
      </div>
      <div style={{
        fontSize: 10,
        color: '#FF3A2D',
        opacity: 0.42,
        letterSpacing: '0.16em',
        textTransform: 'uppercase',
        fontWeight: 600,
        lineHeight: 1.5,
      }}>
        {label}
      </div>
    </motion.div>
  );
}

function StatBlock({ stats, dur, stagger }: {
  stats: Experience['stats'];
  dur: number;
  stagger: number;
}) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: `repeat(${Math.min(stats.length, 4)}, 1fr)`,
      gap: '0 4vw',
    }}>
      {stats.map((s, i) => (
        <StatItem key={i} value={s.value} label={s.label} delay={i * stagger} dur={dur} />
      ))}
    </div>
  );
}

// ── ExpandableMoment ──────────────────────────────────────────────────────────

function ExpandableMoment({ moment, index, dur }: {
  moment: Experience['moments'][number];
  index: number;
  dur: number;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 14 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: dur, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      style={{ borderTop: '1px solid rgba(255, 58, 45, 0.1)' }}
    >
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%',
          display: 'grid',
          gridTemplateColumns: '44px 1fr 40px',
          gap: '0 2vw',
          alignItems: 'start',
          padding: '28px 0',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          fontFamily: 'inherit',
          textAlign: 'left',
        }}
      >
        <span style={{
          color: '#FF3A2D',
          opacity: 0.25,
          fontSize: 10,
          fontWeight: 500,
          letterSpacing: '0.14em',
          fontVariantNumeric: 'tabular-nums',
          paddingTop: 4,
        }}>
          {String(index + 1).padStart(2, '0')}
        </span>

        <div>
          <div style={{
            color: '#FF3A2D',
            fontSize: 'clamp(16px, 1.8vw, 26px)',
            fontWeight: 700,
            letterSpacing: '-0.01em',
            marginBottom: 6,
            lineHeight: 1.1,
          }}>
            {moment.title}
          </div>
          <div style={{
            color: '#FF3A2D',
            fontSize: 12,
            opacity: 0.42,
            letterSpacing: '0.04em',
            lineHeight: 1.55,
            fontStyle: 'italic',
          }}>
            {moment.teaser}
          </div>
        </div>

        <motion.div
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{
            color: '#FF3A2D',
            fontSize: 22,
            opacity: open ? 0.8 : 0.35,
            lineHeight: 1,
            paddingTop: 2,
            userSelect: 'none',
          }}
        >
          +
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 320, damping: 32 }}
            style={{ overflow: 'hidden' }}
          >
            <p style={{
              color: 'rgba(255, 255, 255, 0.68)',
              fontSize: 'clamp(14px, 1.3vw, 17px)',
              lineHeight: 1.85,
              paddingBottom: 32,
              paddingLeft: 'calc(44px + 2vw)',
              margin: 0,
              letterSpacing: '0.01em',
            }}>
              {moment.body}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ── RoleDetailPage ────────────────────────────────────────────────────────────

export default function RoleDetailPage({ exp, act, onBack }: {
  exp: Experience;
  act: Act;
  onBack: () => void;
}) {
  const cfg = VARIANT[exp.pageVariant];

  // Lock body scroll while detail is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  // ESC to close
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onBack(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onBack]);

  const statBlock = (
    <StatBlock stats={exp.stats} dur={cfg.dur} stagger={cfg.stagger} />
  );

  return (
    <motion.div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        background: '#000000',
        overflowY: 'auto',
        fontFamily: "'General Sans', sans-serif",
      }}
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ type: 'spring', stiffness: 260, damping: 32 }}
    >
      {/* ── Fixed back button ── */}
      <button
        onClick={onBack}
        style={{
          position: 'fixed',
          top: 36,
          left: 44,
          zIndex: 10,
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: '#FF3A2D',
          fontFamily: 'inherit',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          opacity: 0.55,
          padding: 0,
          transition: 'opacity 0.15s',
        }}
        onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
        onMouseLeave={e => (e.currentTarget.style.opacity = '0.55')}
      >
        <span style={{ fontSize: 14 }}>←</span> BACK
      </button>

      {/* ── Page content ── */}
      <div style={{
        padding: '110px 6vw 160px',
        textAlign: 'center',
      }}>

        {/* ── Header ── */}
        <div style={{ marginBottom: cfg.spacing }}>

          {/* Company + year */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: cfg.dur, delay: cfg.dur * 0.3 }}
            style={{
              color: '#FF3A2D',
              fontSize: 'clamp(16px, 1.4vw, 22px)',
              fontWeight: 600,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              opacity: 0.55,
              marginBottom: 24,
            }}
          >
            {exp.company} · {exp.year}
          </motion.div>

          {/* Role — viewport-filling H1 */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: cfg.dur * 1.6, delay: cfg.dur * 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontSize: 'clamp(56px, 11.5vw, 220px)',
              fontWeight: 700,
              color: '#FF3A2D',
              letterSpacing: '-0.04em',
              lineHeight: 1.05,
              marginBottom: cfg.spacing * 0.65,
            }}
          >
            {exp.role}
          </motion.div>

          {/* Skills tags — directly under H1 */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: cfg.dur, delay: cfg.dur * 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center', marginBottom: cfg.spacing * 0.6 }}
          >
            {exp.skills.map(skill => (
              <span key={skill} style={{
                color: '#FF3A2D',
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                border: '1px solid rgba(255, 58, 45, 0.3)',
                padding: '10px 22px',
                opacity: 0.7,
              }}>
                {skill}
              </span>
            ))}
          </motion.div>

          {/* Hook — the opening statement */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: cfg.dur, delay: cfg.dur * 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontSize: 'clamp(18px, 1.8vw, 26px)',
              color: 'rgba(255, 255, 255, 0.52)',
              fontWeight: 400,
              lineHeight: 1.3,
              letterSpacing: '0.01em',
              fontStyle: 'italic',
            }}
          >
            "{exp.hook}"
          </motion.div>
        </div>

        <Divider spacing={0} />
        <div style={{ height: cfg.spacing }} />

        {/* ── Stats (kinetic: before story) ── */}
        {cfg.statsFirst && (
          <>
            {statBlock}
            <Divider spacing={cfg.spacing} />
          </>
        )}

        {/* ── Story ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: cfg.storyColumns === 2 ? '1fr 1fr' : '1fr',
          gap: cfg.storyColumns === 2 ? '0 5vw' : 0,
          maxWidth: cfg.storyColumns === 1 ? '68vw' : '100%',
          margin: `0 auto ${cfg.spacing}px`,
          textAlign: 'left',
        }}>
          {exp.story.map((para, i) => (
            <Reveal key={i} delay={i * cfg.stagger} duration={cfg.dur} y={16}>
              <p style={{
                color: 'rgba(255, 255, 255, 0.68)',
                fontSize: 'clamp(17px, 1.55vw, 22px)',
                lineHeight: 1.85,
                fontWeight: 400,
                letterSpacing: '0.01em',
                margin: '0 0 28px',
              }}>
                {para}
              </p>
            </Reveal>
          ))}
        </div>

        {/* ── Stats (non-kinetic: after story) ── */}
        {!cfg.statsFirst && (
          <>
            <Divider spacing={0} />
            <div style={{ height: cfg.spacing }} />
            {statBlock}
          </>
        )}

        <Divider spacing={cfg.spacing} />

        {/* ── Key moments ── */}
        <Reveal duration={cfg.dur}>
          <div style={{
            color: '#FF3A2D',
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: '0.24em',
            textTransform: 'uppercase',
            opacity: 0.38,
            marginBottom: 4,
          }}>
            Key Moments
          </div>
        </Reveal>

        <div style={{ marginBottom: cfg.spacing }}>
          {exp.moments.map((moment, i) => (
            <ExpandableMoment key={i} moment={moment} index={i} dur={cfg.dur} />
          ))}
          <div style={{ borderTop: '1px solid rgba(255, 58, 45, 0.1)' }} />
        </div>


      </div>
    </motion.div>
  );
}
