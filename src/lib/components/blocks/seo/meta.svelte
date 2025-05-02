<script lang="ts">
	import type { ISEOInterface } from '@payload-types';

	const { meta }: { meta: ISEOInterface } = $props();

	const image =
		typeof meta.image == 'number'
			? { sizes: { sm: { url: 'this should never happen' } } }
			: meta.image;
</script>

<svelte:head>
	{#if meta.title}
		<title>{meta.title}</title>
	{/if}
	{#if meta.description}
		<meta name="description" content={meta.description} />
	{/if}
	{#if meta.image}
		<meta property="og:image" content={image?.sizes?.sm?.url} />
	{/if}
</svelte:head>

