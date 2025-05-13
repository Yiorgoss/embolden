<script lang="ts">
	import { type ICarousel } from '@payload-types';
	import RenderBlocks from '../render-blocks.svelte';
	import * as Carousel from '@/components/ui/carousel';
	import { type CarouselAPI } from '@/components/ui/carousel/context.svelte';

	const { blockData }: { blockData: ICarousel; class?: string } = $props();
	const { items } = blockData;

	let api = $state<CarouselAPI>();
	let current = $state(0);

	$effect(() => {
		if (api) {
			current = api.selectedScrollSnap();
			api.on('select', () => {
				current = api!.selectedScrollSnap();
			});
		}
	});
</script>

<Carousel.Root
	opts={{ duration: 5, loop: true, align: 'start', containScroll: false }}
	setApi={(emblaApi: CarouselAPI | undefined) => (api = emblaApi)}
>
	<Carousel.Content
		class="flex max-w-screen md:max-w-sm lg:max-w-lg "
	>
		{#each items ?? [] as item}
			<Carousel.Item class="max-w-sm lg:max-w-lg">
				<RenderBlocks blockData={item} />
			</Carousel.Item>
		{/each}
	</Carousel.Content>
	<div class="hidden lg:block">
		<Carousel.Previous />
	</div>
	<div class="hidden md:block">
		<Carousel.Next />
	</div>
</Carousel.Root>
