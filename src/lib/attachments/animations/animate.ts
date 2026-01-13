import type { Attachment } from 'svelte/attachments';
import { animateScroll } from "./scroll"
import { animateViewport } from "./viewport"
import type { IAnimation } from '@payload-types';

export function animate({ animation }: { animation: IAnimation | undefined }): Attachment {
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
