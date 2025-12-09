<script lang="ts">
	import { cn } from '@/utils';
	import { type IGutter } from '@payload-types';
	const { blockData }: { blockData: IGutter } = $props();
	const { size, bgColor, divider } = $derived(blockData || {});
	const sizeInPx = $derived(
		size === 'small'
			? 'h-[10px] md:h-[30px]'
			: size === 'medium'
				? 'h-[30px] md:h-[90px]'
				: size === 'default'
					? 'h-[50px] md:h-[150px]'
					: size === 'large'
						? 'h-[70px] md:h-[210px]'
						: size === 'extraLarge'
							? 'h-[90px] md:h-[270px]'
							: '0px'
	);
</script>

<div
	id="gutter"
	class:container={bgColor?.onlyInContainer ?? false}
	class:items-start={divider == 'above'}
	class:items-center={divider == 'center'}
	class:items-end={divider == 'below'}
	class={cn('container mx-auto flex items-center', sizeInPx)}
>
	<div
		class="h-[1px] w-full"
		style:background-color={bgColor?.value ?? 'var(--color-background)'}
	></div>
</div>
