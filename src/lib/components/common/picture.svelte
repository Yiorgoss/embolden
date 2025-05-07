<script lang="ts">
	import { type Asset, type IImage, type IImageField } from '@payload-types';
	import { cn, fetchFromCMS, resolveID } from '@/utils';
	import { site } from '@/config';
	import { onMount } from 'svelte';
	import Icon from './icon.svelte';

	const {
		data,
		pictureClass,
		class: imageClass = 'object-cover',
		sizes: imageSizes = '100vw'
	}: {
		data: IImageField;
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

{#if data && data.url}
	{#await resolveID({ collection: 'assets', data: data.url })}
		<div class="flex h-full w-full items-center justify-center">
			<Icon name="loader-circle" class="animate-[spin_2s_linear_infinite] " />
		</div>
	{:then asset: Asset}
		<div class="grid grid-cols-[1] h-full w-full grid-rows-[1] ">
			<picture class={cn('z-0 min-h-full row-start-1 col-start-1', pictureClass)}>
				{#each Object.entries(asset.sizes ?? {}) as [_, img]}
					<source
						type={img.mimeType}
						sizes={imageSizes}
						media={`(max-width: ${img.width}px)`}
						srcset={`${site.CMS}${img.url}`}
					/>
				{/each}
				<img
					src={`${site.CMS}${asset.url}`}
					alt={data.alt}
					{loading}
					class={cn('object-cover h-full w-full', imageClass)}
				/>
			</picture>
			<!-- overlay color -->
			<div
        style:background-color={data.style?.color}
        style:opacity={data.style?.opacity}
				class="z-10 col-start-1 row-start-1 h-full w-full"
			></div>
		</div>
	{:catch error}
		<p>ERROR: {error}</p>
	{/await}
{/if}
