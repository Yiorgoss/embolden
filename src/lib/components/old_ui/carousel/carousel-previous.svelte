<script lang="ts">
	import type { WithoutChildren } from 'bits-ui';
	import { getEmblaContext } from './context.svelte';
	import { cn } from '@/utils';
	import { Button, type Props } from '@/components/ui/button';
	import Icon from '@/components/common/icon.svelte';

	let {
		ref = $bindable(null),
		class: className,
		variant = 'outline',
		size = 'icon',
		left = true,
    ...restProps
	}: WithoutChildren<Props & { left?: boolean }> = $props();

	const emblaCtx = getEmblaContext('<Carousel.Previous/>');
</script>

<Button
	data-slot="carousel-previous"
	{variant}
	{size}
	class={cn(
		'absolute size-8 rounded-full',
		emblaCtx.orientation === 'horizontal'
			? cn('top-1/2 -left-0 -translate-y-1/2 md:-left-12', !left && 'left-full md:left-auto -mt-10 -right-0 md:-right-12')
			: '-top-12 left-1/2 -translate-x-1/2 rotate-90',
		className
	)}
	disabled={!emblaCtx.canScrollPrev}
	onclick={emblaCtx.scrollPrev}
	onkeydown={emblaCtx.handleKeyDown}
	{...restProps}
	bind:ref
>
	<Icon name="arrow-left" />
	<span class="sr-only">Previous slide</span>
</Button>
