<script lang="ts">
	import Picture from '@/components/common/picture.svelte';
	import { cn } from '@/utils';
	import { type IImage } from '@payload-types';

	const { blockData }: { blockData: IImage } = $props();
</script>

<div id="image-block" class="h-full w-full">
	<Picture class="" image={blockData.image} />
</div>
