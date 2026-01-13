import { animate, transform, scroll, steps } from "motion";

export function fadeInEachWord(element: Element) {
  // might be able to speed this up using delay - stagger
  // and splitword utility - https://github.com/lukePeavey/SplitType
  const words = element.querySelectorAll('.animate-word');

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

