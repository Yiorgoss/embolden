import type { Attachment } from 'svelte/attachments';
import { animateScroll } from "./scroll"
import { animateViewport } from "./viewport"
import type { IAnimation } from '@payload-types';
import { prefersReducedMotion } from 'svelte/motion';

export function animate({ animation }: { animation: IAnimation | undefined }): Attachment {

  if (prefersReducedMotion.current) return () => { }
  if (!animation) return () => { }
  switch (animation.type) {
    case 'scroll':
      return (element) => animateScroll(element, { animation })
    case 'viewport':
      return (element) => animateViewport(element, { animation })
    default:
      return () => { }
  }
};
