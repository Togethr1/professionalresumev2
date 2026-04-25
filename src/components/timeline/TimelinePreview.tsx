import { useRef } from 'react';
import { motion, useInView } from 'motion/react';

// Preview-only component — Act III rendered as a vertical spine timeline with
// three event types (role, side project, education). Scaffold for evaluation,
// not a production replacement for ExperienceSection. Keep logic local.

const INK = '#F5EFE8';
const ACCENT = '#FF3A2D';

type Event =
  | { kind: 'role'; index: string; company: string; role: string; stat: string; year: string }
  | { kind: 'project'; name: string; descriptor: string; year: string }
  | { kind: 'education'; name: string; year: string };

const ACT_III: Event[] = [
  {
    kind: 'role',
    index: '03',
    company: 'PHMG',
    role: 'SENIOR SDR, TEAM LEAD',
    stat: "×3 PRES. CLUB · $414K NEW ARR",
    year: '2023\u201324',
  },
  { kind: 'education', name: 'NC IDEA Labs \u2014 Sales Accelerator', year: '2024' },
  { kind: 'education', name: 'Victory Lap \u2014 AE Accelerator Program', year: '2024' },
  {
    kind: 'project',
    name: 'TOGETHR',
    descriptor: 'Creator \u00d7 brand collaboration marketplace',
    year: '2024',
  },
  {
    kind: 'education',
    name: 'General Assembly \u2014 Full Stack Engineering Bootcamp',
    year: '2025',
  },
  {
    kind: 'project',
    name: 'COACH',
    descriptor: 'Multi-agent AI operating system (LifeOS)',
    year: '2025',
  },
  {
    kind: 'role',
    index: '02',
    company: 'SERVICETITAN',
    role: 'SALES DEVELOPMENT REPRESENTATIVE',
    stat: '104% Q1 \u00b7 17% CLOSE',
    year: '2025\u2013',
  },
  {
    kind: 'role',
    index: '01',
    company: 'ENERTIA STUDIOS',
    role: 'FREELANCE AI SYSTEMS ARCHITECT',
    stat: '44% OPEN \u00b7 7% REPLY \u00b7 38% CVR LIFT',
    year: '2025\u2013',
  },
];

function SpineMarker({ kind }: { kind: Event['kind'] }) {
  const size = kind === 'education' ? 6 : 12;
  const common: React.CSSProperties = {
    position: 'absolute',
    left: -size / 2,
    top: 18,
    width: size,
    height: size,
    boxSizing: 'border-box',
  };
  if (kind === 'role') {
    return (
      <span
        style={{
          ...common,
          background: ACCENT,
          borderRadius: '50%',
        }}
      />
    );
  }
  if (kind === 'project') {
    return (
      <span
        style={{
          ...common,
          background: 'transparent',
          border: `1.5px solid ${ACCENT}`,
          transform: 'rotate(45deg)',
        }}
      />
    );
  }
  return (
    <span
      style={{
        ...common,
        background: ACCENT,
        opacity: 0.55,
        borderRadius: '50%',
      }}
    />
  );
}

