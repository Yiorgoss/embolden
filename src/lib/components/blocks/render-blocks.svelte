<script lang="ts">
	import { blockList } from '$lib/components/blocks';

	const {
		blockData,
		className,
		cb,
		hasLocaleSwitch
	}: { blockData: any; className?: string; cb?: () => void; hasLocaleSwitch?: boolean } = $props();

	const calculatedBlockType = blockList.get(blockData?.blockType ?? undefined) ?? undefined;
	const SvelteComponent = $derived(calculatedBlockType);
</script>

{#if calculatedBlockType}
	<SvelteComponent {className} {blockData} {cb} {hasLocaleSwitch} />
{/if}
