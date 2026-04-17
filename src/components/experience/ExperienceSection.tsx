import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'motion/react';
import { useTextScramble } from '@/components/scramble';
import type { ScrambleMode } from '@/components/scramble';
import type { Experience, Act } from './types';
import RoleDetailPage from './RoleDetailPage';

// ── Data ─────────────────────────────────────────────────────────────────────

const ACTS: Act[] = [
  {
    number: 'III',
    title: 'THE OPERATOR',
    dateRange: '2024–PRESENT',
    experiences: [
      {
        index: '01',
        company: 'SERVICETITAN',
        role: 'SALES DEVELOPMENT REP',
        year: '2024',
        stat: 'TOP-OF-FUNNEL PIPELINE',
        descriptor: 'SaaS outbound at enterprise scale',
        hook: 'Pipeline is only as good as what goes into it. I learned to fill it right.',
        pageVariant: 'kinetic',
        story: [
          "At ServiceTitan — the dominant software platform for the trades — I stepped into one of the most structured, high-velocity outbound engines in B2B SaaS. Every day was a masterclass in pipeline architecture: multi-touch sequences, ICP qualification, and the art of getting the right person on the phone at exactly the right moment.",
          "The role demanded precision. ServiceTitan's market is competitive and the buying cycle is real — contractors are skeptical, busy, and inundated with bad sales calls. I learned how to cut through that noise by leading with insight, not pitch.",
          "This wasn't just a job. It was a deliberate move to sharpen my outbound motion inside a world-class GTM org before taking those skills somewhere I could build from scratch.",
        ],
        stats: [
          { value: 'Enterprise', label: 'SaaS segment' },
          { value: 'Multi-touch', label: 'Outbound sequences' },
          { value: 'ICP', label: 'Qualification methodology' },
        ],
        skills: ['OUTBOUND', 'SAAS', 'GTM', 'PIPELINE', 'SEQUENCING'],
        moments: [
          {
            title: 'The Learning Curve',
            teaser: 'Enterprise SaaS has a specific vocabulary. I had a week to learn it.',
            body: "ServiceTitan's pitch isn't simple. You're selling software to plumbers and electricians who've run their business the same way for 20 years. The first thing I learned: don't lead with features. Lead with the cost of not changing. Once I had that frame, the rest fell into place.",
          },
          {
            title: 'ICP Clarity',
            teaser: 'Not every contractor is the right fit. Finding the signal changes everything.',
            body: "The best prospects weren't the biggest shops — they were multi-truck operations where the owner was still scheduling from a spreadsheet. Once I identified that signal, my connect rate nearly doubled. Qualification is the most underrated skill in outbound.",
          },
          {
            title: 'The Sequence That Moved',
            teaser: 'I rebuilt my outreach sequence at 30 days in. The difference was immediate.',
            body: "The default sequence was volume-first: call, email, call, email. I added a pattern interrupt — a short voicemail referencing a specific operational problem I knew they had. Reply rates went up. Relevance beats repetition every time.",
          },
        ],
      },
      {
        index: '02',
        company: 'ENERTIA STUDIOS',
        role: 'FREELANCE AI SYSTEMS ARCHITECT',
        year: '2025',
        stat: '43% OPEN RATE · 39% CVR · 30%+ CONVERSION LIFT',
        descriptor: 'Automated revenue systems for creators',
        hook: 'The most valuable system I built ran itself.',
        pageVariant: 'system',
        story: [
          "Enertia Studios came to me with a conversion problem. Their creator-facing funnels were leaky, manual, and slow — every handoff was a potential drop. I rebuilt their backend automation stack from the ground up.",
          "Using a combination of no-code tooling and custom workflow design, I automated the follow-up sequences, lead scoring, and onboarding flows that previously required manual intervention at every step. The result: 30%+ improvement in conversion efficiency across their core funnels.",
          "This engagement deepened my appreciation for systems thinking. The best revenue ops isn't about working harder — it's about designing processes that compound over time.",
        ],
        stats: [
          { value: '43%', label: 'Average outbound email open rate' },
          { value: '39%', label: 'Conversation rate' },
          { value: '30%+', label: 'Improvement in conversion efficiency (early pilot clients)' },
        ],
        skills: ['CONTEXT ENGINEERING', 'SYSTEMS DESIGN', 'API INTEGRATIONS', 'FULL SALES CYCLE', 'OUTBOUND CADENCE DESIGN'],
        moments: [
          {
            title: 'The Audit',
            teaser: 'Before I could fix anything, I had to map everything that was broken.',
            body: "I signed up as a creator and went through onboarding manually. There were 11 places where a lead could fall through with no follow-up. That audit became the roadmap.",
          },
          {
            title: 'The First Win',
            teaser: 'One automation, deployed in week two, paid for the entire engagement.',
            body: "Their biggest drop-off was between signup and first event creation. I built a 5-day onboarding sequence that held creators through their first post. Completion rate went from 34% to 61% in the first month.",
          },
          {
            title: 'The Compound Effect',
            teaser: "Automations don't just save time. They compound.",
            body: "By month three, the systems were interacting with each other — lead scoring triggering sequences, conversions feeding back into the scoring model. The 30% efficiency gain wasn't a ceiling. It was a floor.",
          },
        ],
      },
      {
        index: '03',
        company: 'PHMG',
        role: 'TEAM LEAD, SDR',
        year: '2023–2024',
        stat: "PRESIDENT'S CLUB ×3",
        descriptor: 'Led outbound team to elite performance',
        hook: "I won President's Club three times by giving away everything that made me good at it.",
        pageVariant: 'kinetic',
        story: [
          "PHMG is a global leader in audio branding — a niche where the sale is entirely value-based and the objection landscape is unique. I joined as an SDR, built my book, and was promoted to Team Lead within months.",
          "Three consecutive President's Club finishes. That number lives here not as a brag but as a proof of process. I built a repeatable playbook for cold outreach that my team adopted, iterated on, and exceeded with.",
          "Leadership at this level isn't about managing — it's about setting the standard through your own performance and then teaching others to match it. I learned how to coach, motivate, and hold a team to elite expectations without burning them out.",
        ],
        stats: [
          { value: '×3', label: "President's Club" },
          { value: 'Team Lead', label: 'Promoted within months' },
          { value: 'Playbook', label: 'Built + distributed to team' },
        ],
        skills: ['LEADERSHIP', 'SDR', 'OUTBOUND', 'COACHING', 'REVENUE'],
        moments: [
          {
            title: 'The Playbook',
            teaser: 'I documented everything that was working — and gave it away.',
            body: "Most salespeople protect their edge. I took the opposite approach: documented every opener, every objection handle, every follow-up timing. Sharing the playbook raised everyone's floor. That's what won us President's Club as a team.",
          },
          {
            title: "President's Club, Year One",
            teaser: 'The first one was about proving I could do it. The next two were about making it repeatable.',
            body: "Year one was grit. Year two, I understood that top performers aren't working harder — they're working on the right things. I spent less time on activity metrics and more time on quality of conversation. The results compounded.",
          },
          {
            title: 'The Leadership Shift',
            teaser: 'Being the best rep and being a good leader are completely different skills.',
            body: "When I moved into Team Lead, my instinct was to set the pace by example. But I also had to learn to coach people whose style was nothing like mine. Adjusting my approach to different learning styles was my real leadership education.",
          },
        ],
      },
    ],
  },
  {
    number: 'II',
    title: 'THE FOUNDER',
    dateRange: '2020–2024',
    experiences: [
      {
        index: '04',
        company: 'FANSUB',
        role: 'CO-FOUNDER / CHIEF OF GROWTH',
        year: '2020–2024',
        stat: '$2M RAISED · 40K+ FANS · 250+ EVENTS',
        descriptor: 'Built a venture-backed creator marketplace',
        hook: 'A random tweet in a pandemic turned into the most formative chapter of my career.',
        pageVariant: 'narrative',
        story: [
          "Fansub was the defining chapter of my career — the place I learned how to build in public, sell a vision, and turn chaos into systems. I met my co-founder through a random tweet during the pandemic; a 30-minute exploratory call turned into a five-hour deep dive on the future of the creator economy, and by the end he asked me to join as co-founder and lead go-to-market and partnerships.",
          "Six months later, we were accepted into the inaugural ACT Tulsa pre-seed accelerator and I had three days to decide whether to leave my job, move to Oklahoma, and go all-in on the company. I chose to bet on Fansub. During the program, I went through intensive fundraising prep, honed our narrative, and helped us secure Atento Capital as lead investor for a $2M pre-seed round — the largest pre-seed in Oklahoma since 1992.",
          "Before we raised capital, I led experimentation across multiple GTM motions for our marketplace, where music venues and brands partnered with creators to drive fan engagement. I designed and executed launch parties in four cities, venue forums for owners and booking agents, mixers, concerts, and festivals — all focused on user adoption and understanding which levers actually drove customer acquisition. With almost no budget, I sourced sponsorships and partnership agreements that funded these events alongside ticket revenue.",
          "Once funded, my role shifted from scrappy evangelist to operator. I sat across product, customer success, and strategic partnerships while owning growth initiatives and our flagship monthly concert series across four cities, averaging more than 300 tickets sold per month. Over the course of our pre-seed phase, we scaled the platform to 10,000+ creators, 3,000 venues and event organizers, and 40,000+ fans, while driving more than 250 ticketed events and over $300K in pre-seed revenue.",
          "Because we were early and lean, I had exposure to every part of the business. I helped create hiring and onboarding assets, partnered with our CEO on P&L modeling, and even handled on-the-ground work like configuring livestream setups at venues. Fansub was my on-the-job MBA in building systems from zero, translating messy real-world constraints into repeatable GTM plays, and owning outcomes end-to-end.",
        ],
        stats: [
          { value: '$2M', label: 'Pre-seed raised (largest in Oklahoma since 1992)' },
          { value: '10K+', label: 'Creators on platform' },
          { value: '40K+', label: 'Fans' },
          { value: '250+', label: 'Ticketed events' },
          { value: '$300K+', label: 'Pre-seed revenue' },
        ],
        skills: ['GTM', 'FUNDRAISING', 'PRODUCT MANAGEMENT', 'PARTNERSHIP DEVELOPMENT', 'GROWTH', 'CUSTOMER DISCOVERY', 'PROCESS OPTIMIZATION'],
        moments: [
          {
            title: 'The Tweet',
            teaser: 'My co-founder and I met through a random tweet during the pandemic.',
            body: "A 30-minute exploratory call turned into a five-hour deep dive on the future of the creator economy. By the end, he asked me to join as co-founder and lead go-to-market and partnerships. That's how most good things start — an unexpected conversation that refuses to end.",
          },
          {
            title: 'The Bet',
            teaser: 'Three days to decide. Leave the job. Move to Oklahoma. Go all-in.',
            body: "We were accepted into the inaugural ACT Tulsa pre-seed accelerator. The decision wasn't hard intellectually — the opportunity was real. But the personal commitment was significant. I chose Fansub. During the program, we honed our narrative and secured Atento Capital as lead investor for a $2M pre-seed round — the largest pre-seed in Oklahoma since 1992.",
          },
          {
            title: 'GTM From Zero',
            teaser: 'Before we had capital, I was the entire go-to-market function.',
            body: "Launch parties in four cities. Venue forums for owners and booking agents. Mixers, concerts, festivals. All designed to understand which levers actually drove customer acquisition. With almost no budget, I sourced sponsorships and partnership agreements that funded these events alongside ticket revenue. GTM experimentation in its purest form.",
          },
          {
            title: 'The Operator Phase',
            teaser: 'Once funded, the role changed. Evangelist became operator.',
            body: "I sat across product, customer success, and strategic partnerships while owning growth and our flagship monthly concert series across four cities — averaging 300+ tickets per month. Over the pre-seed phase: 10,000+ creators, 3,000 venues, 40,000+ fans, $300K+ in revenue. Owning a number end-to-end is different from contributing to one.",
          },
          {
            title: 'Full Exposure',
            teaser: "When you're early and lean, there's no such thing as 'not my job.'",
            body: "I helped build hiring and onboarding assets, partnered with our CEO on P&L modeling, and configured livestream setups at venues when no one else was available. That total immersion is the fastest way to learn how a business actually works — not the org chart version, but the real version.",
          },
        ],
      },
    ],
  },
  {
    number: 'I',
    title: 'THE FOUNDATION',
    dateRange: '2015–2020',
    experiences: [
      {
        index: '05',
        company: '720 DIGITAL',
        role: 'FREELANCE GROWTH MARKETER / VIRTUAL CMO',
        year: '2018–2020',
        stat: '$100K+ AD SPEND · 4× ROAS',
        descriptor: 'Ran paid growth for SMBs across verticals',
        hook: "I managed other people's budgets like they were mine. That's the only way to earn trust.",
        pageVariant: 'system',
        story: [
          "Before Fansub, I built a freelance practice that let me develop the full toolkit of a growth marketer. Working across verticals — e-commerce, professional services, hospitality — I managed over $100,000 in monthly ad spend and consistently delivered 4× return on ad spend.",
          "As a Virtual CMO for several clients, I wasn't just running campaigns — I was building marketing strategy, managing vendors, and reporting to founders and boards. This taught me how to operate with ownership, not just execution.",
          "The discipline of paid media fundamentally changed how I think about growth. Every dollar is a hypothesis. Every campaign is a test. The data tells you what's working, if you're willing to listen.",
        ],
        stats: [
          { value: '$100K+', label: 'Ad spend managed' },
          { value: '4×', label: 'Average ROAS' },
          { value: '3', label: 'Virtual CMO clients' },
        ],
        skills: ['PAID MEDIA', 'GTM', 'GROWTH', 'CMO', 'STRATEGY', 'ANALYTICS'],
        moments: [
          {
            title: 'The First Client',
            teaser: 'A freelance practice starts with one person trusting you.',
            body: "My first client came through a referral — a local hospitality business, $5K/month in ad spend. I treated it like it was $500K. They doubled the budget in 60 days and sent me my next three clients.",
          },
          {
            title: 'The 4× ROAS',
            teaser: 'Return on ad spend is math. Getting to 4× is about more than numbers.',
            body: "The campaigns that hit 4× weren't the ones with the best creative — they had the tightest targeting and the best post-click alignment. I spent as much time on landing pages as on the ads. Most competitors weren't doing that. That's where the edge was.",
          },
          {
            title: 'The CMO Chair',
            teaser: "Sitting in a board meeting as your client's CMO changes how you think.",
            body: "You can't just present campaign metrics. You have to tie marketing to the business. I learned to speak in revenue, churn, and LTV — not just CPM and CTR. That shift changed every GTM conversation I've had since.",
          },
        ],
      },
      {
        index: '06',
        company: 'SCRIPTED',
        role: 'ENTERPRISE ACCOUNT MANAGER',
        year: '2016–2018',
        stat: '$500K PORTFOLIO · 75% RENEWAL',
        descriptor: 'Managed content marketplace enterprise accounts',
        hook: "The best account managers aren't salespeople. They're advocates with a renewal target.",
        pageVariant: 'narrative',
        story: [
          "Scripted was my first real enterprise sales environment. The platform connected businesses with professional freelance writers, and I managed the top tier of accounts — a portfolio valued at over $500,000 in annual recurring revenue.",
          "My 75% renewal rate wasn't an accident. It came from actually understanding what each client needed from content, building relationships with their marketing leads, and proactively surfacing value before renewal conversations even started.",
          "This role taught me the fundamentals of account management that still guide my work today: listen more than you pitch, know the product better than anyone, and make your clients' success your own metric.",
        ],
        stats: [
          { value: '$500K', label: 'ARR portfolio' },
          { value: '75%', label: 'Renewal rate' },
        ],
        skills: ['ENTERPRISE', 'ACCOUNT MANAGEMENT', 'B2B', 'CONTENT', 'RENEWAL'],
        moments: [
          {
            title: 'Taking the Book',
            teaser: 'Inheriting a $500K portfolio means inheriting $500K worth of expectations.',
            body: "Every account came with history — past promises, past friction, past wins. The first 30 days, I just listened. Not pitching, not upselling. Understanding what each client actually needed. That listening period set the foundation for a 75% renewal rate.",
          },
          {
            title: 'The Renewal Methodology',
            teaser: 'Most renewals are won or lost 6 months before the contract date.',
            body: "I stopped thinking about renewal as a moment and started thinking about it as a posture. Every QBR, every check-in, every delivery was a renewal conversation. By the time the actual date arrived, the decision was already made — usually in our favor.",
          },
          {
            title: 'The Enterprise Lesson',
            teaser: "In enterprise, relationships aren't a soft skill. They're the product.",
            body: "The clients I kept longest weren't the biggest contracts — they were the ones where I'd built real relationships with the marketing leads. When a champion left for a new company, they brought me with them twice. That's the real metric.",
          },
        ],
      },
      {
        index: '07',
        company: "DREAMS AREN'T CLICHÉ",
        role: 'ARTIST MANAGER & EVENT PRODUCER',
        year: '2015–2016',
        stat: '50+ EVENTS PRODUCED',
        descriptor: 'Where operations and creativity first met',
        hook: 'I learned operations the same way everyone learns it — by being the one who fixes what breaks.',
        pageVariant: 'creative',
        story: [
          "Dreams Aren't Cliché was where I first discovered that I could operate at the intersection of creativity and business. As an artist manager and event producer in Los Angeles, I produced over 50 live events — from intimate venue showcases to larger festival stages.",
          "Managing artists requires a specific kind of hustle: you're the strategist, the scheduler, the booking agent, and the hype man all at once. I learned how to negotiate, how to build relationships in a relationship-driven industry, and how to execute events where something always goes wrong.",
          "This chapter planted the seeds that would eventually grow into Fansub. I saw firsthand the gap between artists and their audiences, and the broken economics of the live music industry. Understanding that problem took years. Solving it was the next chapter.",
        ],
        stats: [
          { value: '50+', label: 'Events produced' },
          { value: 'LA', label: 'Music scene' },
        ],
        skills: ['EVENTS', 'ARTIST MANAGEMENT', 'PRODUCTION', 'OPERATIONS', 'CREATIVE'],
        moments: [
          {
            title: 'The First Show',
            teaser: 'I produced my first event with no budget, no venue experience, and no backup plan.',
            body: "A 200-person showcase in a rented warehouse in Koreatown. I handled everything. Something went wrong with the sound system at 8pm. Fixed by 8:15. That show taught me: operations is just problem-solving at speed.",
          },
          {
            title: 'Managing Artists',
            teaser: "Artists don't need a manager. They need a belief system with a calendar.",
            body: "The best thing I could do wasn't get them a better deal — it was help them see their career as a business. I built routing structures, social calendars, and pitch decks for people who'd never thought about their audience as a market.",
          },
          {
            title: 'The Seed',
            teaser: 'Every show taught me the same broken thing.',
            body: "Artists would pack a room with 300 fans and make almost nothing after venue cuts, sound crews, and promoters. I started asking: what if the artist captured that value directly? That question, asked across 50+ shows, eventually became Fansub.",
          },
        ],
      },
    ],
  },
];

