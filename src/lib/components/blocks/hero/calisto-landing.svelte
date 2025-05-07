<script lang="ts">
import { type ICalistoLanding } from "@payload-types";

import Picture from "@/components/common/picture.svelte";
import Button from "@/components/ui/button/button.svelte";
import { RichTextRender } from "@/components/blocks/rich-text";

const { blockData }: { blockData: ICalistoLanding } = $props();
const { image, richText, ctaOne, ctaTwo } = blockData;
</script>

<div id="calisto-landing" class="grid min-h-lvh grid-cols-3 grid-rows-3 md:min-h-screen">
  <div class="z-0 col-span-full row-span-full">
    {#if image}
      <Picture data={image} />
    {/if}
  </div>
  <div
    class="bg-background/30 z-10 col-span-full row-span-full h-full w-full"
  ></div>
  <div class="z-10 col-span-full  row-start-2 row-end-4 container px-5">
    <div class="flex h-full max-w-fit  flex-col items-start justify-center">
      {#if richText}
        <RichTextRender richText={richText} />
      {/if}
      <div class="self-start md:self-end pt-10 flex gap-5 ">
        <Button class="py-5  px-5" cmsData={ctaTwo} />
        <Button class="py-5  px-5" cmsData={ctaOne} />
      </div>
    </div>
  </div>
</div>
