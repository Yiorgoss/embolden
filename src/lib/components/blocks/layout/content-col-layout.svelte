<script lang="ts">
  import { type IContentColLayout } from "@payload-types";
  import { RichTextRender } from "../rich-text";
    import Button from "@/components/ui/button/button.svelte";

  const { blockData }: { blockData: IContentColLayout } = $props();

  const { list: maybeNullList, lineSeparation, link } = blockData;
  const list = maybeNullList ?? []
</script>

<section class="flex flex-col" >
  {#each list as { columnOne, columnTwo }}
    <div class="flex align-start min-h-100" class:border-t={lineSeparation}>
      <div class="w-1/2 bg-blue-300">
        <RichTextRender richText={columnOne}/>
      </div>
      <div class="w-1/2">
        <RichTextRender richText={columnTwo}/>
      </div>
    </div>
  {/each}
  <Button cmsData={link} />
</section>
