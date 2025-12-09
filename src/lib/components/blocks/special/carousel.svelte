<script lang="ts">
	import { type ICarousel } from '@payload-types';
	import RenderBlocks from '../render-blocks.svelte';
	import * as Carousel from '@/components/ui/carousel';
	import * as Card from '@/components/ui/card';
	import { type CarouselAPI } from '@/components/ui/carousel/context';
	import { MediaQuery } from 'svelte/reactivity';

	const { blockData }: { blockData: ICarousel; class?: string } = $props();
	const { items, options } = $derived(blockData);

	let api = $state<CarouselAPI>();
	let current = $state(0);

	$effect(() => {
		if (!api) return;
		current = api.selectedScrollSnap();
		api.on('select', () => {
			current = api!.selectedScrollSnap();
		});
	});

	const medium = new MediaQuery('(min-width: 640px) and (max-width: 1024px)');
</script>

<Carousel.Root
	opts={{ duration: 70, loop: !!options?.loop, align: 'start', containScroll: false }}
	setApi={(emblaApi: CarouselAPI | undefined) => (api = emblaApi)}
>
	<Carousel.Content class="flex max-w-screen w-full md:max-w-sm lg:max-w-lg items-stretch ">
		{#each items ?? [] as item}
			<Carousel.Item class="max-w-md [&_img]:h-[300px] self-stretch lg:max-w-lg">
				<RenderBlocks blockData={item} />
			</Carousel.Item>
		{/each}
	</Carousel.Content>
	<div class="hidden md:block">
		<Carousel.Previous />
	</div>
	<div class="hidden md:block">
		<Carousel.Next />
	</div>
</Carousel.Root>
