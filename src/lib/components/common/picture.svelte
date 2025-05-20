<script lang="ts">
	import { type Asset, type IImage, type IImageField } from '@payload-types';
	import { cn, fetchFromCMS, resolveID } from '@/utils';
	import { site } from '@/config';
	import { onMount } from 'svelte';
	import Icon from './icon.svelte';

	const {
		image,
		pictureClass,
		class: imageClass = 'object-cover',
		sizes: imageSizes = '100vw'
	}: {
		image?: IImageField;
		pictureClass?: string;
		class?: string;
		sizes?: string;
	} = $props();

	// onMount(() => {
	//
	// })

	// let assetPromise = $state(resolveID({ collection: 'assets', data: data.url }))
	let loading: 'lazy' | 'eager' | null | undefined = 'lazy';
</script>

{#if image && image.url}
	{#await resolveID({ collection: 'assets', data: image.url })}
		<div class="flex h-full w-full items-center justify-center">
			<Icon name="loader-circle" class="animate-[spin_2s_linear_infinite] " />
		</div>
	{:then asset: Asset}
		<div class="grid h-full w-full grid-cols-1 grid-rows-1">
			<picture class={cn('z-0 h-full w-full col-start-1 row-start-1 min-h-full min-w-full', pictureClass)}>
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
					alt={image.alt}
					{loading}
					class={cn('h-full w-full row-start-1 col-start-1 object-cover', imageClass)}
				/>
			</picture>
			<!-- overlay color -->
			<div
				style:background-color={image.style?.color}
				style:opacity={image.style?.opacity}
				class="z-10 col-start-1 row-start-1 h-full w-full"
			></div>
		</div>
	{:catch error}
		<p>ERROR: {error}</p>
	{/await}
{/if}