function EventRow({ event, i }: { event: Event; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 16 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.55, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
      style={{ position: 'relative', paddingLeft: '3vw', paddingTop: 0 }}
    >
      <SpineMarker kind={event.kind} />

      {event.kind === 'role' && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '52px 1fr auto 160px',
            gap: '0 3vw',
            alignItems: 'start',
            padding: '18px 0',
            borderBottom: '1px solid rgba(255, 58, 45, 0.12)',
          }}
        >
          <div
            style={{
              color: ACCENT,
              opacity: 0.5,
              fontSize: 13,
              fontWeight: 500,
              letterSpacing: '0.12em',
              paddingTop: 8,
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            {event.index}
          </div>
          <div style={{ minWidth: 0 }}>
            <div
              style={{
                color: ACCENT,
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                opacity: 0.65,
                marginBottom: 6,
              }}
            >
              {event.company}
            </div>
            <div
              style={{
                fontSize: 'clamp(24px, 3vw, 52px)',
                fontWeight: 700,
                color: ACCENT,
                letterSpacing: '-0.02em',
                lineHeight: 1.05,
              }}
            >
              {event.role}
            </div>
          </div>
          <div
            style={{
              color: ACCENT,
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              opacity: 0.6,
              alignSelf: 'center',
              whiteSpace: 'nowrap',
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            {event.stat}
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
              gap: 8,
              alignSelf: 'center',
              color: ACCENT,
              fontSize: 13,
              opacity: 0.55,
              letterSpacing: '0.12em',
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            {event.year}
            <span style={{ fontSize: 15, lineHeight: 1, opacity: 0.6 }}>{'\u2192'}</span>
          </div>
        </div>
      )}

      {event.kind === 'project' && (
        <div style={{ padding: '14px 0' }}>
          <div
            style={{
              display: 'inline-block',
              border: `1px solid rgba(255, 58, 45, 0.28)`,
              padding: '16px 24px',
              minWidth: '40%',
              maxWidth: '62%',
              cursor: 'pointer',
              transition: 'border-color 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = ACCENT;
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(255, 58, 45, 0.28)';
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                justifyContent: 'space-between',
                gap: 24,
                marginBottom: 6,
              }}
            >
              <div
                style={{
                  fontSize: 'clamp(18px, 2vw, 26px)',
                  fontWeight: 700,
                  color: INK,
                  letterSpacing: '0.04em',
                  lineHeight: 1.1,
                }}
              >
                {event.name}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span
                  style={{
                    color: ACCENT,
                    fontSize: 11,
                    letterSpacing: '0.16em',
                    opacity: 0.6,
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  {event.year}
                </span>
                <span style={{ color: ACCENT, fontSize: 14, opacity: 0.7 }}>{'\u2197'}</span>
              </div>
            </div>
            <div
              style={{
                color: 'rgba(255, 255, 255, 0.62)',
                fontSize: 'clamp(13px, 1.05vw, 16px)',
                lineHeight: 1.4,
                letterSpacing: '0.005em',
              }}
            >
              {event.descriptor}
            </div>
            <div
              style={{
                marginTop: 10,
                color: ACCENT,
                fontSize: 9,
                fontWeight: 700,
                letterSpacing: '0.28em',
                textTransform: 'uppercase',
                opacity: 0.55,
              }}
            >
              SIDE PROJECT
            </div>
          </div>
        </div>
      )}

      {event.kind === 'education' && (
        <div
          style={{
            padding: '8px 0',
            display: 'flex',
            alignItems: 'baseline',
            gap: 14,
          }}
        >
          <span
            style={{
              color: ACCENT,
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.16em',
              opacity: 0.75,
              fontVariantNumeric: 'tabular-nums',
              minWidth: 48,
            }}
          >
            {event.year}
          </span>
          <span
            style={{
              color: 'rgba(255, 255, 255, 0.55)',
              fontSize: 14,
              fontWeight: 400,
              letterSpacing: '0.01em',
              fontStyle: 'italic',
            }}
          >
            {event.name}
          </span>
        </div>
      )}
    </motion.div>
  );
}

export default function TimelinePreview() {
  // Reverse chron — matches the rest of the portfolio (01 Enertia most recent)
  const events = [...ACT_III].reverse();

  return (
    <section
      style={{
        background: '#000000',
        width: '100%',
        padding: '140px 6vw 200px',
        fontFamily: "'General Sans', sans-serif",
        boxSizing: 'border-box',
      }}
    >
      {/* Section label */}
      <div style={{ marginBottom: 24 }}>
        <span
          style={{
            color: ACCENT,
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: '0.32em',
            textTransform: 'uppercase',
            opacity: 0.55,
          }}
        >
          \u2014 PREVIEW \u00b7 SPINE TIMELINE
        </span>
      </div>

      <h2
        style={{
          color: ACCENT,
          fontSize: 22,
          fontWeight: 700,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          margin: '0 0 48px',
        }}
      >
        ACT III \u2014 TIMELINE PREVIEW
      </h2>

      <p
        style={{
          color: 'rgba(255, 255, 255, 0.55)',
          fontSize: 14,
          lineHeight: 1.6,
          maxWidth: '60ch',
          marginBottom: 72,
          fontStyle: 'italic',
        }}
      >
        Spine connects events. Filled dot = role (clickable row). Diamond =
        side project (clickable card). Small dot = education (inline,
        non-clickable).
      </p>

      {/* Spine + events */}
      <div
        style={{
          position: 'relative',
          paddingLeft: 12,
        }}
      >
        {/* Vertical spine */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            width: 1,
            background:
              'linear-gradient(180deg, rgba(255,58,45,0.45) 0%, rgba(255,58,45,0.18) 100%)',
          }}
        />

        {events.map((event, i) => (
          <EventRow
            key={`${event.kind}-${i}`}
            event={event}
            i={i}
          />
        ))}
      </div>
    </section>
  );
}
