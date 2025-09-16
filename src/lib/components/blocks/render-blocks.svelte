<script lang="ts">
	import { blockList } from '$lib/components/blocks';

	const {
		blockData,
		cb,
		hasLocaleSwitch
	}: { blockData: any; cb?: () => void; hasLocaleSwitch?: boolean } = $props();

	const calculatedBlockType = blockList.get(blockData?.blockType ?? undefined) ?? undefined;
	const SvelteComponent = $derived(calculatedBlockType);
</script>

{#if calculatedBlockType}
	<SvelteComponent {blockData} {cb} {hasLocaleSwitch} />
{/if}
