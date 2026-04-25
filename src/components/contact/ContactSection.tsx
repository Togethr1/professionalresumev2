import { useRef } from 'react';
import { motion, useInView } from 'motion/react';

export default function ContactSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-15%' });

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
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 32 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Small section label */}
        <div
          style={{
            color: '#FF3A2D',
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.26em',
            textTransform: 'uppercase',
            opacity: 0.55,
            marginBottom: 48,
          }}
        >
          02 — CONTACT
        </div>

        {/* Big invitation */}
        <div
          style={{
            fontSize: 'clamp(48px, 9vw, 168px)',
            fontWeight: 700,
            color: '#FF3A2D',
            letterSpacing: '-0.04em',
            lineHeight: 0.95,
            marginBottom: 64,
          }}
        >
          Let&rsquo;s talk.
        </div>

        {/* Email link */}
        <a
          href="mailto:mclombardi98@gmail.com"
          style={{
            display: 'inline-block',
            color: 'rgba(255, 255, 255, 0.82)',
            fontSize: 'clamp(20px, 2vw, 30px)',
            fontWeight: 500,
            letterSpacing: '0.01em',
            textDecoration: 'none',
            borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
            paddingBottom: 6,
            marginBottom: 56,
            transition: 'border-color 0.2s, color 0.2s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderBottomColor = '#FF3A2D';
            e.currentTarget.style.color = '#FF3A2D';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderBottomColor = 'rgba(255, 255, 255, 0.3)';
            e.currentTarget.style.color = 'rgba(255, 255, 255, 0.82)';
          }}
        >
          mclombardi98@gmail.com
        </a>

        {/* Meta row */}
        <div
          style={{
            display: 'flex',
            gap: 48,
            flexWrap: 'wrap',
            color: '#FF3A2D',
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            opacity: 0.55,
          }}
        >
          <span>815.566.6615</span>
          <span>MCLOMBARDI.COM</span>
          <span>OPEN TO OPPORTUNITIES</span>
        </div>
      </motion.div>
    </section>
  );
}
