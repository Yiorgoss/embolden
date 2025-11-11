import type { Attachment } from 'svelte/attachments';
import { scroll as scrollMotion, animate, type AnimationOptions, type ObjectTarget } from 'motion';
import { prefersReducedMotion } from 'svelte/motion';

export const scrollPreset = {
  "growScrollScale": [{
    transforms: { scale: [0.7, 1], y: ['30vh', '50vh'] },
    options: { ease: 'linear' },
    offset: ['start start', 'end center'],
  }],
  'growScrollTranslate': [{
    transforms: { y: [0, '50vh'] },
    options: { ease: "linear" },
    offset: ['start start', 'end center'],
  }],
  'drawSVG': [{
    prepare: (element: Element) => element.querySelectorAll(".animate-svg path"),
    transforms: { pathLength: [0, 1] },
    options: { ease: "linear" },
    offset: ['start 0.7', 'start 0.3'],
  }],
  'translateUp': [
    {
      transforms: { y: [100, 0] },
      options: { ease: 'linear' },
      offset: ['start end', 'start center']
    }
  ],
  'translateDown': [
    {
      transforms: { y: [100, 0] },
      options: { ease: 'linear' },
      offset: ['start end', 'start center']
    }
  ],
  'fadeIn': [
    {
      transforms: { opacity: [0, 1] },
      options: { ease: 'easeIn' },
      offset: ['start end', 'start center']
    }
  ],
  'lineFlip': [
    {
      prepare: (el: HTMLElement) => {
        let children = el.querySelectorAll(".payload-richtext > *")

        children.forEach((child) => {
          const wrapper = document.createElement("div")
          child.parentNode?.insertBefore(wrapper, child);
          wrapper.appendChild(child);

          const cloned = child.cloneNode(true) as HTMLElement
          child.after(cloned)

          wrapper.style.position = 'relative'
          wrapper.style.overflow = 'hidden'
          cloned.style.position = 'absolute'
          cloned.style.inset = "0"
          cloned.style.lineHeight = "1.2"
          child.classList.add("child")
          child.style.lineHeight = "1.2"
          cloned.classList.add("cloned")
        })
      },
    },
    {
      prepare: (el: HTMLElement) => el.querySelectorAll(".payload-richtext .child"),
      transforms: { y: [0, "120%"] },
      options: { ease: 'easeIn' },
      offset: ['start 0.4', 'start 0.5']
    },
    {
      prepare: (el: HTMLElement) => el.querySelectorAll(".payload-richtext .cloned"),
      transforms: { y: ["-120%", 0] },
      options: { ease: 'easeOut' },
      offset: ['start 0.4', 'start 0.5']
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

  const cancelList: (() => void)[] = []

  let animationList = {}
  if (preset == 'custom') {
    //TODO IMPLEMENT custom animaation from CMS
    // animationList = [
    //   {
    //     prepare,
    //     transforms,
    //     options,
    //     offset
    //   }
    // ]
  } else if (preset == 'fadeInEachWord') {
    // special cases
    return fadeInEachWord(element)
  } else {
    animationList = scrollPreset[preset]
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
