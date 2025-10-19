<script lang="ts">
	import Picture from '@/components/common/picture.svelte';
	import type { IMarquee } from '@payload-types';
	import { RichTextRender } from '../rich-text';

	const { blockData }: { blockData: IMarquee } = $props();
	const { richText, image, style, maskEdges } = blockData;
	const { background, height, border, padding, animation } = style || {};
</script>

<section
	style:background
	id="marquee-block"
	class:mask-none={!true}
	class="mask-l-from-90% mask-r-from-90% overflow-hidden"
>
	<div
		style:border
		style:padding
		style:height
		style:animation-duration={animation?.duration}
		data-animated="true"
		class=" marquee-default flex justify-start gap-10 py-10 w-fit"
	>
		{#each { length: 4 } as _}
			<div class="w-full min-w-fit">
				<Picture {image} class="py-2 object-contain" />
			</div>
			<RichTextRender overrides="text-nowrap inline-block" {richText} />
		{/each}
	</div>
</section>

<style>
	.marquee-default {
		animation: marquee 80s linear infinite;
	}
</style>
