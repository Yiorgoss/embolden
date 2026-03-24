<script lang="ts">
	import { type IStickerField } from '@payload-types';
	import { site } from '@/config';

	const { data }: { data: IStickerField } = $props();
</script>

{#if data.url}
	<div
		style:top={data?.style?.top ?? 'auto'}
		style:right={data?.style?.right ?? 'auto'}
		style:bottom={data?.style?.bottom ?? 'auto'}
		style:left={data?.style?.left ?? 'auto'}
		class="absolute"
	>
		<img
			style:width={data?.style?.width ?? data?.url?.width ?? '100px'}
			style:height={data?.style?.height ?? data?.url?.height ?? '100px'}
			src={`${site.storage}/${data?.url?.filename}`}
			alt=""
		/>
	</div>
{/if}
