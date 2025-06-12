<script lang="ts">
	import { blockList } from '$lib/components/blocks';

	const { blockData, cb }: { blockData: any; cb?: () => void } = $props();

	const calculatedBlockType = blockList.get(blockData.blockType) ?? undefined;
	const SvelteComponent = $derived(calculatedBlockType);
</script>

{#if calculatedBlockType}
	<SvelteComponent {blockData} {cb} />
{/if}
