<script lang="ts">
	import { page } from '$app/state';
	import RenderBlocks from '@/components/blocks/render-blocks.svelte';
	import Meta from '@/components/blocks/seo/meta.svelte';

	let heroLoaded = $state(page.params.slug == '' ? false : true);
	const pages = $state(page.data.pages.docs);
	const { slug: currentSlug, locale } = $derived(page.params);

	let wasHome = $derived(currentSlug == '' || currentSlug == '/');

	const currentPage = $derived(
		pages.find(({ slug }: { slug: string }) => {
			locale;
			if (slug == '' || slug == '/') {
				// both should want the same page
				return slug == currentSlug || slug.slice(1) == currentSlug;
			}
			return slug == currentSlug;
		})
	);
	$inspect([currentPage, locale, currentPage, wasHome]);
</script>

{#key [page.params.slug, locale, currentPage, wasHome]}
	{#if currentPage}
		<Meta meta={currentPage.meta} />
		{#if currentPage && currentPage.hero.length > 0}
			<section id="hero-container" class="[&>#medium-hero]:h-[600px]">
				<RenderBlocks cb={() => (heroLoaded = true)} blockData={currentPage.hero[0]} />
			</section>
		{/if}
		{#if heroLoaded}
			<div
				id="render-block-container"
				class={`bg-background relative ${currentPage.hero?.[0] ? '' : 'pt-(--header-height)'}`}
			>
				{#each currentPage.layout as block}
					<RenderBlocks blockData={block} />
				{/each}
			</div>
		{/if}
	{/if}
{/key}
