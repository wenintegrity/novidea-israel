// Scroll-entrance animations (docs/design-system.md §6.1), built on Motion (motion.dev).
//
// Markup API:
//   data-animate="fade-up | fade-in | zoom-in | fade-start | fade-end"   animate one element
//   data-animate-children="<type>"                                        animate each child in turn
//   data-animate-delay="0.1"                                              extra delay in seconds
//
// "start" and "end" follow the reading direction: in Hebrew, fade-start enters from the right.
//
// Progressive enhancement: nothing is hidden by CSS. This script hides only elements that are
// still below the fold when it runs, then reveals them as they scroll in. Without JavaScript, or
// with "reduce motion" turned on, everything is simply visible.
import { animate } from 'motion/mini';
import { inView } from 'motion';

type Kind = 'fade-up' | 'fade-in' | 'zoom-in' | 'fade-start' | 'fade-end';

const DISTANCE = 24; // px
const DURATION = 0.6; // s
const STAGGER = 0.08; // s between children
const EASE: [number, number, number, number] = [0.2, 0.8, 0.2, 1]; // = --ease-out token

function fromTransform(kind: Kind, rtl: boolean): string {
  const startX = rtl ? DISTANCE : -DISTANCE; // the inline-start side
  switch (kind) {
    case 'fade-in':
      return 'none';
    case 'zoom-in':
      return 'scale(0.96)';
    case 'fade-start':
      return `translateX(${startX}px)`;
    case 'fade-end':
      return `translateX(${-startX}px)`;
    default:
      return `translateY(${DISTANCE}px)`;
  }
}

function isKind(value: string | undefined): value is Kind {
  return ['fade-up', 'fade-in', 'zoom-in', 'fade-start', 'fade-end'].includes(value ?? '');
}

function belowFold(el: Element): boolean {
  return el.getBoundingClientRect().top > window.innerHeight;
}

function reveal(targets: HTMLElement[], kind: Kind, rtl: boolean, baseDelay: number) {
  // Hide now (still off-screen, so no flash), reveal when the group scrolls into view.
  const from = fromTransform(kind, rtl);
  for (const el of targets) {
    el.style.opacity = '0';
    el.style.transform = from;
  }
  return (index: number, el: HTMLElement) =>
    animate(
      el,
      { opacity: [0, 1], transform: [from, 'none'] },
      { duration: DURATION, delay: baseDelay + index * STAGGER, ease: EASE },
    );
}

function init() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const rtl = document.documentElement.dir === 'rtl';

  // Single elements
  document.querySelectorAll<HTMLElement>('[data-animate]').forEach((el) => {
    const kind = isKind(el.dataset.animate) ? el.dataset.animate : 'fade-up';
    if (!belowFold(el)) return;
    const play = reveal([el], kind, rtl, Number(el.dataset.animateDelay ?? 0));
    const stop = inView(el, () => {
      play(0, el);
      stop();
    }, { amount: 0.15 });
  });

  // Groups: children enter one after another
  document.querySelectorAll<HTMLElement>('[data-animate-children]').forEach((group) => {
    const kind = isKind(group.dataset.animateChildren) ? group.dataset.animateChildren : 'fade-up';
    if (!belowFold(group)) return;
    const children = Array.from(group.children) as HTMLElement[];
    const play = reveal(children, kind, rtl, Number(group.dataset.animateDelay ?? 0));
    const stop = inView(group, () => {
      children.forEach((child, i) => play(i, child));
      stop();
    }, { amount: 0.1 });
  });
}

init();
