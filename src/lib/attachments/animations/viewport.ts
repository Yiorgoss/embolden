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
      prepare: (el: HTMLElement) => {
        Array.from(el.children).forEach((child) => child.classList.add("animate-child"));
        return el.querySelectorAll(".animate-child")
      },
      transforms: { opacity: [0, 1], y: [50, 0] },
      options: { duration: 0.3, ease: 'easeOut', delay: 0 }
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
      prepare: (el: HTMLElement) => { wrapLetters({ el }) },
      transforms: { opacity: [0, 1], transform: ['translateY(50%)', 'translateY(0px)'] },
      options: { duration: 0.1, ease: 'easeOut', delay: stagger(0.03) }
    },
    {
      transforms: { opacity: [1, 0], transform: ['translateY(0px)', 'translateY(50%)'] },
      options: { duration: 0.3, ease: 'easeIn' }
    }
  ],
  'drawSVG': [
    {
      prepare: (element: Element) => {
        const el = element.querySelectorAll(".animate-svg path")
        el.forEach(e => e.classList.add("animate-child")
        )
      },
      transforms: { pathLength: [0, 1] },
      options: { duration: 0.5, ease: "linear" },
    },
    {
      transforms: { pathLength: [1, 0] },
      options: { duration: 0.3, ease: "linear" },
    }],
} as { [key: string]: any }
type animationListKeys = keyof typeof animationList;

// export function animateViewport(
//   presetList: animationListKeys[] | undefined,
//   { child = ".animate-child", amount = 'some' }:
//     { child?: string, amount?: number | 'some' | 'all' } = {})
//   : Attachment {

// FIX - animation options doesnt have the right types and I CBF to deal with this shit right now right now
export function animateViewport(element: Element, { animation }: { animation: IAnimation }) {

  let amount = 1
  const { viewport, stagger, amount: customAmount, onlyEnter } = animation
  if (!viewport || viewport.length <= 0) return
  const preset = viewport[0] // cbf to add this prematurely. It does work however on the cms think it will need to merge them

  const animationArr = animationList[preset]
  const entry = animationArr[0]
  const exit = animationArr[1]


  if (!entry) return

  let elementList = element
  if (entry.prepare) {
    elementList = entry.prepare(element)
    if (exit) animate(elementList, exit.transforms, exit.options)
  }

  if (!stagger) {
    entry.options.delay = 0;
    exit.options.delay = 0;
  }
  if (customAmount && customAmount <= 1 && customAmount >= 0) {
    amount = customAmount
  }
  // there should never be reason for an exit preparation step
  // if (exit && exit.prepare) exit.prepare(element)

  // element.setAttribute("style", entry.initialCSS)
  const cleanup = inView(
    element,
    (el) => {
      // const children = el.querySelectorAll(".animate-child");
      // const elementList = children.length > 0 ? children : el
      // let elementList = [el]
      // let elementList = ".animate-child"
      const stopEntry = animate(
        elementList,
        entry.transforms,
        //@ts-ignore 
        entry.options
      );

      return () => {
        stopEntry.stop()
        if (onlyEnter) {
          // exit animations cannot be stopped shouldnt be a problem i guess
          animate(
            elementList,
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
