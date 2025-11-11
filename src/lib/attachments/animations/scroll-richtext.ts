import { animate, transform, scroll } from "motion";
import type { Attachment } from "svelte/attachments";
import { prefersReducedMotion } from "svelte/motion";

export function scrollRichText({ preset }: { preset?: string | null }): Attachment {
  return (element) => {
    if (prefersReducedMotion.current) return
    const words = element.querySelectorAll('.word');
    const len = words.length;
    const cleanup: (() => void)[] = [];

    words.forEach((word, i) => {
      const start = i / len;
      const end = start + 1 / len;
      const cancel = scroll(
        (progress: number) => {
          //  const pp = motionValue(progress); //might help with smoothing
          const opacity = transform(progress, [start, end], [0, 1])
          animate(word, { opacity }, { ease: 'linear' });
        },
        {
          target: word,
          offset: ['start center', 'end 0.3']
        }
      );
      cleanup.push(cancel);
    });

    return () => cleanup.forEach((cancel) => cancel());
  }
};

