<script lang="ts">
	import Picture from '@/components/common/picture.svelte';
	import { cn } from '@/utils';
	import { type IImage } from '@payload-types';

	const { blockData }: { blockData: IImage } = $props();
	const { image } = blockData ?? {};
</script>

<div id="image-block" class="h-full w-full p-3 md:p-6">
	<Picture class="" {image} />
</div>
