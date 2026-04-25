import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'motion/react';
import type { Experience, Act, PageVariant, DetailSection, SkillCategory, Exhibit, Moment, OrgBrief } from './types';

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

// Color tokens matching the hero design system
const INK = '#F5EFE8';
const ACCENT = '#FF3A2D';

function StatItem({ value, label, index, total, delay, dur }: {
  value: string;
  label: string;
  index: number;
  total: number;
  delay: number;
  dur: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const isLast = index === total - 1;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: dur, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{
        paddingLeft: index === 0 ? 0 : '2vw',
        paddingRight: isLast ? 0 : '2vw',
        borderRight: isLast ? 'none' : '1px solid rgba(255, 58, 45, 0.18)',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 14,
      }}
    >
      {/* Number marker */}
      <div
        style={{
          color: ACCENT,
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: '0.26em',
          textTransform: 'uppercase',
          opacity: 0.55,
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {String(index + 1).padStart(2, '0')}
        <span style={{ opacity: 0.4 }}> / {String(total).padStart(2, '0')}</span>
      </div>

      {/* Value — warm white, dominant */}
      <div
        style={{
          fontSize: 'clamp(28px, 3.4vw, 54px)',
          fontWeight: 700,
          color: INK,
          letterSpacing: '-0.02em',
          lineHeight: 1,
          fontVariantNumeric: 'tabular-nums',
          whiteSpace: 'nowrap',
        }}
      >
        {value}
      </div>

      {/* Label — red, small caps, always on one line */}
      <div
        style={{
          fontSize: 'clamp(9px, 0.72vw, 11px)',
          color: ACCENT,
          opacity: 0.7,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          fontWeight: 600,
          lineHeight: 1.4,
          whiteSpace: 'nowrap',
        }}
      >
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
  const cols = Math.min(stats.length, 4);

  return (
    <div>
      {/* Single architectural rule spanning the whole grid */}
      <div
        style={{
          height: 1,
          background:
            'linear-gradient(90deg, rgba(255,58,45,0.45) 0%, rgba(255,58,45,0.18) 50%, rgba(255,58,45,0.05) 100%)',
          marginBottom: 32,
        }}
      />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          alignItems: 'start',
        }}
      >
        {stats.map((s, i) => (
          <StatItem
            key={i}
            value={s.value}
            label={s.label}
            index={i}
            total={stats.length}
            delay={i * stagger}
            dur={dur}
          />
        ))}
      </div>
    </div>
  );
}

// ── ExpandableMoment ──────────────────────────────────────────────────────────

