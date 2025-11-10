<script lang="ts">
	import { page } from '$app/state';
	import RenderBlocks from '@/components/blocks/render-blocks.svelte';
	import Meta from '@/components/blocks/seo/meta.svelte';
	import type { Page, Tenant } from '@payload-types';
	import { getPayloadState } from '@/state/payload.svelte';
	import { goto } from '$app/navigation';

	let payload = getPayloadState();

	const isLivePreview = page.url.searchParams.get('livePreview') === 'true';
	let livePreviewData = getContext('payload-live-preview') as () => Tenant;

	let getPages = $state(isLivePreview ? livePreviewData : () => page.data);
	const { slug: currentSlug, locale } = $derived(page.params);

	let wasHome = $derived(currentSlug == '' || currentSlug == '/');

	const currentPage = $derived(
		getPages().pages.docs.find(({ slug }: { slug: string }) => {
			locale;
			if (slug == '' || slug == '/') {
				// both should want the same page
				return slug == currentSlug || slug.slice(1) == currentSlug;
			}
			return slug == currentSlug;
		})
	);
</script>

{#key page.params.slug}
	{#if currentPage}
		<Meta meta={currentPage.meta} />
		{#if currentPage?.hero?.length > 0}
			<section id="hero-container" class="">
				<RenderBlocks cb={() => (heroLoaded = true)} blockData={currentPage.hero[0]} />
			</section>
		{/if}
		{#if currentPage.hero.length == 0 || heroLoaded}
			<div
				id="render-block-container"
				class={` relative ${currentPage.hero?.[0] ? '' : 'pt-(--header-height)'}`}
			>
				{#each currentPage.layout as block}
					<RenderBlocks blockData={block} />
				{/each}
			</div>
		{/if}
	{/if}
{/key}
