import * as React from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { SquareArrowOutUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export type CardStackItem = {
  id: string | number;
  title: string;
  description?: string;
  imageSrc?: string;
  href?: string;
  ctaLabel?: string;
  tag?: string;
};

export type CardStackProps<T extends CardStackItem> = {
  items: T[];
  initialIndex?: number;
  maxVisible?: number;
  cardWidth?: number;
  cardHeight?: number;
  overlap?: number;
  spreadDeg?: number;
  perspectivePx?: number;
  depthPx?: number;
  tiltXDeg?: number;
  activeLiftPx?: number;
  activeScale?: number;
  inactiveScale?: number;
  springStiffness?: number;
  springDamping?: number;
  loop?: boolean;
  showDots?: boolean;
  className?: string;
  onChangeIndex?: (index: number, item: T) => void;
  onActiveClick?: (item: T) => void;
  renderCard?: (item: T, state: { active: boolean }) => React.ReactNode;
};

function wrapIndex(n: number, len: number) {
  if (len <= 0) return 0;
  return ((n % len) + len) % len;
}

function signedOffset(i: number, active: number, len: number, loop: boolean) {
  const raw = i - active;
  if (!loop || len <= 1) return raw;
  const alt = raw > 0 ? raw - len : raw + len;
  return Math.abs(alt) < Math.abs(raw) ? alt : raw;
}

export function CardStack<T extends CardStackItem>({
  items,
  initialIndex = 0,
  maxVisible = 5,
  cardWidth = 760,
  cardHeight = 430,
  overlap = 0.64,
  spreadDeg = 34,
  perspectivePx = 1700,
  depthPx = 120,
  tiltXDeg = 8,
  activeLiftPx = 10,
  activeScale = 1.01,
  inactiveScale = 0.9,
  springStiffness = 280,
  springDamping = 28,
  loop = true,
  showDots = true,
  className,
  onChangeIndex,
  onActiveClick,
  renderCard,
}: CardStackProps<T>) {
  const reduceMotion = useReducedMotion();
  const len = items.length;
  const stageRef = React.useRef<HTMLDivElement>(null);

  const [active, setActive] = React.useState(() =>
    wrapIndex(initialIndex, len),
  );
  const [stageWidth, setStageWidth] = React.useState(0);

  React.useEffect(() => {
    const node = stageRef.current;
    if (!node || typeof ResizeObserver === 'undefined') return;

    const update = () => {
      setStageWidth(node.clientWidth);
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  React.useEffect(() => {
    setActive((a) => wrapIndex(a, len));
  }, [len]);

  React.useEffect(() => {
    if (!len) return;
    onChangeIndex?.(active, items[active]!);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  const maxOffset = Math.max(0, Math.floor(maxVisible / 2));
  const resolvedStageWidth = stageWidth > 0 ? stageWidth : cardWidth + 64;
  const resolvedCardWidth = Math.min(
    cardWidth,
    Math.max(280, Math.round(resolvedStageWidth - 64)),
  );
  const resolvedCardHeight = Math.round(
    (resolvedCardWidth / cardWidth) * cardHeight,
  );
  const cardSpacing = Math.max(8, Math.round(resolvedCardWidth * (1 - overlap)));
  const stepDeg = maxOffset > 0 ? spreadDeg / maxOffset : 0;

  const canGoPrev = loop || active > 0;
  const canGoNext = loop || active < len - 1;

  const prev = React.useCallback(() => {
    if (!len || !canGoPrev) return;
    setActive((a) => wrapIndex(a - 1, len));
  }, [canGoPrev, len]);

  const next = React.useCallback(() => {
    if (!len || !canGoNext) return;
    setActive((a) => wrapIndex(a + 1, len));
  }, [canGoNext, len]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'ArrowRight') next();
  };

  if (!len) return null;
  const activeItem = items[active]!;

  return (
    <div className={cn('w-full', className)}>
      {/* Stage */}
      <div
        ref={stageRef}
        className="relative mx-auto w-full overflow-hidden outline-none"
        style={{ height: Math.max(420, resolvedCardHeight + 130) }}
        tabIndex={0}
        onKeyDown={onKeyDown}
      >
        {/* Ambient glow */}
        <div
          className="pointer-events-none absolute inset-x-0 top-[43%] -translate-y-1/2 mx-auto h-[64%] w-[74%] rounded-full bg-cyan-300/8 blur-[120px]"
          aria-hidden="true"
        />
        {/* Ground shadow */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-2 mx-auto h-28 w-[58%] rounded-full bg-black/70 blur-3xl"
          aria-hidden="true"
        />

        <div
          className="absolute inset-0 flex items-end justify-center"
          style={{ perspective: `${perspectivePx}px` }}
        >
          <AnimatePresence initial={false}>
            {items.map((item, i) => {
              const off = signedOffset(i, active, len, loop);
              const abs = Math.abs(off);
              if (abs > maxOffset) return null;

              const rotateZ = off * stepDeg;
              const x = off * cardSpacing;
              const y = abs * 28;
              const z = -abs * depthPx;
              const isActive = off === 0;
              const scale = isActive ? activeScale : inactiveScale;
              const lift = isActive ? -activeLiftPx : 0;
              const rotateX = isActive ? 0 : tiltXDeg + abs * 0.7;
              const rotateY = off * -5;
              const zIndex = 100 - abs;

              const dragProps = isActive
                ? {
                    drag: 'x' as const,
                    dragConstraints: { left: 0, right: 0 },
                    dragElastic: 0.18,
                    onDragEnd: (
                      _e: any,
                      info: { offset: { x: number }; velocity: { x: number } },
                    ) => {
                      if (reduceMotion) return;
                      const travel = info.offset.x;
                      const v = info.velocity.x;
                      const threshold = Math.min(180, resolvedCardWidth * 0.2);
                      if (travel > threshold || v > 650) prev();
                      else if (travel < -threshold || v < -650) next();
                    },
                  }
                : {};

              return (
                <motion.div
                  key={item.id}
                  className={cn(
                    'absolute bottom-0 overflow-hidden rounded-[24px] border border-white/15 bg-neutral-950/30',
                    'will-change-transform select-none',
                    isActive
                      ? 'shadow-[0_28px_60px_rgba(0,0,0,0.55)] cursor-grab active:cursor-grabbing'
                      : 'shadow-[0_20px_48px_rgba(0,0,0,0.45)] cursor-pointer',
                  )}
                  style={{
                    width: resolvedCardWidth,
                    height: resolvedCardHeight,
                    zIndex,
                    transformStyle: 'preserve-3d',
                  }}
                  initial={
                    reduceMotion
                      ? false
                      : {
                          opacity: 0,
                          y: y + 40,
                          x,
                          rotateZ,
                          rotateX,
                          rotateY,
                          scale,
                        }
                  }
                  animate={{
                    opacity: 1,
                    x,
                    y: y + lift,
                    rotateZ,
                    rotateX,
                    rotateY,
                    scale,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: springStiffness,
                    damping: springDamping,
                  }}
                  onClick={() => {
                    if (isActive) {
                      onActiveClick?.(item);
                    } else {
                      setActive(i);
                    }
                  }}
                  {...dragProps}
                >
                  <div
                    className="h-full w-full"
                    style={{
                      transform: `translateZ(${z}px)`,
                      transformStyle: 'preserve-3d',
                    }}
                  >
                    {renderCard ? (
                      renderCard(item, { active: isActive })
                    ) : (
                      <DefaultFanCard item={item} active={isActive} />
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* Dots */}
      {showDots && (
        <div className="mt-8 flex items-center justify-center gap-2.5">
          <div className="flex items-center gap-2.5">
            {items.map((it, idx) => (
              <button
                key={it.id}
                onClick={() => setActive(idx)}
                className={cn(
                  'h-2 w-2 rounded-full transition',
                  idx === active
                    ? 'bg-white'
                    : 'bg-white/30 hover:bg-white/50',
                )}
                aria-label={`Go to ${it.title}`}
              />
            ))}
          </div>
          {activeItem.href && (
            <a
              href={activeItem.href}
              target="_blank"
              rel="noreferrer"
              className="text-white/45 transition hover:text-white/85"
              aria-label="Open link"
            >
              <SquareArrowOutUpRight className="h-4 w-4" />
            </a>
          )}
        </div>
      )}
    </div>
  );
}

function DefaultFanCard({
  item,
}: {
  item: CardStackItem;
  active: boolean;
}) {
  return (
    <div className="relative h-full w-full">
      <div className="absolute inset-0">
        {item.imageSrc ? (
          <img
            src={item.imageSrc}
            alt={item.title}
            className="h-full w-full object-cover"
            draggable={false}
            loading="eager"
            decoding="async"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-neutral-800 text-sm text-neutral-400">
            No image
          </div>
        )}
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/20" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_22%_20%,rgba(255,255,255,0.22),transparent_48%)]" />
      <div className="relative z-10 flex h-full flex-col justify-end p-7">
        <div className="truncate text-[clamp(1.6rem,2.2vw,2.15rem)] font-semibold tracking-tight text-white">
          {item.title}
        </div>
        {item.description && (
          <div className="mt-1 line-clamp-2 text-[clamp(1rem,1.2vw,1.85rem)] text-white/88">
            {item.description}
          </div>
        )}
      </div>
    </div>
  );
}
