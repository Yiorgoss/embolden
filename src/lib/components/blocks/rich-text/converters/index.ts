import type { IPill, ICursiveText } from '@payload-types';

import type {
  DefaultNodeTypes,
  SerializedBlockNode,
  SerializedInlineBlockNode
} from '@payloadcms/richtext-lexical';

import { type HTMLConvertersFunctionAsync } from '@payloadcms/richtext-lexical/html-async';

import { resolveID, richTextImg } from '@/utils';

export type NodeTypes =
  | DefaultNodeTypes
  | SerializedInlineBlockNode<IPill | ICursiveText>
  | SerializedBlockNode;
export const htmlConverters: HTMLConvertersFunctionAsync<NodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
  inlineBlocks: {
    // Each key should match your inline block's slug
    cursiveText: async (args) => {
      const { text, style } = args.node.fields;
      return `<span class='font-cursive font-normal' style='${style}'>${text}</span>`;
    },
    pill: async (args) => {
      const { image, size } = args.node.fields;

      const imgData = await resolveID({ collection: 'assets', data: image })
      const imageString = await richTextImg({ imgData });
      const imageID = typeof image == 'number' ? image : image.id;

      const normalSize =
        size == 'sm'
          ? 'width:100px;height:50px;'
          : size == 'md'
            ? 'width:150px;height:75px;'
            : 'width:200px;height:100px';

      const minSize = `
@media (width <= 650px) {
  #pill-image-${imageID} {
        ${size == 'sm'
          ? 'width:80px;height:40px;'
          : size == 'md'
            ? 'width:100px;height:50px;'
            : 'width:120px;height:60px'
        } 
  }
}
`;

      return `
<style>
  #pill-image-${imageID} {
  margin:0 20px;
  display:inline-block;
  border-radius:9999px;
  overflow:hidden;
  vertical-align: middle;
  ${normalSize};
}
${minSize}
</style>
<span id="pill-image-${imageID}" style="line-height:150px;">
  ${imageString}
</span>
`;
    }
  }
});
