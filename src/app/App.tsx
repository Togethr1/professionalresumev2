import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import type { Application } from '@splinetool/runtime';
import { useCallback, useEffect, useRef, useState } from 'react';
import Spline from '@splinetool/react-spline';
import BoxLoader from '@/components/ui/box-loader';
import { CardStack, type CardStackItem } from '@/components/ui/card-stack';
import { DetailModal } from '@/components/ui/detail-modal';

const BACKGROUND_SCENE =
  'https://prod.spline.design/EQavBdS0VzI0JMhz/scene.splinecode';
const HERO_SCENE =
  'https://prod.spline.design/t9GfLONmKieEKF4l/scene.splinecode';

type ExpertiseItem = CardStackItem & {
  number: string;
  details: string[];
};

const expertiseItems: ExpertiseItem[] = [
  {
    id: 1,
    number: '01',
    title: 'Growth Strategy',
    description:
      'Building scalable frameworks that turn insights into repeatable systems',
    imageSrc:
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1800&q=80',
    href: 'https://www.mckinsey.com/capabilities/growth-marketing-and-sales/our-insights',
    details: [
      'Designed and implemented end-to-end growth frameworks that scaled startups from zero to predictable revenue.',
      'Built data-driven experimentation loops across acquisition, activation, and retention to compound growth over time.',
      'Created cross-functional alignment between product, marketing, and sales to remove silos and accelerate pipeline velocity.',
    ],
  },
  {
    id: 2,
    number: '02',
    title: 'Sales Operations',
    description:
      'Designing processes that convert and scale efficiently',
    imageSrc:
      'https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=1800&q=80',
    href: 'https://www.gartner.com/en/sales/insights/sales-operations',
    details: [
      'Architected CRM workflows and lead-scoring models that increased conversion rates by standardizing the sales motion.',
      'Implemented territory planning, quota modeling, and pipeline analytics to give leadership full visibility into forecast accuracy.',
      'Reduced sales cycle length by streamlining handoff processes and automating repetitive admin tasks for reps.',
    ],
  },
  {
    id: 3,
    number: '03',
    title: 'Marketing Systems',
    description:
      'Creating automated pipelines that drive predictable pipeline growth',
    imageSrc:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1800&q=80',
    href: 'https://www.hubspot.com/marketing/marketing-automation',
    details: [
      'Built multi-channel demand-gen engines spanning paid, organic, email, and partner channels with full attribution.',
      'Designed marketing automation workflows that nurtured leads through personalized journeys, increasing MQL-to-SQL rates.',
      'Established reporting dashboards and feedback loops between marketing and sales to continuously optimize spend and messaging.',
    ],
  },
  {
    id: 4,
    number: '04',
    title: 'Customer Success',
    description:
      'Engineering retention systems that compound value over time',
    imageSrc:
      'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1800&q=80',
    href: 'https://www.gainsight.com/customer-success/',
    details: [
      'Developed health-scoring models and proactive outreach playbooks that reduced churn and expanded net revenue retention.',
      'Built onboarding programs that accelerated time-to-value and drove product adoption in the critical first 90 days.',
      'Created customer feedback loops that funneled insights into product roadmap priorities, closing the loop between success and engineering.',
    ],
  },
];

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const backgroundAppRef = useRef<Application | null>(null);
  const heroAppRef = useRef<Application | null>(null);
  const [backgroundReady, setBackgroundReady] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [loaderMinElapsed, setLoaderMinElapsed] = useState(false);
  const [showHeroSpline, setShowHeroSpline] = useState(false);
  const appReady = backgroundReady && loaderMinElapsed;
  const [modalItem, setModalItem] = useState<(typeof expertiseItems)[number] | null>(null);

  const handleBackgroundLoad = useCallback((app: Application) => {
    backgroundAppRef.current = app;
    app.setGlobalEvents(true);
    app.play();
    app.requestRender();
    // Wait for the GPU to actually paint the first frames before revealing
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setBackgroundReady(true);
      });
    });
  }, []);
  const handleSplineLoad = useCallback((app: Application) => {
    heroAppRef.current = app;
    app.setGlobalEvents(true);
    app.setZoom(1);
    app.play();
    app.requestRender();
  }, []);
  const heroDrop = {
    hidden: { opacity: 0, y: -40 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] },
    },
  };

  useEffect(() => {
    const media = window.matchMedia('(min-width: 1024px)');
    const sync = () => setIsDesktop(media.matches);
    sync();
    media.addEventListener('change', sync);
    return () => media.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoaderMinElapsed(true), 1200);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    let moveRaf: number | null = null;
    let lastMoveEvent: MouseEvent | null = null;

    const getApps = () =>
      [backgroundAppRef.current, heroAppRef.current].filter(
        (app): app is Application => Boolean(app),
      );

    const dispatchMouse = (type: string, e: MouseEvent) => {
      const apps = getApps();
      apps.forEach((app) => {
        app.canvas.dispatchEvent(
          new MouseEvent(type, {
            bubbles: true,
            clientX: e.clientX,
            clientY: e.clientY,
            button: e.button,
            buttons: e.buttons,
            ctrlKey: e.ctrlKey,
            shiftKey: e.shiftKey,
            altKey: e.altKey,
            metaKey: e.metaKey,
            view: window,
          }),
        );
        app.requestRender();
      });
    };

    const handleMove = (e: MouseEvent) => {
      lastMoveEvent = e;
      if (moveRaf !== null) return;
      moveRaf = window.requestAnimationFrame(() => {
        moveRaf = null;
        if (!lastMoveEvent) return;
        dispatchMouse('mousemove', lastMoveEvent);
      });
    };

    const handleDown = (e: MouseEvent) => dispatchMouse('mousedown', e);
    const handleUp = (e: MouseEvent) => dispatchMouse('mouseup', e);
    const handleClick = (e: MouseEvent) => dispatchMouse('click', e);

    window.addEventListener('mousemove', handleMove, { passive: true });
    window.addEventListener('mousedown', handleDown, { passive: true });
    window.addEventListener('mouseup', handleUp, { passive: true });
    window.addEventListener('click', handleClick, { passive: true });

    return () => {
      if (moveRaf !== null) window.cancelAnimationFrame(moveRaf);
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mousedown', handleDown);
      window.removeEventListener('mouseup', handleUp);
      window.removeEventListener('click', handleClick);
    };
  }, []);

  useEffect(() => {
    if (!appReady || !isDesktop) {
      setShowHeroSpline(false);
      return;
    }

    let timeoutId: number | null = null;
    let idleId: number | null = null;

    const startHeroSpline = () => {
      timeoutId = window.setTimeout(() => setShowHeroSpline(true), 600);
    };

    if ('requestIdleCallback' in window) {
      idleId = window.requestIdleCallback(startHeroSpline, { timeout: 1800 });
    } else {
      startHeroSpline();
    }

    return () => {
      if (timeoutId !== null) window.clearTimeout(timeoutId);
      if (idleId !== null && 'cancelIdleCallback' in window) {
        window.cancelIdleCallback(idleId);
      }
    };
  }, [appReady, isDesktop]);

  return (
    <div
      ref={containerRef}
      className="relative isolate text-white"
    >
      <div aria-hidden="true" className="fixed inset-0 z-0 bg-white" />
      <div
        aria-hidden="true"
        style={{ willChange: appReady ? 'auto' : 'opacity' }}
        className={`pointer-events-none fixed inset-0 z-0 overflow-hidden transition-opacity duration-700 ease-out ${
          appReady ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <Spline
          scene={BACKGROUND_SCENE}
          className="background-spline h-full w-full"
          onLoad={handleBackgroundLoad}
        />
      </div>

      <div
        style={{ willChange: appReady ? 'auto' : 'opacity' }}
        className={`fixed inset-0 z-50 flex items-center justify-center bg-white transition-opacity duration-700 ease-out ${
          appReady ? 'pointer-events-none opacity-0' : 'opacity-100'
        }`}
      >
        <BoxLoader />
      </div>

      <div
        className={`relative z-10 transition-opacity duration-400 ${
          appReady ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Hero */}
        <section className="min-h-screen flex items-center justify-center px-8 relative overflow-hidden">
          {showHeroSpline && (
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 -right-[3vw] z-[14] hidden w-[58vw] min-w-[520px] max-w-[980px] items-start justify-end pt-6 lg:flex"
            >
              <div
                aria-hidden="true"
                className="absolute inset-y-[12%] right-[4%] w-[78%] rounded-[40%] bg-[radial-gradient(circle,rgba(255,255,255,0.2)_0%,rgba(255,255,255,0.08)_34%,rgba(255,255,255,0)_74%)] blur-xl"
              />
              <div className="spline-stage relative h-[86vh] w-full -translate-y-[8%] translate-x-[6%] scale-[1.08] overflow-hidden opacity-[0.96] [filter:brightness(1.06)_contrast(1.04)_drop-shadow(0_0_14px_rgba(255,255,255,0.1))]">
                <Spline
                  scene={HERO_SCENE}
                  className="spline-canvas h-full w-full"
                  onLoad={handleSplineLoad}
                />
              </div>
            </div>
          )}

          <motion.div
            className="relative z-20 max-w-screen-2xl mx-auto w-full"
            initial="hidden"
            animate="show"
            transition={{ staggerChildren: 0.12, delayChildren: 0.1 }}
          >
            <motion.div variants={heroDrop}>
              <h1 className="-ml-3 md:-ml-6 text-[12vw] md:text-[9vw] font-bold leading-[0.9] tracking-tight mb-12 text-black">
                MICHAEL
                <br />
                LOMBARDI
              </h1>
            </motion.div>

            <motion.div className="flex items-end" variants={heroDrop}>
              <div className="max-w-md">
                <p className="text-lg text-neutral-400 mb-8">
                  Building scalable systems that transform sales, marketing, and
                  operations into predictable growth engines.
                </p>
                <motion.button
                  className="group relative overflow-hidden px-8 py-4 bg-white text-black text-sm tracking-wider"
                  whileHover="hover"
                >
                  <motion.div
                    className="absolute inset-0 bg-neutral-800"
                    initial={{ x: '-100%' }}
                    variants={{
                      hover: { x: 0 },
                    }}
                    transition={{ duration: 0.3 }}
                  />
                  <span className="relative z-10 group-hover:text-white transition-colors flex items-center gap-2">
                    GET IN TOUCH
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </section>

      {/* Expertise — Card Stack */}
      <section className="relative overflow-hidden bg-[#050608] px-8 py-32 text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_8%,rgba(255,255,255,0.09),rgba(255,255,255,0)_42%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.75)_0%,rgba(0,0,0,0)_70%)]"
        />
        <div className="relative mx-auto max-w-screen-2xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-20"
          >
            <h2 className="mb-4 text-8xl font-bold text-white">What I Do</h2>
            <p className="max-w-2xl text-xl text-neutral-300">
              Former founder with a track record of building growth systems from
              zero to scale.
            </p>
          </motion.div>

          <CardStack
            items={expertiseItems}
            initialIndex={0}
            showDots
            maxVisible={5}
            cardWidth={780}
            cardHeight={430}
            overlap={0.67}
            spreadDeg={30}
            depthPx={115}
            tiltXDeg={6}
            className="mx-auto max-w-[1420px]"
            onActiveClick={(item) => setModalItem(item)}
          />
        </div>
      </section>

      <DetailModal
        open={!!modalItem}
        onClose={() => setModalItem(null)}
        title={modalItem?.title ?? ''}
        number={modalItem?.number ?? ''}
      >
        {modalItem?.details.map((d, i) => (
          <p key={i}>{d}</p>
        ))}
      </DetailModal>

      {/* Experience */}
      <section className="px-8 py-32 bg-white text-black">
        <div className="max-w-screen-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-20"
          >
            <h2 className="text-8xl font-bold">Experience</h2>
          </motion.div>

          <div className="space-y-1">
            {[
              {
                role: 'Founder & CEO',
                company: 'Your Company',
                period: '2020—2024',
                impact: 'Built 0→XX customer growth system. $XXM revenue.',
              },
              {
                role: 'VP of Growth',
                company: 'Previous Company',
                period: '2018—2020',
                impact: 'Led XX-person team. XX% revenue growth.',
              },
              {
                role: 'Growth Lead',
                company: 'Earlier Company',
                period: '2016—2018',
                impact: 'Scaled acquisition XX%. Foundational playbooks.',
              },
            ].map((exp, i) => (
              <motion.div
                key={i}
                className="border-t border-neutral-200 py-12 grid grid-cols-12 gap-8 group cursor-pointer hover:bg-neutral-50 px-8 -mx-8 transition-colors"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
              >
                <div className="col-span-1 text-neutral-400 text-sm pt-2">
                  0{i + 1}
                </div>
                <div className="col-span-7">
                  <h3 className="text-4xl font-bold mb-2 group-hover:translate-x-2 transition-transform">
                    {exp.role}
                  </h3>
                  <p className="text-xl text-neutral-600">{exp.company}</p>
                </div>
                <div className="col-span-2 pt-2">
                  <div className="text-neutral-500">{exp.period}</div>
                </div>
                <div className="col-span-2 pt-2">
                  <div className="text-neutral-600 text-sm">{exp.impact}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools & Tech */}
      <section className="px-8 py-32">
        <div className="max-w-screen-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-20"
          >
            <h2 className="text-8xl font-bold mb-4">Stack</h2>
          </motion.div>

          <div className="grid grid-cols-4 gap-4">
            {[
              'Salesforce',
              'HubSpot',
              'Marketo',
              'Segment',
              'Amplitude',
              'Mixpanel',
              'Tableau',
              'Looker',
              'Zapier',
              'Clearbit',
              'Gong',
              'Chorus',
              'Outreach',
              'SalesLoft',
              'Intercom',
              'Zendesk',
            ].map((tool, i) => (
              <motion.div
                key={i}
                className="border border-neutral-800 p-8 text-center text-xl hover:bg-white hover:text-black transition-colors cursor-pointer"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.02, duration: 0.4 }}
                whileHover={{ scale: 1.05 }}
              >
                {tool}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="px-8 py-48 relative overflow-hidden">
        <motion.div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, transparent 70%)',
          }}
        />

        <div className="max-w-screen-2xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-[12vw] font-bold leading-none mb-12">
              LET&apos;S TALK
            </h2>
            <motion.a
              href="mailto:your.email@example.com"
              className="inline-block text-6xl font-bold hover:text-neutral-400 transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              your.email@example.com
            </motion.a>
          </motion.div>
        </div>
      </section>

        {/* Footer */}
        <footer className="border-t border-neutral-900 px-8 py-12">
          <div className="max-w-screen-2xl mx-auto flex justify-between items-center text-sm text-neutral-600">
            <div>© 2024 All Rights Reserved</div>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white transition-colors">
                LinkedIn
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Twitter
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Email
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
