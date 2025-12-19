<script lang="ts">
	import { MediaQuery } from 'svelte/reactivity';
	import { type IBlockColumnLayout } from '@payload-types';
	import RenderBlocks from '../render-blocks.svelte';
	import { cn } from '@/utils';
	import { animateViewport } from '@/attachments/animations/viewport';

	const { blockData }: { blockData: IBlockColumnLayout } = $props();
	const { layout, columnOne, columnTwo, columnThree, style, mobileStyle, animation } =
		$derived(blockData);

	const normaliseWidth = (layout: string) => {
		const cssList = [];
		switch (layout) {
			case 'oneColumn':
				cssList.push('md:w-full');
				cssList.push('md:w-0');
				cssList.push('md:w-0');
				break;
			case 'halfAndHalf':
				cssList.push('md:grow-1 md:shrink-1 md:basis-0 md:w-0'); //flex-[1_1_0] w-0
				cssList.push('md:grow-1 md:shrink-1 md:basis-0 md:w-0');
				cssList.push('md:w-0');
				break;
			case 'oneTwoThird':
				cssList.push('md:grow-1 md:shrink-1 md:basis-0 md:w-0');
				cssList.push('md:grow-2 md:shrink-1 md:basis-0 md:w-0');
				cssList.push('md:w-0');
				break;
			case 'twoOneThird':
				cssList.push('md:grow-2 md:shrink-1 md:basis-0 md:w-0');
				cssList.push('md:grow-1 md:shrink-1 md:basis-0 md:w-0');
				cssList.push('md:w-0');
				break;
			case 'threeColumns':
				cssList.push('max-w-sm w-full');
				cssList.push('max-w-sm w-full');
				cssList.push('max-w-sm w-full');
				break;
		}
		return cssList;
	};

	const widthClass = $derived(normaliseWidth(layout ?? 'oneColumn'));

	const mobile = new MediaQuery('max-width: 480px');
</script>

<section
	id="block-column-layout"
	style:--padding={mobile.current ? mobileStyle?.padding : style?.padding}
	style:background={style?.color}
	class="p-0 md:py-5"
>
	<div
		style:padding={style?.padding}
		style:overflow={style?.overflow}
		style:gap={style?.gap}
		class:flex-wrap={layout == 'threeColumns'}
		class="flex gap-0 md:gap-10 justify-center items-center md:items-stretch h-full flex-col md:flex-row container mx-auto"
		{@attach animateViewport(animation?.vap)}
	>
		{#if columnOne && columnOne.length != 0}
			<div
				style:align-items={style?.alignY}
				style:justify-content={style?.alignX}
				class={cn(
					'animate-child w-full flex grow-1 justify-center items-center md:items-stretch',
					widthClass[0]
				)}
			>
				<RenderBlocks blockData={columnOne[0]} />
			</div>
		{/if}
		{#if columnTwo && columnTwo.length != 0}
			<div
				style:align-items={style?.alignY}
				style:justify-content={style?.alignX}
				class={cn(
					'animate-child w-full flex grow-2 justify-center items-center md:items-stretch',
					widthClass[1]
				)}
			>
				<RenderBlocks blockData={columnTwo[0]} />
			</div>
		{/if}
		{#if columnThree && columnThree.length != 0}
			<div
				style:align-items={style?.alignY}
				style:justify-content={style?.alignX}
				class={cn(
					'animate-child w-full flex justify-center items-center md:items-stretch',
					widthClass[2]
				)}
			>
				<RenderBlocks blockData={columnThree[0]} />
			</div>
		{/if}
	</div>
</section>
