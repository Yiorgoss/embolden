<script lang="ts">
	import { type Asset, type IImage, type IImageField } from '@payload-types';
	import { cn, resolveID } from '@/utils';
	import Icon from '@/components/common/icon.svelte';
	import { PicturePrimitive } from '@/components/common/primitives';

	const {
		image,
		pictureClass,
		class: imageClass,
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

	//  FIX needs rewrite
</script>

{#if image && image.url}
	<PicturePrimitive
		{loading}
		{cb}
		{image}
		class={imageClass}
		sizes={imageSizes}
		{pictureClass}
		asset={image?.url}
	/>
{/if}
