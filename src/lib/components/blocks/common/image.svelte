<script lang="ts">
	import Picture from '@/components/common/picture.svelte';
	import { cn } from '@/utils';
	import { type IImage } from '@payload-types';

	const { blockData }: { blockData: IImage } = $props();
	const { image, options } = blockData ?? {};
</script>

<div id="image-block" class="p-3 md:p-6">
	<Picture
		class={cn(
			'md:rounded-none h-[300px] object-contain max-h-[500px] rounded-theme md:h-full',
			options?.rounded && 'rounded-theme'
		)}
		{image}
	/>
</div>
