<script lang="ts">
	import { type ICalistoLanding } from '@payload-types';

	import Picture from '@/components/common/picture.svelte';
	import Button from '@/components/ui/button/button.svelte';
	import { RichTextRender } from '@/components/blocks/rich-text';
	import { fade } from 'svelte/transition';
	import { setContext } from 'svelte';

	const { blockData }: { blockData: ICalistoLanding } = $props();
	const { image, richText, ctaOne, ctaTwo } = blockData;

	let bgLoaded = $state(false);
	$inspect(bgLoaded);
</script>

<div id="calisto-landing" class="grid min-h-lvh grid-cols-3 grid-rows-3 md:min-h-screen">
	<div class="z-0 col-span-full row-span-full">
		{#if image}
			<Picture cb={() => (bgLoaded = true)} {image} />
		{/if}
	</div>
	<div class="bg-background/30 z-10 col-span-full row-span-full h-full w-full"></div>
	<div class="z-10 col-span-full row-start-2 row-end-4 container px-5">
		{#key bgLoaded}
			<div
				in:fade={{ delay: 500, duration: 1000 }}
				class:hidden={!bgLoaded}
				class="flex h-full max-w-fit flex-col items-start justify-center"
			>
				{#if richText}
					<RichTextRender {richText} />
				{/if}
				<div class="flex gap-5 self-start pt-10 md:self-end">
					<Button class="px-5  py-5" link={ctaTwo} />
					<Button class="px-5  py-5" link={ctaOne} />
				</div>
			</div>
		{/key}
	</div>
</div>
