<script lang="ts">
	import Picture from '@/components/common/picture.svelte';
	import type { IInfoBanner } from '@payload-types';
	import { RichTextRender } from '../rich-text';
	import Button from '@/components/common/button.svelte';

	const { blockData }: { blockData: IInfoBanner } = $props();
	const {
		richText,
		link,
		style: { background, height, border, padding, alignX } = {}
	} = $derived(blockData);
</script>

<section id="info-banner-block" class="w-full py-[200px]">
	<div
		style:background
		style:border
		style:padding
		style:height
		style:justify-content={alignX}
		class="flex items-center gap-10 px-2 py-10 w-full"
	>
		<RichTextRender overrides="inline-block" {richText} />
		<Button {link} />
	</div>
</section>
