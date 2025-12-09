<script lang="ts">
	import { type IMediumHero } from '@payload-types';
	import { RichTextRender } from '@/components/blocks/rich-text';
	import Picture from '@/components/common/picture.svelte';
	import Button from '@/components/common/button.svelte';

	const { blockData }: { blockData: IMediumHero } = $props();
	//  const { image, richText } = $derived(blockData);
</script>

<section id="medium-hero" class="relative">
	<div class="absolute inset-0 z-0">
		{#if blockData.image}
			<Picture class="rounded-none " image={blockData.image} />
		{/if}
	</div>

	{#if blockData.richText}
		<RichTextRender
			overrides="flex justify-center items-center max-w-full container"
			richText={blockData.richText}
		/>
	{/if}
</section>
