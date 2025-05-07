<script lang="ts">
	import { type IMediumHero } from '@payload-types';
	import { RichTextRender } from '@/components/blocks/rich-text';
	import Picture from '@/components/common/picture.svelte';
	import { Button } from '@/components/ui/button';

	const { blockData }: { blockData: IMediumHero } = $props();
	const { image, richText, link } = blockData;
</script>

<section id="medium-hero" class="grid min-h-[20vh] grid-cols-1 md:h-[80svh]">
	<div class=" col-span-full row-span-full h-full w-full overflow-hidden">
		{#if image}
			<Picture class="rounded-none" data={image} />
		{/if}
	</div>

	<div
		class="z-10 col-span-full row-span-full container mx-auto flex max-h-svh flex-col items-center justify-center pt-(--header-height) pb-10 md:py-0
"
	>
		<RichTextRender
			overrides="prose-headings:text-balance prose-headings:text-xl max-w-full container"
			{richText}
		/>
    <div class="pt-10">
		<Button cmsData={link} />
      </div>
	</div>
</section>
