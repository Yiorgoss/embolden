<script lang="ts">
	import type { Asset, ISEO } from '@payload-types';
	import { site } from '@/config';
	import { page } from '$app/state';
	import { resolveID } from '@/utils';

	const { meta }: { meta: ISEO } = $props();

	let image = $state<Asset | undefined>();
</script>

<svelte:head>
	{#if meta}
		<title>{meta.title ?? site.domainName ?? ''}</title>
		<meta name="description" content={meta.description} />
		<meta property="og:image" content={image?.url} />
	{/if}
</svelte:head>
