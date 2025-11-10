<script lang="ts">
	import type { IGradientBG } from '@payload-types';
	import { animate, frame } from 'motion';
	import { onMount } from 'svelte';

	const { blockData }: { blockData: IGradientBG } = $props();
	const { gradientList } = blockData || {};
	let mouseColor = 'aqua';

	let element = $state() as Element;
	let mouseElem = $state() as HTMLElement;

	const keyframeObj = [
		{
			anim: { rotate: [0, -180, 0] },
			seq: { duration: 30, repeat: Infinity, ease: 'linear' }
		},
		{
			anim: { x: ['-10%', '50%', '0%'], y: ['-50%', '0%', '50%'] },
			seq: { duration: 30, repeat: Infinity, ease: 'easeInOut' }
		},
		{
			anim: { rotate: [0, 100, 0] },
			seq: { duration: 20, repeat: Infinity, ease: 'easeInOut' }
		},
		{
			anim: { x: ['50%', '-50%', '50%'], y: ['-50%', '40%', '-50%'] },
			seq: { duration: 20, repeat: Infinity, ease: 'easeInOut' }
		},
		{
			anim: { y: ['-30%', '50%', '-30%'] },
			seq: { duration: 20, repeat: Infinity, ease: 'linear' }
		}
	];
	const init = [
		//from center
		{ x: '-50%', y: '-20%', origin: 'top right' },
		{ x: '0px', y: '0px', origin: 'center right' },
		{ x: '20%', y: '0px', origin: '40% -30%' },
		{ x: '00px', y: '00px', origin: 'center center' },
		{ x: '400px', y: '0px', origin: 'center center' }
	];

	$effect(() => {
		const wrap = keyframeObj.length;
		element.querySelectorAll('.gradient-id').forEach((word, i) => {
			const { anim, seq } = keyframeObj[i % wrap];
			//@ts-ignore // seems to work idk why ts error
			animate(word, anim, seq);
		});
	});

	let mouse = $state({ x: 0, y: 0 });
	let next = $state({ x: 0, y: 0 });

	function move() {
		next.x += Math.round((mouse.x - next.x) / 20);
		next.y += Math.round((mouse.y - next.y) / 20);

		mouseElem.style.transform = `translate(${next.x}px, ${next.y}px)`;

		frame.render(() => move());
	}

	onMount(() => move());

	function onmousemove(event: MouseEvent) {
		mouse.x = event.clientX;
		mouse.y = event.clientY;
	}
</script>

<section id="gradient-bg-block ">
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div class="overflow-hidden relative h-lvh bg-amber-900">
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
			bind:this={element}
			{onmousemove}
			class="h-full w-full"
			style:filter="url(#goo) blur(40px)"
		>
			{#each gradientList as gradient, _i}
				{@const i = _i + 1}
				{@const start = init[i % init.length]}
				<div
					style={`--chart-${i}: ${gradient.value}`}
					id={`grad-${i}`}
					style:background={`radial-gradient(circle at center, hsl(from var(--chart-${i}) h s l / 0.8) 0%, transparent 50%)`}
					style:height={gradient.height ?? '80%'}
					style:width={gradient.width ?? '80%'}
					style:mix-blend-mode="hard-light"
					style:top={`calc(50% + ${start.y})`}
					style:left={`calc(50% + ${start.x})`}
					style:transform-origin={start.origin}
					class="gradient-id absolute -translate-1/2"
				></div>
			{/each}
			<div
				bind:this={mouseElem}
				style:height="80%"
				style:width="80%"
				style:background={`radial-gradient(circle at center, hsl(from ${mouseColor ?? 'white'} h s l / 0.8) 0%, transparent 50%)`}
				class="absolute top-0 left-0 -translate-1/2 mouse-follow"
			></div>
		</div>
	</div>
</section>
