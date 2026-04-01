<script lang="ts">
	import { type Asset, type IImage } from '@payload-types';
	import { site } from '@/config';
	import { onMount } from 'svelte';
	import Sticker from './sticker.svelte';

	let {
		image,
		cb,
		loading = 'lazy'
	}: { image: IImage['image']; cb?: () => void; loading?: string } = $props();

	let { url: asset, style, alt, ignoreSizes, animation, sticker } = $derived(image || {});

	onMount(() => cb && cb());

	let complete = $state(false);
	let { srcset, sizes } = $derived(
		Object.values(asset?.sizes).reduce(
			(acc: any, cur: any) => ({
				srcset: `${site.storage}/${cur.filename} ${cur.width}w, ${acc.srcset}`,
				sizes: `(width <= ${cur.width}px) ${cur.width}px, ${acc.sizes} `
			}),
			{ srcset: '', sizes: '' }
		)
	);
</script>

<svelte:head>
	{#if asset?.sizes?.placeholder?.filename}
		<link
			rel="preload"
			as="image"
			fetchpriority="high"
			href={`${site.storage}/${asset?.sizes?.placeholder.filename}`}
			media={`(max-width: ${asset?.sizes?.placeholder.width}px)`}
		/>
	{/if}
	{#if asset?.sizes?.mobile?.filename}
		<!--  always preload mobile image  -->
		<link
			rel="preload"
			fetchpriority="high"
			as="image"
			href={`${site.storage}/${asset?.sizes?.mobile.filename}`}
			media={`(max-width: ${asset?.sizes?.mobile.width}px)`}
		/>
	{/if}
</svelte:head>

<div
	class="relative grid grid-cols-1 grid-rows-1 place-items-center h-full w-full overflow-hidden bg-(image:--placeholder) bg-cover bg-no-repeat backdrop-blur-3xl"
	style:--placeholder={`url(${site.storage}/${asset?.sizes?.placeholder?.filename})`}
>
	<img
		onload={() => (complete = true)}
		class:hidden={!complete}
		class="col-start-1 row-start-1"
		alt={alt ?? ''}
		{sizes}
		{srcset}
	/>
	<div
		style:opacity={style?.opacity}
		style:background={style?.background}
		style:border-radius={style?.borderRadius}
		style:mix-blend-mode={style?.mixBlendMode}
		class="col-start-1 row-start-1 h-full w-full"
	></div>
	<div class="col-start-1 relative row-start-1 h-full w-full">
		<Sticker data={image?.sticker} />
	</div>
</div>
