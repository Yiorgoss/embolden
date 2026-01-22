import type { Attachment } from 'svelte/attachments';
import { animateScroll } from "./scroll"
import { animateViewport } from "./viewport"
import type { IAnimation } from '@payload-types';
import { prefersReducedMotion } from 'svelte/motion';
// import { animatePreset } from './preset';

export function animate({ animation }: { animation: IAnimation & { preset?: string } | undefined }): Attachment {

  if (prefersReducedMotion.current) return () => { }
  if (!animation) return () => { }
  switch (animation.type) {
    case 'scroll':
      return (element) => animateScroll(element, { animation })
    case 'viewport':
      return (element) => animateViewport(element, { animation })
    // case 'preset':
    //   return (element) => animatePreset(element, { animation })
    default:
      return () => { }
  }
};
