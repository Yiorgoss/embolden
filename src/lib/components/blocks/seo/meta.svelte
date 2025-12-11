<script lang="ts">
	import type { Asset, ISEO } from '@payload-types';
	import { site } from '@/config';
	import { page } from '$app/state';
	import { resolveID } from '@/utils';
	import { getPayloadState } from '@/state/payload.svelte';

	const { meta }: { meta: ISEO } = $props();

	let payload = getPayloadState();

	let image = $state<Asset | undefined>();
	$effect(() => {
		payload
			.resolveID({ collection: 'assets', data: meta, lang: page.params.locale })
			.then((img) => (image = img));
	});
</script>

<svelte:head>
	<title>{meta.title ?? site.domainName ?? ''}</title>
	{#if meta.description}
		<meta name="description" content={meta.description} />
	{/if}
	{#if meta.image}
		<meta property="og:image" content={image?.url} />
	{/if}
</svelte:head>
