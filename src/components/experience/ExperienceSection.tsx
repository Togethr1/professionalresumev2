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
        company: 'ENERTIA STUDIOS',
        role: 'FREELANCE AI SYSTEMS ARCHITECT',
        year: '2025 — Present',
        stat: '44% OPEN · 7% REPLY · 38% CVR LIFT',
        descriptor: 'Solo AI studio for service businesses',
        hook: 'The fastest way to learn AI and systems design is to build them.',
        pageVariant: 'narrative',
        orgBrief: {
          data: [
            { label: 'Founded', value: '2025' },
            { label: 'Offering', value: 'Custom Multi-Agent Systems' },
            { label: 'G2M', value: 'Intent-scored scrape \u2192 sequence \u2192 retarget' },
            { label: 'Verticals', value: 'Service Based Businesses (Medical Practices, Law Practices, Home Services)' },
          ],
        },
        storyFigure: {
          src: '/exhibits/ldr-agent-diagram.png',
          label: 'FIG. 01',
          caption: 'LDR AGENT \u2014 FOUR-PHASE SYSTEM ARCHITECTURE',
          alt: 'LDR agent system architecture diagram across four phases: scrape and score, human review, enrich and select, and email and outreach.',
          afterParagraph: 2,
        },
        story: [
          "I wanted to learn AI by shipping it. Enertia Studios was the excuse. The pitch I gave myself was simple: service businesses have broken revenue operations, most \"AI\" solutions in the SMB market are cosmetic, and I\u2019d learn faster running a company that had to sell its own work than by building in a sandbox.",
          "I started with the outbound engine. A multi-stage pipeline that scrapes target verticals for buying signals, runs records through an Apollo \u2192 Uplead \u2192 Hunter \u2192 Smartlead.ai waterfall enrichment across multiple different sources, scores intent and key buying indicators, and routes them into sequence-aware campaigns with contextual agents assisting with follow up calls and emails.",
          "From there the real opportunity came \u2014 building systems across every function inside a service business. AI receptionists tied to live calendars for inbound booking, qualification, and rescheduling. Operational dashboards giving teams and managers interconnected metrics across the business, paired with agents that execute the manual work behind each view. Custom LLM assistants wired into client operations with agentic tool use. Claude for reasoning, GPT-4o for execution, pgvector for memory.",
          "The more discovery calls I ran, the better I understood the verticals and the pain inside them. That knowledge fed back into everything \u2014 the offer, the positioning, the intent signals, and the acquisition systems themselves. In Q2 of 2025, my CAC was around $130. By Q1 of this year, it was $44, driven almost entirely by sharper intent signals, better channel selection, and tighter messaging.",
          "Every build starts with observation. Before I touch a prompt or a framework, I spend time inside the client\u2019s operation \u2014 what\u2019s repeated, what\u2019s abandoned, what the owner personally rescues every week. That\u2019s the gap. The system fills it. From there it becomes integration work: wiring APIs, LLMs, vector stores, and message queues into something that runs reliably when no one is watching it. I pick tools by constraint, not by novelty \u2014 rules where rules work, agents where they don\u2019t, cached context where a fresh LLM call would be waste. Every step has a token budget, a latency target, and a dollar-per-run ceiling. A good system is one the owner stops thinking about.",
          "Then I ran the company. Wrote the offer. Wrote the cold-call scripts. Took the discovery calls myself \u2014 30 minutes, no deck, no AI transformation roadmap. If agents were the right fix I walked the prospect through exactly what I\u2019d build and why; if not, I told them. Multiple clients closed on $750/mo retainers. I onboarded each one personally and kept iterating on their systems month over month \u2014 prompts, targeting, sequence logic, new agents as the business surfaced new pain.",
          "The outbound engine sends 2,000+ emails a month at 44% open and 7% reply \u2014 both above industry benchmark. For a med spa client, a custom booking and follow-up agent lifted membership conversion 38%. Across my own pipeline and client pipelines combined, the engine has generated 5,000+ intent-scored leads.",
          "Enertia runs in parallel with the SDR seat at ServiceTitan. That was always the point. Sales operators usually end up downstream of the AI team \u2014 the people the systems get built for. I wanted to be on the other side of that equation.",
        ],
        stats: [
          { value: '2,000+', label: 'Emails sent per month' },
          { value: '44%', label: 'Average outbound open rate' },
          { value: '7%', label: 'Average reply rate' },
          { value: '38%', label: 'Med spa membership CVR lift' },
        ],
        skills: ['SYSTEMS DESIGN', 'AGENTIC WORKFLOWS', 'MULTI-AGENT ORCHESTRATION', 'FULL CYCLE SALES', 'OFFER DEVELOPMENT', 'OUTBOUND ENGINEERING'],
        sections: [
          {
            kind: 'skills',
            title: 'What I Built And Ran',
            categories: [
              {
                name: 'SYSTEMS SHIPPED',
                entries: [
                  { name: 'Autonomous Outbound Engine', description: 'Multi-stage pipeline \u2014 scrape vertical signals, enrich through Apollo/Hunter/Snov, score intent, route to sequence-aware campaigns.' },
                  { name: 'AI Receptionist', description: 'Tied to live calendars for inbound booking, qualification, and appointment confirmation.' },
                  { name: 'Onboarding Agent', description: 'Walks new clients through setup and configuration without human handoff.' },
                  { name: 'Custom LLM Chatbots', description: 'Wired into client operations with agentic tool use \u2014 actions, not just answers.' },
                  { name: 'Contextual Follow-Up', description: 'Post-call email sequences drafted from the outcome of each conversation.' },
                ],
              },
              {
                name: 'FULL CYCLE',
                entries: [
                  { name: 'Offer Development', description: 'Wrote the pitch, positioning, and pricing from scratch.' },
                  { name: 'Cold-Call Scripting', description: 'Built the outbound scripts that sold the work.' },
                  { name: 'Discovery & Close', description: 'Took every 30-minute discovery personally and closed direct.' },
                  { name: 'Client Onboarding', description: 'Owned each client\u2019s setup end-to-end \u2014 no support queue.' },
                  { name: 'Monthly Iteration', description: 'Prompts, targeting, and sequence logic tuned every cycle based on what ran.' },
                ],
              },
              {
                name: 'OUTBOUND METRICS',
                kind: 'stats',
                entries: [
                  { name: '2,000+', description: 'Emails per month' },
                  { name: '44%', description: 'Open rate' },
                  { name: '7%', description: 'Reply rate' },
                  { name: '$750/mo', description: 'Retainer close' },
                ],
              },
            ],
          },
          {
            kind: 'moments',
            title: 'Case Studies',
            moments: [
              {
                title: 'The Outbound Engine',
                teaser: 'Eight stages, one pipeline, double the industry benchmark.',
                body: "Scrape Google Maps for the target vertical and geography. Pre-filter by category, size, and website signals. Parse structured data and detect hiring signals, ad spend, and tech stack. Run the record through an Apollo \u2192 Hunter \u2192 Snov enrichment waterfall so each step fills what the prior missed. Score intent 0\u2013100 based on contact quality and website signals. Route to Snov campaigns by vertical. Generate a sequence-aware daily call queue with per-lead pitch angles, then draft Initial / Bump / Breakup follow-ups from the outcome of every call. 5,000+ intent-scored leads. 44% open. 7% reply.",
              },
              {
                title: 'The Med Spa Win',
                teaser: "The front desk couldn\u2019t follow up consistently. The agent never missed.",
                body: "A med spa was losing membership conversion at the consultation-to-commit step. I built a custom AI agent that books consultations, sends pre-visit prep, handles post-visit follow-up, and nudges consults toward membership with personalized offers. The agent never forgets, never takes a day off, and never argues about who owns the follow-up. Membership conversion rate lifted 38%.",
              },
              {
                title: 'The Dual Track',
                teaser: "The sales operator shouldn\u2019t be downstream of the AI team.",
                body: "Enertia shipped alongside a full-time SDR role at ServiceTitan. Same person writing cold-call scripts by day was writing prompts by night. That combination was the whole thesis \u2014 sales operators usually consume AI tooling, not build it. The portfolio version of this role isn\u2019t a side hustle; it\u2019s proof that someone from the commercial side can architect and ship production AI.",
              },
            ],
          },
        ],
      },
      {
        index: '02',
        company: 'SERVICETITAN',
        role: 'SALES DEVELOPMENT REPRESENTATIVE',
        year: '2025 — Present',
        stat: '104% Q1 · 17% CLOSE · NOOKS BETA',
        descriptor: 'SDR by day. AI systems by night.',
        hook: 'The step back turned out to be the sharpest forward move I\u2019ve made in years.',
        pageVariant: 'narrative',
        orgBrief: {
          tagline: 'Complete field software for the trades.',
          data: [
            { label: 'Valuation', value: '$10B+ · NASDAQ: TTAN' },
            { label: 'Vertical', value: 'Service trades' },
            { label: 'ICP', value: 'Multi-truck SMB contractors' },
            { label: 'My Segment', value: 'SMB Trades · Hybrid AE scope' },
          ],
        },
        story: [
          "Mark Cuban\u2019s advice for former founders is simple: get into sales. Master sales. I took him at his word \u2014 and when the job market tightened, an SDR seat at ServiceTitan was how I made the constraint productive.",
          "The SMB Trades seat isn\u2019t what most people picture when they hear \u201cSDR.\u201d It\u2019s source-to-meeting, but the meeting is real \u2014 30- to 60-minute GAP-methodology discovery calls with contractors running multi-truck operations. I\u2019m getting into their workflow top to bottom, quantifying their pain in dollars, and qualifying the demo before an AE ever picks it up. It\u2019s the hardest SDR role I\u2019ve seen.",
          "I built a Chrome extension to augment the work. It researches the prospect for buying signals, enriches records, generates pitch angles, surfaces objection handles pulled from my prior notes, and drafts outbound emails. It listens to live calls and gives real-time coaching. It runs role-play simulations with AI decision-makers so I can rehearse new objection patterns before I hit them on the phone. Same class of tooling I\u2019m shipping at Enertia \u2014 just turned inward on my own workflow.",
          "The numbers followed. 104% of Q1 quota. 17% close-won on sourced opportunities. Selected for the Nooks beta program to provide product feedback that shaped the rollout across the rest of the sales org. Trained newer SDRs on the tooling and the methodology.",
          "The SDR seat was supposed to be a step back. It turned into the most productive constraint I\u2019ve had in years \u2014 combat-tested sales craft during the day, AI systems building at night, and a front-row seat to where the next generation of revenue tooling actually gets built.",
        ],
        stats: [
          { value: '104%', label: 'Q1 quota attainment' },
          { value: '17%', label: 'Close-won on sourced opps' },
          { value: '7', label: 'Chrome extension features' },
          { value: 'Nooks Beta', label: 'Selected for product feedback' },
        ],
        skills: ['OUTBOUND', 'GAP METHODOLOGY', 'DISCOVERY', 'AI TOOLING', 'ENTERPRISE SAAS', 'SALES ENGINEERING'],
        sections: [
          {
            kind: 'skills',
            title: 'What I Got Good At',
            categories: [
              {
                name: 'SALES CRAFT',
                entries: [
                  { name: 'GAP Methodology', description: 'Full-cycle discovery that moves prospects from surface pain to quantified cost-of-inaction.' },
                  { name: 'Consultative & Conversational Discovery', description: '30\u201360 minute deep-dives mapping workflow top to bottom before any demo hand-off.' },
                  { name: 'Objection Handling', description: 'Note-backed responses drafted from prior calls, surfaced in real time during live conversations.' },
                  { name: 'Pipeline Architecture', description: 'Multi-touch sequencing across outbound channels, structured around ICP signal over volume.' },
                ],
              },
              {
                name: 'SYSTEMS & TOOLING',
                entries: [
                  { name: 'Chrome Extension Development', description: 'Built a 7-feature AI tool deployed into my own daily workflow \u2014 buying signals, pitch angles, call coaching, role-play simulations.' },
                  { name: 'Prompt Engineering', description: 'Context-aware prompts for research, personalization, and follow-up drafted in my own voice.' },
                  { name: 'AI Agent Orchestration', description: 'Live-call coaching agents and AI decision-maker role-play for objection rehearsal.' },
                  { name: 'Workflow Automation', description: 'Enrichment, sourcing, and handoff flows connecting Apollo, HubSpot, and Salesforce.' },
                ],
              },
              {
                name: 'FUNNEL METRICS',
                kind: 'stats',
                entries: [
                  { name: '68.3%', description: 'Booked Meeting Rate' },
                  { name: '81%', description: 'Stick Rate' },
                  { name: '$78K', description: 'Average TCV' },
                  { name: '91%', description: 'Qualification Rate' },
                ],
              },
            ],
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
    <div ref={ref} style={{ marginBottom: 80, minHeight: 32 }}>
      <span style={{
        color: '#FF3A2D',
        fontSize: 22,
        fontWeight: 700,
        letterSpacing: '0.18em',
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
          fontSize: 13,
          fontWeight: 700,
          letterSpacing: '0.22em',
          color: '#FF3A2D',
          opacity: 0.82,
          textTransform: 'uppercase',
          lineHeight: 1.4,
        }}>
          {act.title}
        </div>
        <div style={{
          fontSize: 11,
          letterSpacing: '0.18em',
          color: '#FF3A2D',
          opacity: 0.5,
          textTransform: 'uppercase',
          marginTop: 4,
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
        opacity: 0.5,
        fontSize: 13,
        fontWeight: 500,
        letterSpacing: '0.12em',
        paddingTop: 16,
        fontVariantNumeric: 'tabular-nums',
      }}>
        {exp.index}
      </div>

      <div style={{ minWidth: 0 }}>
        <div style={{
          color: '#FF3A2D',
          fontSize: 14,
          fontWeight: 600,
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          opacity: 0.65,
          marginBottom: 10,
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
        animate={{ opacity: hovered ? 0.95 : 0.6 }}
        transition={{ duration: 0.18 }}
        style={{
          color: '#FF3A2D',
          fontSize: 13,
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
        gap: 10,
        alignSelf: 'center',
      }}>
        <span style={{
          color: '#FF3A2D',
          fontSize: 13,
          opacity: 0.55,
          letterSpacing: '0.12em',
          fontVariantNumeric: 'tabular-nums',
        }}>
          {exp.year}
        </span>
        <motion.span
          animate={{ x: hovered ? 4 : 0, opacity: hovered ? 0.95 : 0.45 }}
          transition={{ duration: 0.15 }}
          style={{ color: '#FF3A2D', fontSize: 16, lineHeight: 1 }}
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