// ── SectionLabel ──────────────────────────────────────────────────────────────

function SectionLabel() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [mode, setMode] = useState<ScrambleMode>('idle');
  const display = useTextScramble('EXPERIENCE', mode);

  useEffect(() => {
    if (isInView) setMode('in');
  }, [isInView]);

  return (
    <div ref={ref} style={{ marginBottom: 80, minHeight: 20 }}>
      <span style={{
        color: '#FF3A2D',
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: '0.22em',
        textTransform: 'uppercase',
        opacity: isInView ? 1 : 0,
        transition: 'opacity 0.4s',
        fontVariantNumeric: 'tabular-nums',
      }}>
        {display}
      </span>
    </div>
  );
}

// ── ActTitle ──────────────────────────────────────────────────────────────────

function ActTitle({ act }: { act: Act }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '2.5vw',
        marginBottom: 16,
        marginTop: 96,
        paddingBottom: 20,
        borderBottom: '1px solid rgba(255, 58, 45, 0.08)',
      }}
    >
      <span style={{
        fontSize: 'clamp(44px, 5.5vw, 88px)',
        fontWeight: 700,
        color: '#FF3A2D',
        letterSpacing: '-0.03em',
        whiteSpace: 'nowrap',
        flexShrink: 0,
        lineHeight: 1,
      }}>
        ACT {act.number}
      </span>

      <div style={{
        flex: 1,
        height: 1,
        background: 'linear-gradient(90deg, rgba(255,58,45,0.5) 0%, rgba(255,58,45,0.15) 100%)',
      }} />

      <div style={{ textAlign: 'right', flexShrink: 0 }}>
        <div style={{
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: '0.22em',
          color: '#FF3A2D',
          opacity: 0.75,
          textTransform: 'uppercase',
          lineHeight: 1.4,
        }}>
          {act.title}
        </div>
        <div style={{
          fontSize: 9,
          letterSpacing: '0.18em',
          color: '#FF3A2D',
          opacity: 0.38,
          textTransform: 'uppercase',
          marginTop: 3,
        }}>
          {act.dateRange}
        </div>
      </div>
    </motion.div>
  );
}

