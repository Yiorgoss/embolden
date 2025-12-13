import type { Attachment } from 'svelte/attachments';
import { scroll, animate, type AnimationOptions, type ObjectTarget } from 'motion';
import { fadeInEachWord } from './scroll-richtext';

const scrollPreset = {
  "growScrollScale": [{
    transforms: { scale: [0.7, 1.05, 1.05], y: ['40vh', '30vh', '50vh'] },
    options: { ease: 'linear' },
    offset: ['start start', 'end center'],
  }],
  'growScrollTranslate': [{
    transforms: { y: [0, '55vh'] },
    options: { ease: "linear" },
    offset: ['start start', 'end center'],
  }],
  'drawSVG': [{
    prepare: (element: Element) => element.querySelectorAll(".animate-svg > path"),
    transforms: { pathLength: [0, 1] },
    options: { ease: "linear" },
    offset: ['start 0.7', 'start 0.3'],
  }],
  'translateUp': [
    {
      transforms: { y: ["5vh", '-5vh'] },
      options: { ease: 'linear' },
      offset: ['start start', 'end end']
    }
  ],
  'translateDown': [
    {
      transforms: { y: ["-5vh", '5vh'] },
      options: { ease: 'linear' },
      offset: ['start start', 'end end']
    }
  ],
  'parallax': [
    // parallax-{background/foreground} class
    // maybe is no the best way of doing this
    {
      prepare: (element: Element) => element.querySelectorAll(".parallax-background"),
      transforms: { y: ["5vh", "-50vh"] },
      options: { duration: 0.3, ease: 'linear' },
      offset: ['start start', 'end end']
    },
    {
      prepare: (element: Element) => element.querySelectorAll(".parallax-foreground"),
      transforms: { y: ["-5vh", "20vh"] },
      options: { ease: 'linear' },
      offset: ['start start', 'end 0.5']
    },
  ],
} as { [key: string]: any }

export type PresetKeys = keyof typeof scrollPreset;


// this will return an attachment that will iterate over a preset of motion animations
// fix types once you figure out how api will look!!!
export function animateScroll(preset: PresetKeys | undefined | null,
  { prepare, transforms, options, offset }:
    { prepare?: (element: Element) => void, transforms?: any, options?: any, offset?: any } = {}): Attachment {
  return (element) => {
    if (!preset) return

    const cancelList: (() => void)[] = []

    let animationList = {}
    if (preset == 'custom') {
      animationList = [
        {
          prepare,
          transforms,
          options,
          offset
        }
      ]
    } else if (preset == 'fadeInEachWord') {
      // special cases
      return fadeInEachWord(element)
    } else {
      animationList = scrollPreset[preset]
    }

    //@ts-ignore FIX types
    animationList.forEach((animation) => {
      const { transforms, options, offset, prepare } = animation

      let elementList = [element]
      if (prepare) elementList = prepare(element)
      const cancel = scroll(
        animate(
          elementList,
          transforms, //temp fix 22/10/25 lol
          options
        ),
        {
          target: element, // parent
          offset: offset as any // No ScrollOptions
        }
      );
      cancelList.push(cancel)
    })
    return () => cancelList.forEach((cancel) => cancel())
  }

  //@ts-ignore FIX types
  animationList.forEach((animation) => {
    const { transforms, options, offset, prepare } = animation || {}

    if (prepare && !transforms && !options && !offset) {
      prepare(element)
    } else {
      let elementList = [element] //what is this for? should be commented
      if (prepare) elementList = prepare(element)
      // seems to be a race condition when animating text that asyncs in
      // so rerun effect when loads
      try {
        const cancel = motionScroll(
          animate(
            elementList,
            transforms,
            options
          ),
          {
            target: element, // parent
            offset: offset as any // No ScrollOptions
          }
        );
        cancelList.push(cancel)
      }
      catch (err) {
        // just fail quietly. if the animation target is not found what are you gonna do? cry about it?
        // log it on debug if logging was enabled
        return
      }
    }
  })
  return () => cancelList.forEach((cancel) => cancel())
  // }
};
