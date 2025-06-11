<script lang="ts">
	import { type Asset, type IImageField } from '@payload-types';
	import { cn, fetchFromCMS, resolveID } from '@/utils';
	import { getContext, hasContext, onMount } from 'svelte';
	import { MediaQuery } from 'svelte/reactivity';
	import { fade, fly } from 'svelte/transition';

	const {
		asset,
		image,
		pictureClass,
		loading,
		class: imageClass = 'object-cover',
		sizes: imageSizes = '100vw',
		cb
	}: {
		asset: Asset;
		image?: IImageField;
		loading?: 'eager' | 'lazy';
		pictureClass?: string;
		class?: string;
		sizes?: string;
		cb?: () => void;
	} = $props();

	onMount(() => {
		cb && cb();
	});

	let imageLoaded = $state(false);
	let placeholder = asset?.sizes?.['placeholder'];
	let mobile = asset?.sizes?.['sm'];
</script>

<!-- -->
<svelte:head>
	{#if loading == 'eager'}
		{#if placeholder && placeholder.filename}
			<link
				rel="preload"
				as="image"
				href={placeholder.url}
				media={`(max-width: ${placeholder.width}px)`}
			/>
		{/if}
		{#if mobile}
			<link
				rel="preload"
				fetchpriority="high"
				as="image"
				href={mobile.url}
				media={`(max-width: ${mobile.width}px)`}
			/>
		{/if}
	{/if}
</svelte:head>
<!-- -->
<div class="grid h-full w-full relative grid-cols-1 grid-rows-1">
	{#if placeholder && placeholder.filename}
		{#if !imageLoaded}
			<div class="col-start-1 row-start-1">
				<img
					out:fade={{ duration: 300 }}
					src={placeholder.url}
					sizes={imageSizes}
					{loading}
					class={cn('blur-3xl -z-10 h-full w-full', pictureClass, imageClass)}
					alt=""
				/>
			</div>
		{/if}
	{/if}
	<picture
		class={cn('z-10 col-start-1 row-start-1 h-full min-h-full w-full min-w-full', pictureClass)}
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
			onload={() => (imageLoaded = true)}
			{loading}
			fetchpriority={loading == 'eager' ? 'high' : 'low'}
			class:opacity-100={imageLoaded}
			class={cn(
				'z-0 transition-all duration-300 opacity-0 col-start-1 row-start-1 h-full w-full object-cover',
				imageClass
			)}
		/>
	</picture>
	<!-- overlay color -->
	<div
		style:background-color={image?.style?.color ?? ''}
		style:opacity={image?.style?.opacity ?? ''}
		class="z-10 col-start-1 row-start-1 h-full mix-blend-lighten w-full"
	></div>
</div>
