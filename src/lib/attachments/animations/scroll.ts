import type { Attachment } from 'svelte/attachments';
import { scroll as scrollMotion, animate, type AnimationOptions, type ObjectTarget } from 'motion';
import { prefersReducedMotion } from 'svelte/motion';

const scrollPreset = {
  "grow-scroll-scale": {
    transformArr: { scale: [0.7, 0.9, 3] },
    offset: ['start start', 'end end', 'end start'],
  },
  'grow-scroll-translate': {
    transformArr: { transform: ['none', 'translateY(30vh)'] },
    offset: ['start 0.7', 'start 0.2'],
  },
} as { [key: string]: any }

type PresetKeys = keyof typeof scrollPreset;


// fix types once you figure out how api will look!!!
export function scroll(preset: string): Attachment {
  return (element) => {
    if (prefersReducedMotion.current) return
    const { transformArr, offset } = scrollPreset[preset]
    const cancel = scrollMotion(
      animate(
        element,
        transformArr as any, //temp fix 22/10/25 lol
        { ease: ['linear'] }
      ),
      {
        target: element,
        offset: offset as any // No ScrollOptions
      }
    );

    return cancel
  }
};
