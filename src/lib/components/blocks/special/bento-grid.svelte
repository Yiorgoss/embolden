<script lang="ts">
	import { type BentoGrid } from '@payload-types';
	import RenderBlocks from '../render-blocks.svelte';

	const { blockData }: { blockData: BentoGrid } = $props();
	const { grid } = $derived(blockData);
</script>

<section id="bento-grid " class="py-5 max-w-lg lg:max-w-xl">
	<div class="grid grid-cols-1 grid-rows-auto md:grid-rows-6 gap-4 px-4 md:px-0 md:grid-cols-2">
		<div
			class="bg-foreground max-w-md md:max-w-full **:text-background! rounded-theme p-8 row-span-1 md:row-span-4 order-3 md:order-1"
		>
			<RenderBlocks blockData={grid && grid[0].content && grid![0].content![0]} />
		</div>
		<div
			class="[&_img]:object-contain max-w-md md:max-w-full p-4 rounded-theme overflow-hidden bg-blue-200 row-span-1 md:row-span-3 order-1 md:order-2"
		>
			<RenderBlocks blockData={grid && grid[1].content && grid![1].content![0]} />
		</div>
		<div
			class="[&_img]:object-contain max-w-md md:max-w-full p-4 rounded-theme bg-blue-200 row-span-1 md:row-span-2 order-2 md:order-4"
		>
			<RenderBlocks blockData={grid && grid[2].content && grid![2].content![0]} />
		</div>
		<div
			class="bg-foreground **:text-background! max-w-md md:max-w-full p-8 row-span-1 md:row-span-3 order-4 md:order-3 rounded-theme"
		>
			<RenderBlocks blockData={grid && grid[3].content && grid![3].content![0]} />
		</div>
	</div>
</section>
