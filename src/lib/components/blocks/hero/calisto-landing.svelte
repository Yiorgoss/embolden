<script lang="ts">
	import { type ICalistoLanding } from '@payload-types';

	import Picture from '@/components/common/picture.svelte';
	import Button from '@/components/common/button.svelte';
	import { RichTextRender } from '@/components/blocks/rich-text';
	import { fade } from 'svelte/transition';
	import { onMount, setContext } from 'svelte';

	const { blockData, cb }: { blockData: ICalistoLanding; cb?: () => void } = $props();
	const { image, richText, ctaOne, ctaTwo } = $derived(blockData);

	onMount(() => {
		cb && cb();
	});
	let bgLoaded = $state(false);
</script>

<div id="calisto-landing" class="grid min-h-lvh grid-cols-1 grid-rows-1 md:h-auto md:min-h-lvh">
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
	<div class="z-10 col-span-full row-span-full pt-(--header-height) py-5 px-5">
		<div class="flex h-full w-full lg:w-3/5 flex-col items-start justify-center">
			{#if richText && bgLoaded}
				<RichTextRender {richText} overrides="my-0" />
			{/if}
		</div>
	</div>
</div>
