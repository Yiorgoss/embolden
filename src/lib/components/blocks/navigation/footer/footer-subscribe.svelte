<script lang="ts">
	import type { IFooterSubscribe } from '@payload-types';
	import RenderBlocks from '../../render-blocks.svelte';

	const { blockData }: { blockData: IFooterSubscribe } = $props();
</script>

<section id="footer-subscribe">
	<div
		style:border-radius={blockData.style.borderRadius}
		style:background={blockData.style.background}
		style:flex-direction={blockData.style.flexDirection}
		style:justify-content={blockData.style.alignX}
		style:align-items={blockData.style.alignY}
		class:container={blockData.style.container}
		class="flex flex-wrap mx-auto"
	>
		{#each blockData.columns ?? [] as { block }}
			<div class="">
				<RenderBlocks blockData={block[0]} />
			</div>
		{/each}
	</div>
</section>
