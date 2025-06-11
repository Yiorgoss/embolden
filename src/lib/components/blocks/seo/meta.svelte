<script lang="ts">
	import type { ISEO } from '@payload-types';
	import { site } from '@/config';

	const { meta }: { meta: ISEO } = $props();

	const image =
		typeof meta.image == 'number'
			? { sizes: { sm: { url: 'this should never happen' } } }
			: meta.image;
</script>

<svelte:head>
	<title>{meta.title ?? site.domainName ?? ''}</title>
	{#if meta.description}
		<meta name="description" content={meta.description} />
	{/if}
	{#if meta.image}
		<meta property="og:image" content={image?.sizes?.sm?.url} />
	{/if}
</svelte:head>