// ── HoverDescriptor ───────────────────────────────────────────────────────────

function HoverDescriptor({ text }: { text: string }) {
  const [mode, setMode] = useState<ScrambleMode>('idle');
  const display = useTextScramble(text, mode);

  useEffect(() => {
    const t = setTimeout(() => setMode('in'), 20);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{
      color: '#FF3A2D',
      fontSize: 11,
      fontWeight: 500,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      opacity: 0.52,
      marginTop: 5,
      fontVariantNumeric: 'tabular-nums',
      whiteSpace: 'nowrap',
    }}>
      {mode !== 'idle' ? display : ''}
    </div>
  );
}

// ── ExperienceRow ─────────────────────────────────────────────────────────────

function ExperienceRow({ exp, onOpen, delay = 0 }: {
  exp: Experience;
  onOpen: () => void;
  delay?: number;
}) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay }}
      style={{
        display: 'grid',
        gridTemplateColumns: '52px 1fr auto 200px',
        gap: '0 3vw',
        alignItems: 'start',
        padding: '36px 0',
        cursor: 'pointer',
        borderBottom: '1px solid rgba(255, 58, 45, 0.1)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onOpen}
    >
      <div style={{
        color: '#FF3A2D',
        opacity: 0.3,
        fontSize: 11,
        fontWeight: 500,
        letterSpacing: '0.12em',
        paddingTop: 14,
        fontVariantNumeric: 'tabular-nums',
      }}>
        {exp.index}
      </div>

      <div style={{ minWidth: 0 }}>
        <div style={{
          color: '#FF3A2D',
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          opacity: 0.38,
          marginBottom: 8,
        }}>
          {exp.company}
        </div>
        <motion.div
          animate={{ opacity: hovered ? 1 : 0.72 }}
          transition={{ duration: 0.18 }}
          style={{
            fontSize: 'clamp(28px, 4vw, 72px)',
            fontWeight: 700,
            color: '#FF3A2D',
            letterSpacing: '-0.02em',
            lineHeight: 1.05,
            userSelect: 'none',
          }}
        >
          {exp.role}
        </motion.div>
        {hovered && <HoverDescriptor text={exp.descriptor} />}
      </div>

      <motion.div
        animate={{ opacity: hovered ? 0.85 : 0.35 }}
        transition={{ duration: 0.18 }}
        style={{
          color: '#FF3A2D',
          fontSize: 10,
          fontWeight: 600,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          alignSelf: 'center',
          lineHeight: 1.5,
          whiteSpace: 'nowrap',
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {exp.stat}
      </motion.div>

      <div style={{
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        gap: 8,
        alignSelf: 'center',
      }}>
        <span style={{
          color: '#FF3A2D',
          fontSize: 10,
          opacity: 0.3,
          letterSpacing: '0.12em',
          fontVariantNumeric: 'tabular-nums',
        }}>
          {exp.year}
        </span>
        <motion.span
          animate={{ x: hovered ? 4 : 0, opacity: hovered ? 0.85 : 0.28 }}
          transition={{ duration: 0.15 }}
          style={{ color: '#FF3A2D', fontSize: 14, lineHeight: 1 }}
        >
          →
        </motion.span>
      </div>
    </motion.div>
  );
}

// ── ExperienceSection ─────────────────────────────────────────────────────────

export default function ExperienceSection() {
  const [detailExp, setDetailExp] = useState<Experience | null>(null);
  const [detailAct, setDetailAct] = useState<Act | null>(null);

  const openDetail = (exp: Experience, act: Act) => {
    setDetailExp(exp);
    setDetailAct(act);
  };

  const closeDetail = () => {
    setDetailExp(null);
    setDetailAct(null);
  };

  return (
    <>
      <section style={{
        background: '#000000',
        width: '100%',
        padding: '140px 6vw 200px',
        fontFamily: "'General Sans', sans-serif",
        boxSizing: 'border-box',
      }}>
        <SectionLabel />

        {ACTS.map(act => (
          <div key={act.number}>
            <ActTitle act={act} />
            {act.experiences.map((exp, i) => (
              <ExperienceRow
                key={exp.index}
                exp={exp}
                onOpen={() => openDetail(exp, act)}
                delay={i * 0.07}
              />
            ))}
          </div>
        ))}
      </section>

      <AnimatePresence>
        {detailExp && detailAct && (
          <RoleDetailPage
            key={detailExp.index}
            exp={detailExp}
            act={detailAct}
            onBack={closeDetail}
          />
        )}
      </AnimatePresence>
    </>
  );
}
