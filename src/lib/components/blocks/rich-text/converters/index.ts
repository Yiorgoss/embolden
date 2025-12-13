import type { IPill, ICursiveText } from '@payload-types';
import { objToCSS } from './text-state';
import { customText } from "./text"
import { resolveID, richTextImg } from '@/utils';
import { richTextBtn } from '@/utils/payload-utils';


// import {
//   defaultColors,
//   NodeFormat,
//   type DefaultNodeTypes,
//   type SerializedBlockNode,
//   type SerializedInlineBlockNode
// } from '@payloadcms/richtext-lexical';

// import { type HTMLConvertersFunctionAsync } from '@payloadcms/richtext-lexical/html-async';

// import { animate, motionValue, svgEffect } from 'motion';

// export type NodeTypes =
//   | DefaultNodeTypes
//   | SerializedInlineBlockNode<IPill | ICursiveText>
//   | SerializedBlockNode;

// export type htmlConvertersType = typeof htmlConverters

export const htmlConverters: any = ({ defaultConverters }) => ({
  ...defaultConverters,
  text: customText,
  inlineBlocks: {
    // Each key should match your inline block's slug
    svgText: async (args) => {
      const { childIndex, node, parent } = args
      const siblings = parent.children
      const { text, shouldAnimate, style, image: _image } = node.fields || {}
      const { color } = style || {}

      // const image = await resolveID({ collection: 'assets', data: _image.url }) //only url cos its svg

      let wordStyles = ""
      if (siblings.length >= 2) { //inc this
        if (childIndex - 1 >= 0) {
          //use prev node styles
          wordStyles += objToCSS(siblings[childIndex - 1])
        }
        if (!wordStyles && childIndex + 1 < siblings.length) {
          //only if styles not found
          wordStyles += objToCSS(siblings[childIndex + 1])
        }
      }
      // const elem = `
      // <span class="word" style="display:inline-grid;place-items:center;">
      //   <object
      //       class="animate-circle-object"
      //       id="xxyxx"
      //       type="image/svg+xml"
      //       data="${image.url}"
      //       onload="console.log("x")"
      //       style="color:red; scale:1.2; grid-area:1 / 1"></object>

      //   <span style="grid-area:1 / 1;${wordStyles}">${text}</span>
      // </span>`
      // const elem = `
      // <span class="word" style="display:inline-grid;place-items:center;grid-template:"1";>
      //   <object
      //       class="animate-circle-object"
      //       type="image/svg+xml"
      //       data="${image.url}"
      //       onload="this.parentNode.replaceChild(this.contentDocument.documentElement, this);"
      //       style="color:red; scale:1.2; grid-area:1 / 1"></object>

      //   <span style="grid-area:1 / 1;${wordStyles}">${text}</span>
      // </span>`

      //can expand too any svg by using api to reflect external svg
      const elem = `
      <span class="" style="display:inline-block; position:relative;">
        <span class="animate-word" style="position:absolute;  top:0; left:0; right:0; bottom:0;" >
          <svg class="animate-svg" width="100%" height="100%" preserveAspectRatio="none" viewBox="0 0 181 68" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M117.637 2.86134C55.6369 -2.63843 -18.8594 8.36133 6.63897 38.8615C41.6403 75.8615 103.472 64.9534 122.64 61.8615C138.14 59.3615 181.613 49.6723 178.64 28.8615C175.14 4.36128 107.642 6.36118 81.1424 14.3648" stroke="${color ?? "var(--foreground)"}" stroke-width="3" stroke-linecap="round"/>
          </svg>
        </span>
        <span style="${wordStyles}">${text}</span>
      </span>`
      const span = document.createElement("span")
      span.innerHTML = elem
      // const e = span.querySelectorAll("#animate-circle-object")

      // animate(e, { pathLength: [0, 1] }, { repeat: Infinity })
      return span.innerHTML
      return elem

    },
    // word class is used for rich text animations be careful with removing it
    buttonRT: async (args) => {
      // try {

      const { link } = args.node.fields
      const buttonHTML = await richTextBtn({ link });
      return `<span class="animate-word">${buttonHTML}</span>`
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
        <span id="pill-image-${imageID}" class="animate-word" style="" >
          ${imageString}
      </span>
        `;
    }
  }
});
