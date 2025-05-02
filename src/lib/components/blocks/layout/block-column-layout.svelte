<script lang="ts">
  import { type IBlockColumnLayout } from "@payload-types";
  import RenderBlocks from "../render-blocks.svelte";
  import { cn } from "@/utils";

  const { blockData }: { blockData: IBlockColumnLayout } = $props();
  const { layout, columnOne, columnTwo, columnThree } = blockData;

  const normaliseWidth = (layout: string) => {
    const cssList = [];
    switch (layout) {
      case "oneColumn":
        cssList.push("md:w-full");
        cssList.push("md:w-0");
        cssList.push("md:w-0");
        break;
      case "halfAndHalf":
        cssList.push("md:w-1/2");
        cssList.push("md:w-1/2");
        cssList.push("md:w-0");
        break;
      case "oneTwoThird":
        cssList.push("md:w-1/3");
        cssList.push("md:w-2/3");
        cssList.push("md:w-0");
        break;
      case "twoOneThird":
        cssList.push("md:w-2/3");
        cssList.push("md:w-1/3");
        cssList.push("md:w-0");
        break;
      case "threeColumns":
        cssList.push("md:w-1/3");
        cssList.push("md:w-1/3");
        cssList.push("md:w-1/3");
        break;
    }
    return cssList;
  };
  const widthClass = normaliseWidth(layout ?? "oneColumn");
</script>

<section id="block-column-layout" class="py-5">
  <div class="flex flex-col px-0 py-7 md:py-0 md:px-5 md:flex-row justify-center items-center container mx-auto flex-wrap">
    <div class={cn("h-full w-full justify-center items-center", widthClass[0])}>
      <RenderBlocks blockData={columnOne![0]} />
    </div>
    {#if columnTwo && columnTwo.length != 0}
      <div class={cn("flex px-0 py-7 md:py-0 md:px-5 justify-center items-center md:has-[#image-block]:order-0 has-[#image-block]:-order-1  ", widthClass[1])}>
        <RenderBlocks blockData={columnTwo[0]} />
      </div>
    {/if}
    {#if columnThree && columnThree.length != 0}
      <div class={cn("h-full py-7 md:py-0 px-0 md:px-5 justify-center items-center ", widthClass[2])}>
        <RenderBlocks blockData={columnThree[2]} />
      </div>
    {/if}
  </div>
</section>
