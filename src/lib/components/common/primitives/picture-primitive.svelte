<script lang="ts">
	import { type Asset, type IImageField } from '@payload-types';
	import { cn } from '@/utils';
	import { getContext, hasContext, onMount } from 'svelte';
	import { MediaQuery } from 'svelte/reactivity';
	import { fade, fly } from 'svelte/transition';
	import { animateScroll } from '@/attachments/animations/scroll';

	const {
		asset,
		image,
		pictureClass,
		loading,
		class: imageClass = '',
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

	const { animation, style: { background, padding, borderRadius, opacity, height, sizes } = {} } =
		$derived(image || {});
	//  const { background, padding, borderRadius, opacity, minHeight, height, sizes } = style || {};

	let imageLoaded = $state(false);
	let placeholder = $derived(asset?.sizes?.['placeholder']);
	let mobile = $derived(asset?.sizes?.['sm']);
</script>

<!-- -->
<svelte:head>
	{#if loading == 'eager'}
		{#if placeholder && placeholder.filename}
			<link
				rel="preload"
				as="image"
				fetchpriority="high"
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
<div
	style:padding
	style:height
	class="grid place-items-center h-full w-full relative overflow-hidden grid-cols-1 grid-rows-1"
>
	{#if placeholder && placeholder.filename}
		{#if !imageLoaded}
			<div class="col-start-1 row-start-1">
				<img
					out:fade={{ duration: 300 }}
					src={placeholder.url}
					sizes={sizes ?? imageSizes}
					{loading}
					class={cn('blur-3xl -z-10 h-full w-full', pictureClass, imageClass)}
					alt=""
				/>
			</div>
		{/if}
	{/if}
	<picture
		class={cn('z-10 col-start-1 row-start-1 h-full min-h-full w-full min-w-full', pictureClass)}
		{@attach animateScroll(animation?.scrollPresets)}
	>
		{#if image?.ignoreSizes != true}
			{#each Object.entries(asset.sizes ?? {}) as [_, img]}
				<source
					srcset={encodeURI(img.url ?? '')}
					type={img.mimeType}
					sizes={imageSizes}
					media={`(max-width: ${img.width}px)`}
				/>
			{/each}
		{/if}
		<img
			src={asset?.sizes?.xl?.url ?? ''}
			alt={image?.alt ?? ''}
			onload={() => (imageLoaded = true)}
			{loading}
			fetchpriority={loading == 'eager' ? 'high' : 'low'}
			style:height
			style:border-radius={borderRadius}
			class:opacity-100={imageLoaded}
			class={cn(
				'z-0 transition-all duration-300 opacity-0 col-start-1 row-start-1 h-full w-full object-cover',
				imageClass
			)}
		/>
	</picture>
	<!-- overlay color -->
	<div
		style:opacity
		style:background
		style:border-radius={borderRadius}
		class="z-10 col-start-1 row-start-1 h-full mix-blend-lighten w-full"
	></div>
</div>
