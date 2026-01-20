<script lang="ts">
	import Picture from '@/components/common/picture.svelte';
	import type { IMarquee } from '@payload-types';
	import { RichTextRender } from '../rich-text';
	import { resolveID } from '@/utils';
	import { page } from '$app/state';
	import { getPayloadState } from '@/state/payload.svelte';
	import { prefersReducedMotion } from 'svelte/motion';

	const { blockData }: { blockData: IMarquee } = $props();
	const {
		items,
		style: { background, color, height, border, padding, gap } = {},
		options,
		link: _link
		//  animation
	} = $derived(blockData);
	//  const { nRepeat, maskEdges } = $derived(options || {});
	//  const { background, height, border, padding } = $derived(style || {});

	let payload = getPayloadState();
	let link = $state<string>();
	$effect(() => {
		payload
			.resolveID({ collection: 'pages', data: _link, lang: page.params.locale })
			.then((page) => (link = page.slug))
			.catch(() => 'javascript:void(0);');
	});
</script>

<section
	id="marquee-block"
	style:border
	style:padding
	style:background
	style:color
	class:mask-none={!options?.maskEdges}
	class="mask-l-from-90% mask-r-from-90% overflow-clip"
>
	<a href={link} aria-hidden={!link}>
		<div
			style:height
			style:gap
			style:animation-duration={options?.duration}
			class:flex-wrap={prefersReducedMotion.current}
			class="marquee-default w-max flex justify-center items-center gap-x-10"
		>
			{#each [...items, ...items] as { image, text }, i}
				<div aria-hidden={i > items.length} class="">
					<Picture {image} class="object-contain" />
				</div>
				<div aria-hidden={i > items.length} class="text-nowrap">{text}</div>
			{/each}
		</div>
	</a>
</section>

<style>
	.marquee-default {
		animation: marquee 40s linear infinite;
	}
</style>
