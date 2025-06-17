<script lang="ts">
	import { type BentoGrid } from '@payload-types';
	import RenderBlocks from '../render-blocks.svelte';

	const { blockData }: { blockData: BentoGrid } = $props();
	const { grid } = blockData;
</script>

<section id="bento-grid" class="py-5">
	<div class="grid grid-cols-1 grid-rows-5 gap-4 px-4 md:px-0 md:grid-cols-2">
		<div class="bg-foreground **:text-background! rounded-4xl p-8 row-span-4 order-3 md:order-1">
			<RenderBlocks blockData={grid && grid[0].content && grid![0].content![0]} />
		</div>
		<div class="rounded-theme bg-blue-200 row-span-2 order-1 md:order-2">
			<RenderBlocks blockData={grid && grid[1].content && grid![1].content![0]} />
		</div>
		<div class="rounded-4xl bg-blue-200 row-span-1 order-2 md:order-4">
			<RenderBlocks blockData={grid && grid[2].content && grid![2].content![0]} />
		</div>
		<div class="bg-foreground **:text-background! p-8 row-span-3 order-4 md:order-3 rounded-theme">
			<RenderBlocks blockData={grid && grid[3].content && grid![3].content![0]} />
		</div>
	</div>
</section>
