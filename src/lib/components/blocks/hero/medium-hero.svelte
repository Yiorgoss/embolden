<script lang="ts">
	import { type IMediumHero } from '@payload-types';
	import { RichTextRender } from '@/components/blocks/rich-text';
	import Picture from '@/components/common/picture.svelte';
	import Button from '@/components/common/button.svelte';

	const { blockData }: { blockData: IMediumHero } = $props();
	const { image, richText, link } = blockData;
</script>

<section id="medium-hero" class="relative">
	<div class="absolute inset-0 z-0">
		{#if image}
			<Picture class="rounded-none " {image} />
		{/if}
	</div>

	<RichTextRender overrides="flex justify-center items-center max-w-full container" {richText} />
</section>
