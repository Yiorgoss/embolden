<script lang="ts">
	const { name, data }: { name: string; data: any } = $props();

	const getSVG = async (svgName: string | undefined) => {
		if (!svgName) return;
		switch (svgName) {
			case 'cutout-main':
				return import('./cutout-main.svelte');
			case 'cutout-small':
				return import('./cutout-small.svelte');
		}
	};
	let SVGElement = $derived(await getSVG(name));
	// $effect(() => {
	// 	getSVG(name ?? undefined).then((block) => (SVGElement = block));
	// });
</script>

{#if SVGElement && SVGElement.default}
	{@const Block = SVGElement.default}
	<div class="absolute -z-50">
		<Block {data} />
	</div>
{/if}
