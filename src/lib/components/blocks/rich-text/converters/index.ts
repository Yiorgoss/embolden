import type { IPill, ICursiveText } from '@payload-types';

// import {
//   defaultColors,
//   NodeFormat,
//   type DefaultNodeTypes,
//   type SerializedBlockNode,
//   type SerializedInlineBlockNode
// } from '@payloadcms/richtext-lexical';

// import { type HTMLConvertersFunctionAsync } from '@payloadcms/richtext-lexical/html-async';

import { resolveID, richTextImg } from '@/utils';

export type NodeTypes =
  | DefaultNodeTypes
  | SerializedInlineBlockNode<IPill | ICursiveText>
  | SerializedBlockNode;

export type htmlConvertersType = typeof htmlConverters

// const textState = {
//   size: {
//     'xs': { label: "Extra Small", css: { 'font-size': "var(--text-xs, 4px)" } },
//     'xl': { label: "Extra Large", css: { 'font-size': "96px" } },
//   },
//   fontWeight: {
//     'Boldest': { label: "Boldest", css: { 'font-weight': '900' } }
//   },
//   // type: {
//   // },
//   color: {
//     ...defaultColors.text
//   },
//   background: {
//     ...defaultColors.background
//   },
// }


export const htmlConverters: HTMLConvertersFunctionAsync<NodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
  inlineBlocks: {
    // Each key should match your inline block's slug
    buttonRT: async (args) => {
      // console.log({ args })
      return '<span >xx</span>'
    },
    pill: async (args) => {
      const { image, width, height, vertAlign, phone } = args.node.fields;
      const { width: phoneWidth, height: phoneHeight } = phone

      let imageString;
      try {
        imageString = await richTextImg({ imgData: image });
      }
      catch (err) {
        console.error(`ERROR pill image - ${image.id ?? image}: ${err}`)
        return ""
      }

      const imageID = typeof image == 'number' ? image : image.id;

      const normalSize = `width:${width};height:${height};vertical-align:${vertAlign};`
      const minSize = `
      @media(width <= 810px) {
        width:${phoneWidth ?? width};
        height:${phoneHeight ?? height};
        vertical-align:${vertAlign}
      }`

      return `
        <style>
      #pill-image-${imageID} {
        margin: 0 20px;
        display: inline-block;
        border-radius: 9999px;
        overflow: hidden;
  ${normalSize ?? ""}
      }
${minSize}
      </style>
        <span id="pill-image-${imageID}" style="" >
          ${imageString}
      </span>
        `;
    }
  }
});
