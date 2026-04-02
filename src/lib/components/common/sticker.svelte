<script lang="ts">
	import { type IStickerField } from '@payload-types';
	import { site } from '@/config';
	import { MediaQuery } from 'svelte/reactivity';

	const { data }: { data: IStickerField | undefined } = $props();
	const mobile = new MediaQuery('max-width: 480px');
</script>

{#if data?.url}
	<div
		style:top={mobile.current ? data?.mobileStyle?.top : data?.style?.top}
		style:bottom={mobile.current ? data?.mobileStyle?.bottom : data?.style?.bottom}
		style:left={mobile.current ? data?.mobileStyle?.left : data?.style?.left}
		style:right={mobile.current ? data?.mobileStyle?.right : data?.style?.right}
		class="absolute"
	>
		<img
			style:width={data?.style?.width ?? data?.url?.width ?? 'auto'}
			style:height={data?.style?.height ?? data?.url?.height ?? '100px'}
			src={`${site.storage}/${data?.url?.filename}`}
			alt=""
		/>
	</div>
{/if}
