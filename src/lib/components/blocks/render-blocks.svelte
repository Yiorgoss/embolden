<script lang="ts">
  import { blockList } from "$lib/components/blocks";

  const { blockData }:{ blockData:any} = $props();

  const calculatedBlockType = blockList.get(blockData.blockType) ?? undefined;
  const SvelteComponent = $derived(calculatedBlockType);

</script>

{#if calculatedBlockType}
  <SvelteComponent {blockData} />
{/if}
