
// const textState = {
//   size: {
//     'xs': { label: "Extra Small", css: { 'font-size': "var(--text-xs, 4px)" } },
//     'xl': { label: "Extra Large", css: { 'font-size': "96px" } },
//   },
//   fontWeight: {
//     'Boldest': { label: "Boldest", css: { 'font-weight': '900' } }
//   },
//   type: {
//   },
//   color: {
//     ...defaultColors.text
//   },
//   background: {
//     ...defaultColors.background
//   },
// }


//   if (node.$) {
//     Object.entries(node.$).forEach(([key, value]) => {
//       const css = textState[key][value].css
//       Object.assign(style, css)
//     })
//   }


//   let providedCSSString: string = ''
//   for (const key of Object.keys(style)) {
//     // @ts-expect-error we're iterating over the keys of the object
//     providedCSSString += `${key}: ${style[key]};`
//   }
