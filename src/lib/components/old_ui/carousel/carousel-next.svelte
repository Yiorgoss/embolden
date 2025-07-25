<script lang="ts">
	import type { WithoutChildren } from 'bits-ui';
	import { getEmblaContext } from './context.svelte';
	import { cn } from '@/utils';
	import Button from '@/components/common/button.svelte';
	import Icon from '@/components/common/icon.svelte';

	let {
		ref = $bindable(null),
		class: className,
		variant = 'outline',
		size = 'icon',
		right = true,
		...restProps
	}: WithoutChildren<Props & { right?: boolean }> = $props();

	const emblaCtx = getEmblaContext('<Carousel.Next/>');
</script>

<Button
	data-slot="carousel-next"
	{variant}
	{size}
	class={cn(
		'absolute size-8 rounded-full',
		emblaCtx.orientation === 'horizontal'
			? cn('top-1/2 -right-0 -translate-y-1/2 md:-right-12', !right && '-left-0 md:-left-12')
			: '-bottom-12 left-1/2 -translate-x-1/2 rotate-90',
		className
	)}
	disabled={!emblaCtx.canScrollNext}
	onclick={emblaCtx.scrollNext}
	onkeydown={emblaCtx.handleKeyDown}
	bind:ref
	{...restProps}
>
	<Icon name="arrow-right" class="size-4" />
	<span class="sr-only">Next slide</span>
</Button>
