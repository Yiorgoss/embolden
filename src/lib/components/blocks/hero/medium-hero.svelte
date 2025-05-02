<script lang="ts">
  import { type IMediumHero } from "@payload-types";
  import { RichTextRender } from "@/components/blocks/rich-text";
  import Picture from "@/components/common/picture.svelte";

  const { blockData }: { blockData: IMediumHero } = $props();
  const { image, richText, link } = blockData;
</script>

  <section id='medium-hero' class="grid grid-cols-1 min-h-[20vh] md:h-[80svh]  ">
    <div class=" h-full w-full overflow-hidden col-span-full row-span-full">
      {#if image}
        <Picture class="rounded-none" data={image} />
      {/if}
    </div>

    <div
      class="h-full w-full bg-background/30 col-span-full row-span-full "
    ></div>
    <div
      class="pb-10 col-span-full row-span-full flex justify-center items-center max-h-svh flex-col md:py-0 pt-(--header-height) container mx-auto
"
    >
      <RichTextRender
        overrides="prose-h2:font-extralight prose-h2:my-5 prose-h2:text-4xl prose-h2:md:text-7xl w-full max-w-full container"
        {richText}
      />
      <!-- <Button {link} /> -->
    </div>
  </section>
