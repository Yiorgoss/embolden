<script lang="ts">
	import { MediaQuery } from 'svelte/reactivity';
	import { type IBlockColumnLayout } from '@payload-types';
	import RenderBlocks from '../render-blocks.svelte';
	import { cn } from '@/utils';

	const { blockData }: { blockData: IBlockColumnLayout } = $props();
	const { layout, columnOne, columnTwo, columnThree, style, mobileStyle } = blockData;

	const normaliseWidth = (layout: string) => {
		const cssList = [];
		switch (layout) {
			case 'oneColumn':
				cssList.push('md:w-full');
				cssList.push('md:w-0');
				cssList.push('md:w-0');
				break;
			case 'halfAndHalf':
				cssList.push('md:w-1/2');
				cssList.push('md:w-1/2');
				cssList.push('md:w-0');
				break;
			case 'oneTwoThird':
				cssList.push('md:w-1/3');
				cssList.push('md:w-2/3');
				cssList.push('md:w-0');
				break;
			case 'twoOneThird':
				cssList.push('md:w-2/3');
				cssList.push('md:w-1/3');
				cssList.push('md:w-0');
				break;
			case 'threeColumns':
				cssList.push('md:w-1/3');
				cssList.push('md:w-1/3');
				cssList.push('md:w-1/3');
				break;
		}
		return cssList;
	};

	const widthClass = normaliseWidth(layout ?? 'oneColumn');

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
		style:background="var(--xx)"
		class="flex justify-center items-stretch h-full flex-col px-0 py-2 md:py-0 md:px-5 md:flex-row container mx-auto flex-wrap"
	>
		<div
			style:align-items={style?.alignY}
			style:justify-content={style?.alignX}
			class={cn('flex px-0 md:px-5 justify-center items-center', widthClass[0])}
		>
			<RenderBlocks blockData={columnOne![0]} />
		</div>
		{#if columnTwo && columnTwo.length != 0}
			<div
				style:align-items={style?.alignY}
				style:justify-content={style?.alignX}
				class={cn('flex px-0 md:px-5 justify-center items-center ', widthClass[1])}
			>
				<RenderBlocks blockData={columnTwo[0]} />
			</div>
		{/if}
		{#if columnThree && columnThree.length != 0}
			<div
				style:align-items={style?.alignY}
				style:justify-content={style?.alignX}
				class={cn('px-0 md:px-5 flex justify-center items-center ', widthClass[2])}
			>
				<RenderBlocks blockData={columnThree[2]} />
			</div>
		{/if}
	</div>
</section>
