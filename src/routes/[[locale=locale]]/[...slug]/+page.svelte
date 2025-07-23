<script lang="ts">
	import { page } from '$app/state';
	import RenderBlocks from '@/components/blocks/render-blocks.svelte';
	import Meta from '@/components/blocks/seo/meta.svelte';

	let heroLoaded = $state(page.params.slug == '' ? false : true);
	const pages = $state(page.data.pages.docs);
	const { slug: currentSlug, locale } = $derived(page.params);

	const currentPage = $derived(
		pages.find(({ slug }: { slug: string }) => {
			if (slug.charAt(0) == '/') {
				return slug.slice(1) == currentSlug;
			}
			return slug == currentSlug;
		})
	);
</script>

{#key [currentSlug, locale]}
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
