<script lang="ts">
	import { MediaQuery } from 'svelte/reactivity';
	import { type IFlexboxLayout } from '@payload-types';
	import RenderBlocks from '../render-blocks.svelte';

	const { blockData }: { blockData: IFlexboxLayout } = $props();
</script>

<section id="flexbox-layout">
	<div
		style:justify-center={blockData.style?.alignX}
		style:align-items={blockData.style?.alignY}
		class="flex flex-wrap justify-center items-center gap-2"
	>
		{#each blockData.list ?? [] as { block }, i}
			<div class="">
				<RenderBlocks blockData={block?.[0]} />
			</div>
		{/each}
	</div>
</section>
