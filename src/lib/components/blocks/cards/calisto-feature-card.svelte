<script lang="ts">
import { type ICalistoFeatureCard } from "@payload-types";
import RichTextRender from "@/components/blocks/rich-text/render.svelte";
import Icon from "@/components/common/icon.svelte";

const { blockData }: { blockData: ICalistoFeatureCard } = $props();
const { cards } = blockData;
</script>

<section id="feature-card" class="container mx-auto">
  <div class="flex flex-col md:flex-row">
    {#if cards}
      {#each cards as { richText, icon }}
        <div class="px-10 pt-10">
          <div class="relative flex-auto">
            <div class="bg-primary flex flex-col rounded-3xl p-10">
              <RichTextRender
                overrides="prose-headings:text-background prose-p:text-background"
                richText={richText}
              />
            </div>
            <div
              class="bg-foreground absolute top-0 left-1/6 size-18 -translate-y-1/2 rounded-xl"
            >
              <Icon
                class="text-background h-full w-full rounded-xl bg-gray-800/50 p-3"
                {icon}
              />
            </div>
          </div>
        </div>
      {/each}
    {/if}
  </div>
</section>
