<script lang="ts">
	import Picture from '@/components/common/picture.svelte';
	import { type IImage } from '@payload-types';

	const { blockData }: { blockData: IImage } = $props();
	const { image } = blockData ?? {};
</script>

<div id="image-block" class="p-0 md:p-6">
	<Picture class="md:rounded-theme h-[300px]  max-h-[500px] rounded-none md:h-full" {image} />
</div>
