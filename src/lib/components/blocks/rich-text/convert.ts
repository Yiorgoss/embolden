import type { SerializedEditorState, SerializedLexicalNode } from 'lexical'

// import type { SerializedLexicalNodeWithParent } from '../shared/types.js'
// import type {
//   HTMLConverterAsync,
//   HTMLConvertersAsync,
//   HTMLConvertersFunctionAsync,
//   HTMLPopulateFn,
// } from './types.js'

// import { hasText } from '../../../../validate/hasText.js'
// import { findConverterForNode } from '../shared/findConverterForNode.js'
// import { defaultHTMLConvertersAsync } from './defaultConverters.js'
import type { HTMLConverter, HTMLConverters, ProvidedCSS, SerializedLexicalNodeWithParent } from '@payloadcms/richtext-lexical/html'
import { defaultColors, type SerializedBlockNode, type SerializedInlineBlockNode } from '@payloadcms/richtext-lexical'
import { defaultHTMLConvertersAsync, type HTMLConverterAsync, type HTMLConvertersAsync, type HTMLConvertersFunctionAsync } from '@payloadcms/richtext-lexical/html-async'
import { hasText } from '@payloadcms/richtext-lexical/shared'

export type ConvertLexicalToHTMLAsyncArgs = {
  /**
   * Override class names for the container.
   */
  className?: string
  converters?: HTMLConvertersAsync | HTMLConvertersFunctionAsync
  data: SerializedEditorState
  /**
   * If true, removes the container div wrapper.
   */
  disableContainer?: boolean
  /**
   * If true, disables indentation globally. If an array, disables for specific node `type` values.
   */
  disableIndent?: boolean | string[]
  /**
   * If true, disables text alignment globally. If an array, disables for specific node `type` values.
   */
  disableTextAlign?: boolean | string[]
  populate?: HTMLPopulateFn
}
type HTMLPopulateFn = () => any

export async function convertLexicalToHTMLAsync({
  className,
  converters,
  data,
  disableContainer,
  disableIndent,
  disableTextAlign,
  populate,
}: ConvertLexicalToHTMLAsyncArgs): Promise<string> {
  if (hasText(data)) {
    let finalConverters: HTMLConvertersAsync = {}
    if (converters) {
      if (typeof converters === 'function') {
        finalConverters = converters({ defaultConverters: defaultHTMLConvertersAsync })
      } else {
        finalConverters = converters
      }
    } else {
      finalConverters = defaultHTMLConvertersAsync
    }

    const html = (
      await convertLexicalNodesToHTMLAsync({
        converters: finalConverters,
        disableIndent,
        disableTextAlign,
        nodes: data?.root?.children,
        parent: data?.root,
        populate,
      })
    ).join('')

    if (disableContainer) {
      return html
    } else {
      return `<div class="${className ?? 'payload-richtext'}">${html}</div>`
    }
  }
  if (disableContainer) {
    return ''
  } else {
    return `<div class="${className ?? 'payload-richtext'}"></div>`
  }
}

export async function convertLexicalNodesToHTMLAsync({
  converters,
  disableIndent,
  disableTextAlign,
  nodes,
  parent,
  populate,
}: {
  converters: HTMLConvertersAsync
  disableIndent?: boolean | string[]
  disableTextAlign?: boolean | string[]
  nodes: SerializedLexicalNode[]
  parent: SerializedLexicalNodeWithParent
  populate?: HTMLPopulateFn
}): Promise<string[]> {
  const unknownConverter: HTMLConverterAsync<any> = converters.unknown as HTMLConverterAsync<any>

  const htmlArray: string[] = []

  let i = -1
  for (const node of nodes) {
    i++
    const { converterForNode, providedCSSString, providedStyleTag } = findConverterForNode({
      converters,
      disableIndent,
      disableTextAlign,
      node,
      unknownConverter,
    })

    try {
      let nodeHTML: string

      if (converterForNode) {
        const converted =
          typeof converterForNode === 'function'
            ? await converterForNode({
              childIndex: i,
              converters,
              node,
              populate,

              nodesToHTML: async (args) => {
                return await convertLexicalNodesToHTMLAsync({
                  converters: args.converters ?? converters,
                  disableIndent: args.disableIndent ?? disableIndent,
                  disableTextAlign: args.disableTextAlign ?? disableTextAlign,
                  nodes: args.nodes,
                  parent: args.parent ?? {
                    ...node,
                    parent,
                  },
                  populate,
                })
              },
              parent,
              providedCSSString,
              providedStyleTag,
            })
            : converterForNode
        nodeHTML = converted
      } else {
        nodeHTML = '<span>unknown node</span>'
      }

      htmlArray.push(nodeHTML)
    } catch (error) {
      console.error('Error converting lexical node to HTML:', error, 'node:', node)
      htmlArray.push('')
    }
  }

  return htmlArray.filter(Boolean)
}
/* eslint-disable no-console */
// import type { SerializedLexicalNode } from 'lexical'

