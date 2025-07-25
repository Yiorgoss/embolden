<script lang="ts">
	import { type Asset, type IImage, type IImageField } from '@payload-types';
	import { cn, resolveID } from '@/utils';
	import Icon from '@/components/common/icon.svelte';
	import PicturePrimitive from './primitives/picture-primitive.svelte';

	const {
		image,
		pictureClass,
		class: imageClass = 'object-cover',
		sizes: imageSizes = '100vw',
		loading = 'lazy',
		cb
	}: {
		image?: IImageField;
		pictureClass?: string;
		loading?: 'eager' | 'lazy';
		class?: string;
		sizes?: string;
		cb?: () => void;
	} = $props();

	// let assetPromise = $state(resolveID({ collection: 'assets', data: data.url }))
	//  console.log({ image });
</script>

{#if image && image.url}
	{#await resolveID({ collection: 'assets', data: image.url })}
		<!--  <div class="flex h-full w-full items-center justify-center">
			<Icon name="loader-circle" class="animate-[spin_2s_linear_infinite] " />
		</div>  -->
	{:then asset: Asset}
		<PicturePrimitive
			{loading}
			{cb}
			{image}
			class={imageClass}
			sizes={imageSizes}
			{pictureClass}
			{asset}
		/>
	{:catch error}
		<p>ERROR: {error}</p>
	{/await}
{/if}
