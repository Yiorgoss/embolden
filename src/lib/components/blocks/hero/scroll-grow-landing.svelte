<script lang="ts">
	import { onMount } from 'svelte';
	import Picture from '@/components/common/picture.svelte';
	import { throttle } from '@/utils';
	import { scroll, animate, type AnimationPlaybackControls } from 'motion';
	import type { IScrollGrowLanding } from '@payload-types';
	import { RichTextRender } from '../rich-text';

	const { blockData }: { blockData: IScrollGrowLanding } = $props();
	const { initImg, finalImg, richText, link, style } = blockData;
	const { background, minHeight } = style || {};

	let container = $state<Element>() as Element;
	let target = $state<Element>() as Element;
	let item = $state<Element>() as Element;

	onMount(() => {
		scroll(animate(item, { scale: [0.2, 1, 3], opacity: [0.8, 1, 0] }), {
			target: item,
			//  offset: ['start end', 'end end', 'start start', 'end start']
			offset: ['start center', 'end center', 'end start']
		});
	});
	//  $inspect(target, container);
</script>

<section id="scroll-grow-landing-block" class="relative h-svh">
	<div class="h-full overflow-x-clip">
		<div
			bind:this={target}
			class="absolute inset-0 flex z-10 justify-center items-center col-start-1 row-start-1"
		>
			<RichTextRender {richText} />
		</div>
		<div id="target" bind:this={item} class="col-start-1 row-start-1 origin-[50%_90%] h-lvh w-full">
			<Picture image={finalImg} class="object-cover md:object-cover w-full " />
		</div>
	</div>
</section>
