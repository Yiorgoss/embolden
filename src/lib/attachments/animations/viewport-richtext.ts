const animationList = {
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

type PresetKeys = keyof typeof scrollPreset;


// this will return an attachment that will iterate over a preset of motion animations
// fix types once you figure out how api will look!!!
export function animateScroll(presetList: PresetKeys[] | undefined | null,
  { prepare, transforms, options, offset }:
    { prepare?: (element: Element) => void, transforms?: any, options?: any, offset?: any } = {}): Attachment {
  return (element) => {
    if (!presetList || presetList.length <= 0) return
    const preset = presetList[0] // cbf to add this prematurely. It does work however

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
};
