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
  },
}

type animationListKeys = keyof typeof animationList;

export function animateViewport(
  preset: animationListKeys | undefined,
  { child = ".animate-child", amount = 'some' }:
    { child?: string, amount?: number | 'some' | 'all' } = {})
  : Attachment {

  // FIX - animation options doesnt have the right types and I CBF to deal with this shit right now right now
  //     - find a better way to deal with intial state of css for animations
  //         - this is because the cleanup function has not run yet, so state = 0 
  return (element) => {

    if (!preset) return
    const { entry, exit } = animationList[preset]

    element.setAttribute("style", entry.initialCSS)
    const cleanup = inViewMotion(
      element,
      (el) => {
        const cards = el.querySelectorAll(child);
        const inAnimation = animate(
          cards,
          entry.transforms,
          //@ts-ignore 
          entry.options
        );
        return () => {
          inAnimation.cancel()
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
