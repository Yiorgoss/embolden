import { animate, transform, scroll, steps } from "motion";
import type { Attachment } from "svelte/attachments";

export function scrollRichText({ preset }: { preset?: string | null }): Attachment {
  return (element) => {
    const words = element.querySelectorAll('.word');
    const len = words.length;
    const cleanup: (() => void)[] = [];

    words.forEach((word, i) => {
      const start = i / len;
      const end = start + 1 / len;
      const cancel = scroll(
        (progress: number) => {
          //  const pp = motionValue(progress); //might help with smoothing
          const opacity = transform(progress, [start, end], [0.2, 1])
          animate(word, { opacity }, { ease: steps(2) });
        },
        {
          target: word,
          offset: ['start 0.9', 'end center']
        }
      );
      cleanup.push(cancel);
    });

    return () => cleanup.forEach((cancel) => cancel());
  }
};

