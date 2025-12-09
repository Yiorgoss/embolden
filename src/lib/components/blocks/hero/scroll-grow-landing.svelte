<script lang="ts">
	import { onMount } from 'svelte';
	import Picture from '@/components/common/picture.svelte';
	import { throttle } from '@/utils';
	//  import { scroll, animate, type AnimationPlaybackControls } from 'motion';
	import type { IScrollGrowLanding } from '@payload-types';
	import { RichTextRender } from '../rich-text';
	import Button from '@/components/common/button.svelte';
	import { animate } from '@/attachments/animations/animate.svelte';
	import { createAnimationObject } from '@/utils/ui-utils';

	const { blockData }: { blockData: IScrollGrowLanding } = $props();
	const {
		initImg,
		finalImg,
		richText,
		link,
		style: { background, height } = {}
	} = $derived(blockData);
</script>

<section
	style:background
	id="scroll-grow-landing-block"
	style:height="150lvh"
	class="overflow-clip relative"
>
	<div class="h-full grid grid-cols-1 grid-rows-1">
		<div class="-z-0 col-start-1 row-start-1 h-full w-full">
			<Picture image={initImg} class="" />
		</div>
		<div class="flex z-10 justify-center items-center col-start-1 row-start-1">
			<div class="sticky top-1/2 -translate-y-1/2">
				<RichTextRender {richText} />
			</div>
		</div>
		<div {@attach animate({ animation })} class="col-start-1 row-start-1 relative w-full">
			<Picture image={finalImg} class="w-full " />
		</div>
	</div>
</section>
