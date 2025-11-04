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

	<div
		class="z-10 h-full bg-red-300 container mx-auto flex flex-col items-center justify-center pb-10 md:py-0"
	>
		<div class="h-full w-full">
			<RichTextRender overrides={'max-w-full container'} {richText} />
			<div class="pt-10">
				<Button {link} />
			</div>
		</div>
	</div>
</section>
