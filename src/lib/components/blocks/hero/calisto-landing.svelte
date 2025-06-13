<script lang="ts">
	import { type ICalistoLanding } from '@payload-types';

	import Picture from '@/components/common/picture.svelte';
	import Button from '@/components/common/button.svelte';
	import { RichTextRender } from '@/components/blocks/rich-text';
	import { fade } from 'svelte/transition';
	import { onMount, setContext } from 'svelte';

	const { blockData, cb }: { blockData: ICalistoLanding; cb?: () => void } = $props();
	const { image, richText, ctaOne, ctaTwo } = blockData;

	onMount(() => cb && cb());

	let bgLoaded = $state(false);
	console.time('a');
</script>

<div id="calisto-landing" class="grid h-lvh grid-cols-3 grid-rows-3 md:min-h-lvh">
	<div class="z-0 col-span-full row-span-full">
		{#if image}
			<Picture
				loading="eager"
				cb={() => {
					bgLoaded = true;
				}}
				{image}
			/>
		{/if}
	</div>
	<div
		class:opacity-100={bgLoaded}
		class="z-10 transition-opacity delay-500 duration-400 opacity-0 col-span-full row-start-2 row-end-4 container px-5"
	>
		<div class="flex h-full max-w-fit flex-col items-start justify-center">
			{#if richText}
				<RichTextRender {richText} />
			{/if}
			<div class="flex gap-5 self-start pt-10 md:self-end">
				<Button class="px-5  py-5" link={ctaTwo} />
				<Button class="px-5  py-5" link={ctaOne} />
			</div>
		</div>
	</div>
</div>
