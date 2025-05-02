<script lang="ts">
	import { type Asset, type IImageField } from '@payload-types';
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

	// let assetPromise = $state(resolveID({ collection: 'assets', data: data.url }))
	let loading: 'lazy' | 'eager' | null | undefined = 'lazy';
</script>

<!-- {#if data.url} -->
{#await resolveID({ collection: 'assets', data: data.url })}
	<div class="flex h-full w-full items-center justify-center">
		<Icon name="loader-circle" class="animate-[spin_2s_linear_infinite] " />
	</div>
{:then asset}
	<picture class={cn('', pictureClass)}>
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
			class={cn('h-full w-full object-cover', imageClass)}
		/>
	</picture>
{:catch error}
	<!-- promise was rejected -->
	<p>Something went wrong: {error.message}</p>
{/await}
<!-- {/if} -->
