<script lang="ts">
  import type { IStickyContainers } from "@payload-types";
  import RichTextRender from "@/components/blocks/rich-text/render.svelte";
  import Picture from "@/components/common/picture.svelte";
  import { cn } from "@/utils";

  const { blockData }: { blockData: IStickyContainers; index?: number } =$props();
  const { list:maybeList, title } = blockData;

  const list = maybeList ?? [] //typescript 
</script>

<section id="sticky-container-root" class="py-5 mx-auto container ">
  <div class="">
    {#each list as { richText, image }, i}
      {@const left = i % 2 == 1}
      <div
        style:top={`${70 * i}px`}
        class={cn(
          `flex sticky flex-col-reverse md:flex-row text-background bg-primary rounded-4xl `,
          left && "flex-col-reverse md:flex-row-reverse bg-blue-400 text-foreground",
        )}
      >
        <div class="flex flex-col">
          {#if title && i == 0}
            <div class="font-cursive text-4xl w-full px-10 py-6">{title}</div>
          {/if}

          <div class="flex grow justify-center p-12 items-center">
            <RichTextRender
              overrides={cn(
                "prose prose-p:text-background prose-headings:text-background",
                left && "background-blue-400 text-foreground",
              )}
              {richText}
            />
          </div>
        </div>
        <div class="w-full md:w-1/2 h-[300px] md:h-[600px] p-12">
          <Picture class="rounded-2xl" data={image} />
        </div>
      </div>
    {/each}
  </div>
</section>
