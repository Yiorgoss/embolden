<script lang="ts">
	import Picture from '@/components/common/picture.svelte';
	import type { IMarquee } from '@payload-types';
	import { RichTextRender } from '../rich-text';

	const { blockData }: { blockData: IMarquee } = $props();
	const { richText, image, style, options, link, animation } = blockData;
	const { nRepeat, maskEdges } = options || {};
	const { background, height, border, padding } = style || {};
</script>

<section
	id="marquee-block"
	style:border
	style:padding
	style:background
	class:mask-none={!maskEdges}
	class="mask-l-from-90% mask-r-from-90% overflow-clip"
>
	<div
		style:height
		style:animation-duration={animation?.duration}
		data-animated="true"
		class=" marquee-default flex items-center w-full justify-start gap-10"
	>
		{#each { length: nRepeat ?? 6 } as _}
			<div class="flex justify-end items-end min-w-fit h-fit w-full">
				<Picture {image} class="object-contain" />
			</div>
			<RichTextRender overrides="min-w-fit break-keep text-nowrap inline-block" {richText} />
		{/each}
	</div>
</section>

<style>
	.marquee-default {
		animation: marquee 80s linear infinite;
	}
</style>
