<script lang="ts">
	import { onMount } from 'svelte';
	import Picture from '@/components/common/picture.svelte';
	import { throttle } from '@/utils';
	import { scroll, animate, type AnimationPlaybackControls } from 'motion';
	import type { IScrollGrowLanding } from '@payload-types';
	import { RichTextRender } from '../rich-text';
	import Button from '@/components/common/button.svelte';

	const { blockData }: { blockData: IScrollGrowLanding } = $props();
	const { initImg, finalImg, richText, link, style } = blockData;
	const { background, minHeight, height } = style || {};

	let container = $state<Element>() as Element;
	let text = $state<Element>() as Element;
	let item = $state<Element>() as Element;

	onMount(() => {
		scroll(
			animate(
				item,
				{
					scale: [0.5, 1, 3],
					opacity: [1, 0.8, 0]
				},
				{ ease: ['linear'] }
			),
			{
				target: item,
				offset: ['start start', 'end end', 'end start']
			}
		);
		scroll(
			animate(
				text,
				{ transform: ['none', 'translateY(30vh)'], rotate: [0, 360] },
				{ ease: ['linear'] }
			),
			{
				target: text,
				offset: ['start center', 'start 0.2']
			}
		);
	});
	//  $inspect(target, container);
</script>

<section id="scroll-grow-landing-block" class="relative">
	<div class="h-full overflow-x-clip relative grid grid-cols-1 grid-rows-1">
		<div style:background class="-z-0 col-start-1 row-start-1 h-full w-full">
			<Picture image={finalImg} class="" />
		</div>
		<div class="relative flex z-10 justify-center items-center col-start-1 row-start-1">
			<div bind:this={text} class="relative flex flex-col justify-center items-center">
				<RichTextRender {richText} />
				<Button {link} class="w-fit" />
			</div>
		</div>
		<div
			style:height={`calc(${height ?? '100vh'}*1.5)`}
			style:transform-origin="center 90%"
			bind:this={item}
			class="col-start-1 row-start-1 relative w-full"
		>
			<Picture image={finalImg} class="w-full " />
		</div>
	</div>
</section>