// import type { SerializedBlockNode, SerializedInlineBlockNode } from '../../../../nodeTypes.js'
// import type { HTMLConverterAsync, HTMLConvertersAsync } from '../async/types.js'
// import type { HTMLConverter, HTMLConverters } from '../sync/types.js'
// import type { ProvidedCSS } from './types.js'


const textState = {
  size: {
    'xs': { label: "Extra Small", css: { 'font-size': "var(--text-xs, 4px)" } },
    'xl': { label: "Extra Large", css: { 'font-size': "96px" } },
  },
  fontWeight: {
    'Boldest': { label: "Boldest", css: { 'font-weight': '900' } }
  },
  type: {
  },
  color: {
    ...defaultColors.text
  },
  background: {
    ...defaultColors.background
  },
}

export function findConverterForNode<
  TConverters extends HTMLConverters | HTMLConvertersAsync,
  TConverter extends HTMLConverter | HTMLConverterAsync,
>({
  converters,
  disableIndent,
  disableTextAlign,
  node,
  unknownConverter,
}: {
  converters: TConverters
  disableIndent?: boolean | string[]
  disableTextAlign?: boolean | string[]
  node: SerializedLexicalNode
  unknownConverter: TConverter
}): {
  converterForNode: TConverter | undefined
  providedCSSString: string
  providedStyleTag: string
} {
  let converterForNode: TConverter | undefined
  if (node.type === 'block') {
    converterForNode = converters?.blocks?.[
      (node as SerializedBlockNode)?.fields?.blockType
    ] as TConverter
    if (!converterForNode && !unknownConverter) {
      console.error(
        `Lexical => HTML converter: Blocks converter: found ${(node as SerializedBlockNode)?.fields?.blockType} block, but no converter is provided`,
      )
    }
  } else if (node.type === 'inlineBlock') {
    converterForNode = converters?.inlineBlocks?.[
      (node as SerializedInlineBlockNode)?.fields?.blockType
    ] as TConverter
    if (!converterForNode && !unknownConverter) {
      console.error(
        `Lexical => HTML converter: Inline Blocks converter: found ${(node as SerializedInlineBlockNode)?.fields?.blockType} inline block, but no converter is provided`,
      )
    }
  } else {
    converterForNode = converters[node.type] as TConverter
  }

  const style: ProvidedCSS = {}

  // Check if disableTextAlign is not true and does not include node type
  if (
    !disableTextAlign &&
    (!Array.isArray(disableTextAlign) || !disableTextAlign?.includes(node.type))
  ) {
    if ('format' in node && node.format) {
      switch (node.format) {
        case 'center':
          style['text-align'] = 'center'
          break
        case 'end':
          style['text-align'] = 'right'
          break
        case 'justify':
          style['text-align'] = 'justify'
          break
        case 'left':
          //style['text-align'] = 'left'
          // Do nothing, as left is the default
          break
        case 'right':
          style['text-align'] = 'right'
          break
        case 'start':
          style['text-align'] = 'left'
          break
      }
    }
  }

  if (!disableIndent && (!Array.isArray(disableIndent) || !disableIndent?.includes(node.type))) {
    if ('indent' in node && node.indent && node.type !== 'listitem') {
      // the unit should be px. Do not change it to rem, em, or something else.
      // The quantity should be 40px. Do not change it either.
      // See rationale in
      // https://github.com/payloadcms/payload/issues/13130#issuecomment-3058348085
      style['padding-inline-start'] = `${Number(node.indent) * 40}px`
    }
  }


  // if (node.$) {
  //   Object.entries(node.$).forEach(([key, value]) => {
  //     const css = textState[key][value].css
  //     Object.assign(style, css)
  //   })
  // }


  let providedCSSString: string = ''
  for (const key of Object.keys(style)) {
    // @ts-expect-error we're iterating over the keys of the object
    providedCSSString += `${key}: ${style[key]};`
  }
  const providedStyleTag = providedCSSString?.length ? ` style="${providedCSSString}"` : ''

  return {
    converterForNode: converterForNode ?? unknownConverter,
    providedCSSString,
    providedStyleTag,
  }
}
