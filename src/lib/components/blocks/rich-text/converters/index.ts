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
import { richTextBtn } from '@/utils/payload-utils';

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
    // word class is used for rich text animations be careful with removing it
    buttonRT: async (args) => {
      // try {

      const { link } = args.node.fields
      const buttonHTML = await richTextBtn({ link });
      console.log({ buttonHTML })
      return `<span class="word">${buttonHTML}</span>`
      // } catch (err) {
      //   console.error(`err`)
      // }
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

      const normalSize = `
      width:${width};
      height:${height};
      vertical-align:${vertAlign};`

      const minSize = `
      @media(width <= 810px) {
        width:${phoneWidth ?? width};
        height:${phoneHeight ?? height};
        vertical-align:${vertAlign}
      }`

      // word class is used for rich text animations be careful with removing it
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
        <span id="pill-image-${imageID}" class="word" style="" >
          ${imageString}
      </span>
        `;
    }
  }
});
