<script lang="ts">
	import Picture from '@/components/common/picture.svelte';
	import { cn } from '@/utils';
	import { type IImage } from '@payload-types';

	const { blockData }: { blockData: IImage } = $props();
	const { image } = blockData ?? {};
</script>

<div id="image-block" class="p-3 md:p-6">
	<Picture class="rounded-none h-[300px] object-cover max-h-[500px] md:h-full" {image} />
</div>
