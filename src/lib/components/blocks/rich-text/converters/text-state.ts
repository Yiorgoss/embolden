const textState = {
  type: {
    cursive: { css: { 'font-family': 'var(--cursive, cursive)' }, label: 'cursive' },
    sans: { css: { 'font-family': 'var(--sans, sans-serif)' }, label: 'sans-serif' },
    serif: { css: { 'font-family': 'var(--serif, serif)' }, label: 'serif' },
    'multi-lingual-serif': { label: "serif-multi-lingual", css: { 'font-family': 'var(--multi-lingual-serif, serif)' } },
    'multi-lingual-sans': { label: "sans-multi-lingual", css: { 'font-family': 'var(--multi-lingual-sans, sans)' } },
  },
  background: {
    // ...defaultColors.background,
  },
  color: {
    // ...defaultColors.text,
  },
  fontWeight: {
    black: { css: { 'font-weight': '900' }, label: 'black' },
    bold: { css: { 'font-weight': '700' }, label: 'bold' },
    extrabold: { css: { 'font-weight': '800' }, label: 'extrabold' },
    extralight: { css: { 'font-weight': '200' }, label: 'extralight' },
    light: { css: { 'font-weight': '300' }, label: 'light' },
    medium: { css: { 'font-weight': '500' }, label: 'medium' },
    normal: { css: { 'font-weight': '400' }, label: 'normal' },
    semibold: { css: { 'font-weight': '600' }, label: 'semibold' },
    thin: { css: { 'font-weight': '100' }, label: 'thin' },
  },
  size: {
    'text-2xl': {
      css: {
        'font-size': 'var(--text-2xl,24px)',
        'line-height': 'var(--text-2xl--line-height, 1.2)',
      },
      label: 'text-2xl',
    },
    'text-3xl': {
      css: {
        'font-size': 'var(--text-3xl,30px)',
        'line-height': 'var(--text-3xl--line-height,1.2 )',
      },
      label: 'text-3xl',
    },
    'text-4xl': {
      css: {
        'font-size': 'var(--text-4xl,36px)',
        'line-height': 'var(--text-4xl--line-height, 1.2)',
      },
      label: 'text-4xl',
    },
    'text-5xl': {
      css: {
        'font-size': 'var(--text-5xl,48px)',
        'line-height': 'var(--text-5xl--line-height, 1)',
      },
      label: 'text-5xl',
    },
    'text-6xl': {
      css: {
        'font-size': 'var(--text-6xl,60px)',
        'line-height': 'var(--text-6xl--line-height, 1)',
      },
      label: 'text-6xl',
    },
    'text-7xl': {
      css: {
        'font-size': 'var(--text-7xl,72px)',
        'line-height': 'var(--text-7xl--line-height,1 )',
      },
      label: 'text-7xl',
    },
    'text-8xl': {
      css: {
        'font-size': 'var(--text-8xl, 96px)',
        'line-height': 'var(--text-8xl--line-height, 1)',
      },
      label: 'text-8xl',
    },
    'text-9xl': {
      css: {
        'font-size': 'var(--text-9xl, 128px)',
        'line-height': 'var(--text-9xl--line-height, 1)',
      },
      label: 'text-9xl',
    },
    'text-base': {
      css: {
        'font-size': ' var(--text-base, 16px)',
        'line-height': ' var(--text-base--line-height,1.5)',
      },
      label: 'text-base',
    },
    'text-lg': {
      css: {
        'font-size': 'var(--text-lg, 18px)',
        'line-height': 'var(--text-lg--line-height,1.4)',
      },
      label: 'text-lg',
    },
    'text-sm': {
      css: {
        'font-size': ' var(--text-sm, 14px)',
        'line-height': ' var(--text-sm--line-height, 1.6])',
      },
      label: 'text-sm',
    },
    'text-xl': {
      css: {
        'font-size': 'var(--text-xl, 20px)',
        'line-height': 'var(--text-xl--line-height, 1.4)',
      },
      label: 'text-xl',
    },
    'text-xs': {
      css: {
        'font-size': ' var(--text-xs, 12px)',
        'line-height': ' var(--text-xs--line-height,1.7)',
      },
      label: 'text-xs',
    },
  },
  themeColors: {
    background: { css: { color: 'var(--background, #3a383b)' }, label: 'background' },
    foreground: { css: { color: 'var(--foreground, #bbb5bd)' }, label: 'foreground' },
    primary: { css: { color: 'var(--primary, #531970)' }, label: 'primary' },
    secondary: { css: { color: 'var(--secondary, #6155cf )' }, label: 'secondary ' },
    'chart-1': { label: 'chart-1 ', css: { color: 'var(--chart-1, #f54a00 )' } },
    'chart-2': { label: 'chart-2 ', css: { color: 'var(--chart-2, #009689)' } },
    'chart-3': { label: 'chart-3 ', css: { color: 'var(--chart-3, #104e64)' } },
    'chart-4': { label: 'chart-4 ', css: { color: 'var(--chart-4, #ffba00)' } },
    'chart-5': { label: 'chart-5 ', css: { color: 'var(--chart-5, #009528)' } },
  },
}

export function objToCSS(node) {
  const style = {}
  if (node.$) {
    Object.entries(textState).forEach(([stateKey, stateValues]) => {
      const stateValue = node.$ && (node.$[stateKey])
      //@ts-ignore
      if (stateValue && stateValues[stateValue]) {
        //@ts-ignore
        Object.assign(style, stateValues[stateValue].css)
      }
    })
  }
  let providedCSSString = ''
  for (const key of Object.keys(style)) {
    // @ts-expect-error we're iterating over the keys of the object
    providedCSSString += `${key}: ${style[key]};`
  }

  return providedCSSString
}
