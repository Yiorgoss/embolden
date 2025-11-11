import { animate, transform, scroll } from "motion";
import type { Attachment } from "svelte/attachments";
import { prefersReducedMotion } from "svelte/motion";

export function scrollRichText({ preset }: { preset?: string | null }): Attachment {
  return (element) => {
    if (prefersReducedMotion.current) return
    const words = element.querySelectorAll('.word');
    const len = words.length;
    const cleanup: (() => void)[] = [];

  const len = words.length;
  const cleanup: (() => void)[] = [];

  words.forEach((word, i) => {
    const start = i / len;
    const end = start + 1 / len;
    const cancel = scroll(
      (progress: number) => {
        const opacity = progress > start ? 1 : 0.2
        animate(word, { opacity }, { ease: steps(1) });
      },
      {
        target: word,
        offset: ['start end', 'end center']
      }
    );
    cleanup.push(cancel);
  });

  return () => cleanup.forEach((cancel) => cancel());
};

