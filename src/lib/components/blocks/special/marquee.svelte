<script lang="ts">
	import Picture from '@/components/common/picture.svelte';
	import type { IMarquee } from '@payload-types';
	import { RichTextRender } from '../rich-text';
	import { resolveID } from '@/utils';
	import { page } from '$app/state';
	import { getPayloadState } from '@/state/payload.svelte';

	const { blockData }: { blockData: IMarquee } = $props();
	const {
		richText,
		image,
		style: { background, height, border, padding } = {},
		options: { nRepeat, maskEdges } = {},
		link: _link,
		animation
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
	<a href={link}>
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
	</a>
</section>

<style>
	.marquee-default {
		animation: marquee 40s linear infinite;
	}
</style>
