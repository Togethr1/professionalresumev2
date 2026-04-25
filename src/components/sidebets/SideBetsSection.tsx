import { useRef } from 'react';
import { motion, useInView } from 'motion/react';

interface SideBet {
  name: string;
  category: string;
  pitch: string;
  detail: string;
}

const SIDE_BETS: SideBet[] = [
  {
    name: 'TOGETHR',
    category: 'CREATOR COLLABORATION PLATFORM',
    pitch: 'A marketplace connecting artists with brands for paid collaborations.',
    detail:
      'Direct descendent of the gap I first saw managing artists: audience and commerce were never connected. Togethr is the infrastructure for that connection.',
  },
  {
    name: 'COACH',
    category: 'AI OPERATING SYSTEM · LifeOS',
    pitch:
      'A multi-agent AI platform that functions as an autonomous operating layer across business and personal workflows.',
    detail:
      'Persistent memory, cross-session context, autonomous execution — email, calendar, projects, tasks, goals, and lead-enrichment pipelines all managed by one coordinated agent system.',
  },
];

function BetTile({
  bet,
  index,
}: {
  bet: SideBet;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: '48px 0',
        borderTop: '1px solid rgba(255, 58, 45, 0.25)',
      }}
    >
      {/* Category */}
      <div
        style={{
          color: '#FF3A2D',
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          opacity: 0.55,
          marginBottom: 20,
        }}
      >
        {bet.category}
      </div>

      {/* Name — big */}
      <div
        style={{
          color: '#FF3A2D',
          fontSize: 'clamp(48px, 7vw, 120px)',
          fontWeight: 700,
          letterSpacing: '-0.035em',
          lineHeight: 0.95,
          marginBottom: 32,
        }}
      >
        {bet.name}
      </div>

      {/* Pitch */}
      <div
        style={{
          color: 'rgba(255, 255, 255, 0.78)',
          fontSize: 'clamp(18px, 1.6vw, 24px)',
          fontWeight: 400,
          lineHeight: 1.5,
          letterSpacing: '0.005em',
          marginBottom: 20,
          maxWidth: '60ch',
        }}
      >
        {bet.pitch}
      </div>

      {/* Detail — smaller, dimmer */}
      <div
        style={{
          color: 'rgba(255, 255, 255, 0.5)',
          fontSize: 'clamp(14px, 1.1vw, 17px)',
          fontWeight: 400,
          lineHeight: 1.7,
          letterSpacing: '0.01em',
          maxWidth: '60ch',
        }}
      >
        {bet.detail}
      </div>
    </motion.div>
  );
}

export default function SideBetsSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-10%' });

  return (
    <section
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        background: '#000000',
        fontFamily: "'General Sans', sans-serif",
        padding: '160px 6vw',
        boxSizing: 'border-box',
      }}
    >
      <motion.div
        ref={headerRef}
        initial={{ opacity: 0, y: 24 }}
        animate={headerInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{ marginBottom: 96 }}
      >
        <div
          style={{
            color: '#FF3A2D',
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.26em',
            textTransform: 'uppercase',
            opacity: 0.55,
            marginBottom: 24,
          }}
        >
          01 — SIDE BETS
        </div>
        <div
          style={{
            fontSize: 'clamp(32px, 4.5vw, 68px)',
            fontWeight: 700,
            color: '#FF3A2D',
            letterSpacing: '-0.025em',
            lineHeight: 1.08,
            maxWidth: '80vw',
          }}
        >
          What I&rsquo;m building on the side.
        </div>
      </motion.div>

      {SIDE_BETS.map((bet, i) => (
        <BetTile key={bet.name} bet={bet} index={i} />
      ))}
    </section>
  );
}
