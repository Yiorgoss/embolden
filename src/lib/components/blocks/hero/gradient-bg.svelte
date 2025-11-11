<script lang="ts">
	import { onMount } from 'svelte';
	import type { IGradientBG } from '@payload-types';
	import { animate, cancelFrame, frame, type AnimationDefinition } from 'motion';
	import type { AnimationControls } from '@motionone/types';
	import { RichTextRender } from '@/components/blocks/rich-text';
	import { lavalamp } from '@/attachments/animations/lavalamp';
	import { mouseFollow } from '@/attachments/animations/mouse-follow.svelte';
	import type { Attachment } from 'svelte/attachments';

	const { blockData }: { blockData: IGradientBG } = $props();
	const { richText, gradientList, style, mouseColor } = blockData || {};
	const { background } = style || {};

	let element = $state() as Element;
	let mouseElem = $state() as HTMLElement;

	const init = [
		//from center
		{ x: '-50%', y: '-20%', origin: 'top right' },
		{ x: '0px', y: '0px', origin: 'center right' },
		{ x: '20%', y: '0px', origin: '40% -30%' },
		{ x: '00px', y: '00px', origin: '20% -30% ' }
	];
</script>

<section id="gradient-bg-block ">
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		style:background
		class=" overflow-hidden relative h-lvh w-full flex justify-center items-center"
	>
		<svg class="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
			<defs>
				<filter id="goo">
					<feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
					<feColorMatrix
						in="blur"
						mode="matrix"
						values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
						result="goo"
					/>
					<feBlend in="SourceGraphic" in2="goo" />
				</filter>
			</defs>
		</svg>
		<div
			{@attach lavalamp('yy')}
			{@attach mouseFollow(mouseElem)}
			class="h-full w-full"
			style:filter="url(#goo) blur(20px)"
		>
			<div
				bind:this={mouseElem}
				style:height="80%"
				style:width="80%"
				style:background={`radial-gradient(circle at center, hsl(from ${mouseColor} h s l / 0.8) 0%, transparent 30%)`}
				class="absolute top-0 left-0 -translate-1/2 mouse-follow"
			></div>
			{#each gradientList ?? [] as gradient, _i}
				{@const i = _i + 1}
				{@const start = init[i % init.length]}
				<div
					style={`--chart-${i}: ${gradient.color}`}
					id={`grad-${i}`}
					style:background={`radial-gradient(circle at center, hsl(from var(--chart-${i}) h s l / 0.8) 0%, transparent 50%)`}
					style:height={gradient.height ?? '80%'}
					style:width={gradient.width ?? '80%'}
					style:mix-blend-mode="hard-light"
					style:top={`calc(50% + ${start.y})`}
					style:left={`calc(50% + ${start.x})`}
					style:transform-origin={start.origin}
					class="rounded-full gradient-id absolute -translate-1/2"
				></div>
			{/each}
		</div>
		<RichTextRender {richText} overrides="mx-auto my-auto absolute inset-0 isolate h-fit w-fit" />
	</div>
</section>
