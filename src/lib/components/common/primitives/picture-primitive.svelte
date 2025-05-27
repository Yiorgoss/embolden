<script lang="ts">
	import { type Asset, type IImage, type IImageField } from '@payload-types';
	import { cn, fetchFromCMS, resolveID } from '@/utils';
	import { getContext, hasContext, onMount } from 'svelte';

	const {
		asset,
		image,
		pictureClass,
		class: imageClass = 'object-cover',
		sizes: imageSizes = '100vw',
		cb
	}: {
		asset: Asset;
		image?: IImageField;
		pictureClass?: string;
		class?: string;
		sizes?: string;
		cb?: () => void;
	} = $props();

	onMount(() => {
		cb && cb();
	});

	let loading: 'lazy' | 'eager' | null | undefined = 'lazy';
</script>

<div class="grid h-full w-full grid-cols-1 grid-rows-1">
	<picture
		class={cn('z-0 col-start-1 row-start-1 h-full min-h-full w-full min-w-full', pictureClass)}
	>
		{#each Object.entries(asset.sizes ?? {}) as [_, img]}
			<source
				type={img.mimeType}
				sizes={imageSizes}
				media={`(max-width: ${img.width}px)`}
				srcset={img.url}
			/>
		{/each}
		<img
			src={asset.url}
			alt={image?.alt ?? ''}
			{loading}
			class={cn('col-start-1 row-start-1 h-full w-full object-cover', imageClass)}
		/>
	</picture>
	<!-- overlay color -->
	<div
		style:background-color={image?.style?.color ?? ''}
		style:opacity={image?.style?.opacity ?? ''}
		class="z-10 col-start-1 row-start-1 h-full w-full"
	></div>
</div>
