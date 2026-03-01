<script lang="ts">
	import { page } from '$app/state';
	import RenderBlocks from '@/components/blocks/render-blocks.svelte';
	import Meta from '@/components/blocks/seo/meta.svelte';
	import type { Page, Tenant } from '@payload-types';
	import { goto } from '$app/navigation';
	import type { PageProps } from './$types';
	import { site } from '@/config';
	import { onMount } from 'svelte';

	import {
		subscribe as payloadSubscribe,
		unsubscribe as payloadUnsubscribe,
		ready
	} from '@payloadcms/live-preview';

	const { data }: PageProps = $props();

	onMount(() => {
		if (
			page.url.searchParams.get('livePreview') !== 'true' &&
			page.url.searchParams.get('collection') !== 'pages' // will happen when tenants is being changed
		) {
			return;
		}
		ready({ serverURL: site.CMS });

		const payloadLivePreview = payloadSubscribe({
			callback: (doc) => {
				currentPage = doc;
			},
			depth: 0,
			initialData: page.data,
			serverURL: site.CMS
		});
	});

	let currentPage = $derived(
		page?.data?.pages?.find((pg: Page) => {
			return pg && pg.slug == page.params.slug;
		})
	);
</script>

{#if currentPage}
	<Meta meta={currentPage.meta} />
	<div class="min-h-lvh">
		{#if currentPage.hero.length > 0}
			<section id="hero-container" class="">
				<RenderBlocks blockData={currentPage.hero[0]} />
			</section>
		{/if}
		<div
			id="render-block-container"
			class={` relative ${currentPage.hero?.[0] ? '' : 'pt-(--header-height)'}`}
		>
			{#each currentPage.layout as block}
				<RenderBlocks blockData={block} />
			{/each}
		</div>
	</div>
{/if}
