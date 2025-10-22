<script lang="ts">
	import { onMount } from 'svelte';
	import Picture from '@/components/common/picture.svelte';
	import { throttle } from '@/utils';
	//  import { scroll, animate, type AnimationPlaybackControls } from 'motion';
	import type { IScrollGrowLanding } from '@payload-types';
	import { RichTextRender } from '../rich-text';
	import Button from '@/components/common/button.svelte';
	import { scroll } from '@/attachments/animations/scroll';

	const { blockData }: { blockData: IScrollGrowLanding } = $props();
	const { initImg, finalImg, richText, link, style } = blockData;
	const { background, minHeight, height } = style || {};
</script>

<section id="scroll-grow-landing-block" class="relative">
	<div class="h-full overflow-x-clip relative grid grid-cols-1 grid-rows-1">
		<div style:background class="-z-0 col-start-1 row-start-1 h-full w-full">
			<Picture image={initImg} class="" />
		</div>
		<div class="relative flex z-10 justify-center items-center col-start-1 row-start-1">
			<div
				{@attach scroll('grow-scroll-translate')}
				class="relative flex flex-col justify-center items-center"
			>
				<RichTextRender {richText} />
				<Button {link} class="w-fit" />
			</div>
		</div>
		<div
			style:height={`calc(${height ?? '100vh'}*1.5)`}
			style:transform-origin="center bottom"
			{@attach scroll('grow-scroll-scale')}
			class="col-start-1 row-start-1 relative w-full"
		>
			<Picture image={finalImg} class="w-full " />
		</div>
	</div>
</section>
