<script lang="ts">
	import { type IMediumHero } from '@payload-types';
	import { RichTextRender } from '@/components/blocks/rich-text';
	import Picture from '@/components/common/picture.svelte';
	import Button from '@/components/common/button.svelte';

	const { blockData }: { blockData: IMediumHero } = $props();
	const { image, richText, link } = blockData;
</script>

<section id="medium-hero" class="grid min-h-[17svh] grid-cols-1 md:h-[70svh]">
	<div class=" col-span-full row-span-full h-full w-full overflow-hidden">
		{#if image}
			<Picture class="rounded-none" {image} />
		{/if}
	</div>

	<div
		class="z-10 col-span-full row-span-full container mx-auto flex max-h-svh flex-col items-center justify-center pt-(--header-height) pb-10 md:py-0
"
	>
		<RichTextRender
			overrides={'prose-headings:text-balance prose-headings:text-xl max-w-full container'}
			{richText}
		/>
		<div class="pt-10">
			<Button {link} />
		</div>
	</div>
</section>
