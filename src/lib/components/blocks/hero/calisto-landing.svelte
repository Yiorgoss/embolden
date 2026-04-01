<script lang="ts">
	import { type ICalistoLanding } from '@payload-types';

	import Image from '@/components/common/image.svelte';
	import { RichTextRender } from '@/components/blocks/rich-text';
	import { onMount } from 'svelte';

	const { blockData, cb }: { blockData: ICalistoLanding; cb?: () => void } = $props();
	const { image, richText } = $derived(blockData);

	onMount(() => {
		cb && cb();
	});
	let bgLoaded = $state(false);
</script>

<div id="calisto-landing" class="grid min-h-lvh grid-cols-1 grid-rows-1 md:h-auto md:min-h-lvh">
	<div class="-z-0 col-span-full row-span-full">
		{#if image}
			<Image
				cb={() => {
					bgLoaded = true;
				}}
				loading="eager"
				fetchpriority="high"
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
