import { wrapLetters } from "@/utils";
import type { IAnimation } from "@payload-types";
import { animate, inView, stagger, type AnimationPlaybackControlsWithThen, type MotionNodeOptions } from "motion";
import type { Attachment } from "svelte/attachments";

const animationList = {
  'slideFadeFast': [
    {
      prepare: (el: HTMLElement) =>
        Array.from(el.children).forEach((child) => child.classList.add("animate-child")),
      transforms: { opacity: [0, 1], y: ["100%", 0] },
      options: { duration: 0.3, ease: 'easeOut', delay: stagger(0.1) }
    },
    {
      transforms: { opacity: [1, 0], y: [0, "-100%"] },
      options: { duration: 0.3, ease: 'easeIn', delay: stagger(0.1) }
    }
  ],
  'slideFadeSlow': [
    {
      prepare: (el: HTMLElement) =>
        Array.from(el.children).forEach((child) => child.classList.add("animate-child")),
      transforms: { opacity: [0, 1], y: [50, 0] },
      options: { duration: 0.3, ease: 'easeOut', delay: stagger(0.1) }
    },
    {
      transforms: { opacity: [1, 0], y: [0, -50] },
      options: { duration: 0.3, ease: 'easeIn', delay: stagger(0.1) }
    }
  ],
  "bubbleLetters": [
    {
      prepare: (el: HTMLElement) => wrapLetters({ el }),
      transforms: { opacity: [0, 1], y: [0, "-40%", 0] },
      options: { duration: 0.3, ease: 'easeOut', delay: stagger(0.02) }
    },
    {
      transforms: { opacity: [1, 0] },
      options: { duration: 0.3, ease: 'easeIn' }
    }
  ],
  "slideLetters": [
    {
      prepare: (el: HTMLElement) => wrapLetters({ el }),
      transforms: { opacity: [0, 1], y: ["100%", 0] },
      options: { duration: 0.1, ease: 'easeOut', delay: stagger(0.03) }
    },
    {
      transforms: { opacity: [1, 0] },
      options: { duration: 0.3, ease: 'easeIn' }
    }
  ]
} as { [key: string]: any }
type animationListKeys = keyof typeof animationList;

// export function animateViewport(
//   presetList: animationListKeys[] | undefined,
//   { child = ".animate-child", amount = 'some' }:
//     { child?: string, amount?: number | 'some' | 'all' } = {})
//   : Attachment {

// FIX - animation options doesnt have the right types and I CBF to deal with this shit right now right now
export function animateViewport(element: Element, { animation }: { animation: IAnimation }) {

  const amount = "all"
  const { viewport, stagger } = animation
  if (!viewport || viewport.length <= 0) return
  const preset = viewport[0] // cbf to add this prematurely. It does work however on the cms think it will need to merge them

  const animationArr = animationList[preset]
  const entry = animationArr[0]
  const exit = animationArr[1]


  if (!entry) return

  if (entry.prepare) entry.prepare(element)
  if (!stagger) {
    entry.options.delay = 0;
    if (exit) entry.options.delay = 0;
  }
  // there should never be reason for an exit preparation step
  // if (exit && exit.prepare) exit.prepare(element)

  // element.setAttribute("style", entry.initialCSS)
  const cleanup = inView(
    element,
    (el) => {
      const children = el.querySelectorAll(".animate-child");
      const targetList = children.length > 0 ? children : el
      const inAnimation = animate(
        targetList,
        entry.transforms,
        //@ts-ignore 
        entry.options
      );
      return () => {
        inAnimation.cancel()
        if (exit) {
          animate(
            targetList,
            exit.transforms,
            //@ts-ignore
            exit.options
          );
        }
      }
    },
    { amount: amount }
  );
  return () => cleanup();
}
// }
