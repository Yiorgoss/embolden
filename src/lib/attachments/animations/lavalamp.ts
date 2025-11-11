import type { Attachment } from "svelte/attachments";
import type { AnimationControls } from '@motionone/types';
import { animate } from "motion"
import { prefersReducedMotion } from "svelte/motion";

const keyframeObj = [
  {
    anim: { rotate: [0, -180, 0] },
    seq: { duration: 30, repeat: Infinity, ease: 'linear' }
  },
  {
    anim: { x: ['-10%', '40%', '-10%'], y: ['-40%', '0%', '-40%'] },
    seq: { duration: 30, repeat: Infinity, ease: 'easeInOut' }
  },
  {
    anim: { rotate: [0, 100, 0] },
    seq: { duration: 20, repeat: Infinity, ease: 'easeInOut' }
  },
  {
    anim: { x: ['40%', '-40%', '40%'], y: ['-40%', '30%', '-40%'] },
    seq: { duration: 20, repeat: Infinity, ease: 'easeInOut' }
  },
  {
    anim: { y: ['-30%', '50%', '-30%'] },
    seq: { duration: 20, repeat: Infinity, ease: 'linear' }
  }
];

export function lavalamp(str: string): Attachment {
  return (element) => {
    if (prefersReducedMotion.current) return
    const wrap = keyframeObj.length;
    const animations: AnimationControls[] = [];
    element.querySelectorAll('.gradient-id').forEach((word, i) => {
      const { anim, seq } = keyframeObj[i % wrap];
      //@ts-ignore // seems to work idk why ts error
      animations.push(animate(word, anim, seq));
    });

    return () => animations.forEach((a) => a.cancel());

  }
};