function ExpandableMoment({ moment, index, dur }: {
  moment: Moment;
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

// ── Section blocks ────────────────────────────────────────────────────────────
// Each section is a self-contained block with its own header label and
// internal layout. RoleDetailPage picks the right block per section kind.

function SectionLabel({ text }: { text: string }) {
  return (
    <Reveal duration={0.5}>
      <div
        style={{
          color: ACCENT,
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: '0.24em',
          textTransform: 'uppercase',
          opacity: 0.42,
          marginBottom: 24,
        }}
      >
        {text}
      </div>
    </Reveal>
  );
}

function MomentsBlock({
  title,
  moments,
  dur,
}: {
  title: string;
  moments: Moment[];
  dur: number;
}) {
  return (
    <div>
      <SectionLabel text={title} />
      <div>
        {moments.map((moment, i) => (
          <ExpandableMoment key={i} moment={moment} index={i} dur={dur} />
        ))}
        <div style={{ borderTop: '1px solid rgba(255, 58, 45, 0.1)' }} />
      </div>
    </div>
  );
}

function SkillCategoryColumn({
  category,
  index,
  total,
  dur,
}: {
  category: SkillCategory;
  index: number;
  total: number;
  dur: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const isLast = index === total - 1;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: dur, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      style={{
        paddingLeft: index === 0 ? 0 : '2.5vw',
        paddingRight: isLast ? 0 : '2.5vw',
        borderRight: isLast ? 'none' : '1px solid rgba(255, 58, 45, 0.12)',
      }}
    >
      {/* Category name */}
      <div
        style={{
          color: ACCENT,
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: '0.24em',
          textTransform: 'uppercase',
          opacity: 0.72,
          marginBottom: 36,
        }}
      >
        {category.name}
      </div>

      {/* Entries — rendering depends on category kind */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: category.kind === 'stats' ? 32 : 28,
        }}
      >
        {category.entries.map((entry, i) => (
          <motion.div
            key={entry.name}
            initial={{ opacity: 0, y: 8 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: dur * 0.8, delay: index * 0.08 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
          >
            {category.kind === 'stats' ? (
              <>
                <div
                  style={{
                    color: INK,
                    fontSize: 'clamp(26px, 2.6vw, 40px)',
                    fontWeight: 700,
                    letterSpacing: '-0.02em',
                    lineHeight: 1,
                    fontVariantNumeric: 'tabular-nums',
                    marginBottom: 8,
                  }}
                >
                  {entry.name}
                </div>
                <div
                  style={{
                    color: ACCENT,
                    fontSize: 10,
                    fontWeight: 600,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    opacity: 0.72,
                    lineHeight: 1.5,
                  }}
                >
                  {entry.description}
                </div>
              </>
            ) : (
              <>
                <div
                  style={{
                    color: INK,
                    fontSize: 'clamp(16px, 1.35vw, 20px)',
                    fontWeight: 600,
                    letterSpacing: '-0.005em',
                    lineHeight: 1.3,
                    marginBottom: 8,
                  }}
                >
                  {entry.name}
                </div>
                <div
                  style={{
                    color: 'rgba(255, 255, 255, 0.5)',
                    fontSize: 'clamp(13px, 1vw, 15px)',
                    fontWeight: 400,
                    lineHeight: 1.6,
                    letterSpacing: '0.005em',
                  }}
                >
                  {entry.description}
                </div>
              </>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function SkillsBlock({
  title,
  categories,
  dur,
}: {
  title: string;
  categories: SkillCategory[];
  dur: number;
}) {
  return (
    <div>
      <SectionLabel text={title} />

      {/* Architectural gradient rule (matches StatBlock) */}
      <div
        style={{
          height: 1,
          background:
            'linear-gradient(90deg, rgba(255,58,45,0.45) 0%, rgba(255,58,45,0.18) 50%, rgba(255,58,45,0.05) 100%)',
          marginBottom: 40,
        }}
      />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${categories.length}, 1fr)`,
          alignItems: 'start',
        }}
      >
        {categories.map((category, i) => (
          <SkillCategoryColumn
            key={category.name}
            category={category}
            index={i}
            total={categories.length}
            dur={dur}
          />
        ))}
      </div>
    </div>
  );
}

// ── StoryFigure ───────────────────────────────────────────────────────────────
// Inline figure that renders between story paragraphs. Breaks out wider than
// the story column for editorial weight. Framed with small label above and
// caption below.

function StoryFigure({
  figure,
  dur,
}: {
  figure: NonNullable<Experience['storyFigure']>;
  dur: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.figure
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: dur * 1.3, ease: [0.16, 1, 0.3, 1] }}
      style={{
        margin: '64px auto 72px',
        maxWidth: '85vw',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          color: ACCENT,
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: '0.32em',
          textTransform: 'uppercase',
          opacity: 0.55,
          marginBottom: 18,
        }}
      >
        {figure.label}
      </div>

      <img
        src={figure.src}
        alt={figure.alt}
        style={{
          display: 'block',
          margin: '0 auto',
          maxWidth: '100%',
          maxHeight: '90vh',
          width: 'auto',
          height: 'auto',
          background: 'transparent',
        }}
      />

      <figcaption
        style={{
          marginTop: 18,
          color: ACCENT,
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          opacity: 0.65,
          lineHeight: 1.5,
        }}
      >
        {figure.caption}
      </figcaption>
    </motion.figure>
  );
}

function ExhibitsBlock({
  title,
  items,
  dur,
}: {
  title: string;
  items: Exhibit[];
  dur: number;
}) {
  return (
    <div>
      <SectionLabel text={title} />
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${Math.min(items.length, 2)}, 1fr)`,
          gap: '2.5vw',
        }}
      >
        {items.map((item, i) => (
          <motion.figure
            key={item.src}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: dur, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            style={{ margin: 0 }}
          >
            <div
              style={{
                border: '1px solid rgba(255, 58, 45, 0.22)',
                background: '#000',
                overflow: 'hidden',
              }}
            >
              <img
                src={item.src}
                alt={item.alt}
                style={{ width: '100%', height: 'auto', display: 'block', filter: 'contrast(1.05) brightness(0.92)' }}
              />
            </div>
            <figcaption
              style={{
                marginTop: 12,
                color: ACCENT,
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                opacity: 0.6,
              }}
            >
              {item.caption}
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </div>
  );
}

// ── OrgBriefBlock ─────────────────────────────────────────────────────────────
// Structured company context rendered in the detail page hero area,
// between the hook quote and the stats grid. Editorial magazine-sidebar feel.

function OrgBriefBlock({ brief, dur }: { brief: OrgBrief; dur: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: dur, ease: [0.16, 1, 0.3, 1] }}
      style={{
        maxWidth: '68vw',
        margin: '0 auto',
        textAlign: 'center',
      }}
    >
      {/* Rule + label */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 14,
          marginBottom: 28,
          justifyContent: 'center',
        }}
      >
        <span style={{ width: 28, height: 1, background: ACCENT, opacity: 0.55 }} />
        <span
          style={{
            color: ACCENT,
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            opacity: 0.55,
          }}
        >
          The Org
        </span>
        <span style={{ width: 28, height: 1, background: ACCENT, opacity: 0.55 }} />
      </div>

      {/* Tagline — italic, warm white (optional) */}
      {brief.tagline && (
        <div
          style={{
            color: INK,
            fontSize: 'clamp(18px, 1.7vw, 26px)',
            fontWeight: 400,
            fontStyle: 'italic',
            letterSpacing: '0.005em',
            lineHeight: 1.3,
            opacity: 0.85,
            marginBottom: 44,
          }}
        >
          {brief.tagline}
        </div>
      )}

      {/* Data grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${brief.data.length}, 1fr)`,
          gap: 0,
          borderTop: '1px solid rgba(255, 58, 45, 0.22)',
          paddingTop: 24,
        }}
      >
        {brief.data.map((d, i) => {
          const isLast = i === brief.data.length - 1;
          return (
            <div
              key={d.label}
              style={{
                paddingLeft: i === 0 ? 0 : '1.5vw',
                paddingRight: isLast ? 0 : '1.5vw',
                borderRight: isLast ? 'none' : '1px solid rgba(255, 58, 45, 0.14)',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
              }}
            >
              <div
                style={{
                  color: ACCENT,
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  opacity: 0.85,
                }}
              >
                {d.label}
              </div>
              <div
                style={{
                  color: INK,
                  fontSize: 'clamp(14px, 1.15vw, 18px)',
                  fontWeight: 500,
                  lineHeight: 1.4,
                  letterSpacing: '0.005em',
                  opacity: 0.92,
                }}
              >
                {d.value}
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

function SectionRouter({
  section,
  dur,
}: {
  section: DetailSection;
  dur: number;
}) {
  switch (section.kind) {
    case 'moments':
      return (
        <MomentsBlock
          title={section.title ?? 'Key Moments'}
          moments={section.moments}
          dur={dur}
        />
      );
    case 'skills':
      return (
        <SkillsBlock
          title={section.title ?? 'What I Got Good At'}
          categories={section.categories}
          dur={dur}
        />
      );
    case 'exhibits':
      return (
        <ExhibitsBlock
          title={section.title ?? 'Exhibits'}
          items={section.items}
          dur={dur}
        />
      );
  }
}

// ── Architectural background (Variant 3: editorial spread) ──────────────────
// - Minimal ambient glow (single static radial at the bottom for warmth)
// - Asymmetric vertical column rules at ~22% and ~64% width
// - L-shaped corner brackets at all four viewport corners
// - Red-tinted grain for material texture

function DetailAmbientGlow() {
  return (
    <div
      aria-hidden
      style={{
        position: 'absolute',
        inset: 0,
        background:
          'radial-gradient(ellipse 70% 50% at 50% 100%, rgba(255, 58, 45, 0.07) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
}

function DetailCornerBrackets() {
  const size = 24;
  const color = 'rgba(255, 58, 45, 0.42)';
  const inset = 28;

  const base: React.CSSProperties = {
    position: 'absolute',
    width: size,
    height: size,
    pointerEvents: 'none',
    zIndex: 3,
  };

  const positions: {
    key: 'tl' | 'tr' | 'bl' | 'br';
    style: React.CSSProperties;
  }[] = [
    { key: 'tl', style: { top: inset, left: inset, borderTop: `1px solid ${color}`, borderLeft: `1px solid ${color}` } },
    { key: 'tr', style: { top: inset, right: inset, borderTop: `1px solid ${color}`, borderRight: `1px solid ${color}` } },
    { key: 'bl', style: { bottom: inset, left: inset, borderBottom: `1px solid ${color}`, borderLeft: `1px solid ${color}` } },
    { key: 'br', style: { bottom: inset, right: inset, borderBottom: `1px solid ${color}`, borderRight: `1px solid ${color}` } },
  ];

  return (
    <>
      {positions.map(p => (
        <motion.div
          key={p.key}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ ...base, ...p.style }}
        />
      ))}
    </>
  );
}

const DETAIL_GRAIN_URL = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix type='matrix' values='0 0 0 0 1  0 0 0 0 0.42  0 0 0 0 0.36  0 0 0 0.28 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")`;

function DetailGrainOverlay() {
  return (
    <div
      aria-hidden
      style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: DETAIL_GRAIN_URL,
        backgroundSize: '300px 300px',
        mixBlendMode: 'screen',
        opacity: 0.24,
        pointerEvents: 'none',
        zIndex: 1,
      }}
    />
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
        overflow: 'hidden',
        fontFamily: "'General Sans', sans-serif",
      }}
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ type: 'spring', stiffness: 260, damping: 32 }}
    >
      {/* Architectural background — stays fixed while content scrolls */}
      <DetailAmbientGlow />
      <DetailGrainOverlay />
      <DetailCornerBrackets />

      {/* ── Fixed back button ── */}
      <button
        onClick={onBack}
        style={{
          position: 'absolute',
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

      {/* ── Scrollable content (sits above background layers) ── */}
      <div style={{
        position: 'absolute',
        inset: 0,
        overflowY: 'auto',
        zIndex: 4,
        padding: '110px 6vw 160px',
        textAlign: 'center',
        boxSizing: 'border-box',
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

          {/* Role — large H1, warm white for site-wide consistency */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: cfg.dur * 1.6, delay: cfg.dur * 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontSize: 'clamp(44px, 8.5vw, 160px)',
              fontWeight: 700,
              color: INK,
              letterSpacing: '-0.035em',
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

        {/* ── Org Brief (optional, renders between hook and stats) ── */}
        {exp.orgBrief && (
          <>
            <div style={{ height: cfg.spacing * 0.85 }} />
            <OrgBriefBlock brief={exp.orgBrief} dur={cfg.dur} />
            <div style={{ height: cfg.spacing * 1.15 }} />
          </>
        )}

        <div style={{ height: cfg.spacing }} />

        {/* ── Stats (kinetic: before story) ── */}
        {cfg.statsFirst && (
          <>
            {statBlock}
            <div style={{ height: cfg.spacing }} />
          </>
        )}

        {/* ── Story ── */}
        {(() => {
          const fig = exp.storyFigure;
          const splitAt = fig ? fig.afterParagraph : exp.story.length;
          const beforeFig = exp.story.slice(0, splitAt);
          const afterFig = exp.story.slice(splitAt);

          const renderParas = (paras: string[], offset: number) => (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: cfg.storyColumns === 2 ? '1fr 1fr' : '1fr',
                gap: cfg.storyColumns === 2 ? '0 5vw' : 0,
                maxWidth: cfg.storyColumns === 1 ? '68vw' : '100%',
                margin: '0 auto',
                textAlign: 'left',
              }}
            >
              {paras.map((para, i) => (
                <Reveal key={offset + i} delay={(offset + i) * cfg.stagger} duration={cfg.dur} y={16}>
                  <p
                    style={{
                      color: 'rgba(255, 255, 255, 0.68)',
                      fontSize: 'clamp(17px, 1.55vw, 22px)',
                      lineHeight: 1.85,
                      fontWeight: 400,
                      letterSpacing: '0.01em',
                      margin: '0 0 28px',
                    }}
                  >
                    {para}
                  </p>
                </Reveal>
              ))}
            </div>
          );

          return (
            <div style={{ marginBottom: cfg.spacing }}>
              {beforeFig.length > 0 && renderParas(beforeFig, 0)}
              {fig && <StoryFigure figure={fig} dur={cfg.dur} />}
              {afterFig.length > 0 && renderParas(afterFig, splitAt)}
            </div>
          );
        })()}

        {/* ── Stats (non-kinetic: after story) ── */}
        {!cfg.statsFirst && (
          <>
            <div style={{ height: cfg.spacing * 0.5 }} />
            {statBlock}
          </>
        )}

        {/* ── Custom detail sections (per-role) ── */}
        {(() => {
          // Prefer explicit sections array; fall back to legacy `moments` field.
          const sections: DetailSection[] =
            exp.sections && exp.sections.length > 0
              ? exp.sections
              : exp.moments && exp.moments.length > 0
              ? [{ kind: 'moments', moments: exp.moments }]
              : [];

          return sections.map((section, i) => (
            <div key={i}>
              <div style={{ height: cfg.spacing }} />
              <SectionRouter section={section} dur={cfg.dur} />
            </div>
          ));
        })()}

      </div>
    </motion.div>
  );
}
