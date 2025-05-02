<script lang="ts">
	import { page } from '$app/state';
	import RenderBlocks from '@/components/blocks/render-blocks.svelte';
	import Meta from '@/components/blocks/seo/meta.svelte';

	const pages = $state(page.data.pages.docs);
	const { slug: currentSlug } = $derived(page.params);

	const currentPage = $derived(
		pages.find(({ slug }: { slug: string }) => {
			if (slug.charAt(0) == '/') {
				return slug.slice(1) == currentSlug;
			}
			return slug == currentSlug;
		})
	);
</script>

{#key currentSlug}
	{#if currentPage}
		<Meta meta={currentPage.meta} />
		{#if currentPage && currentPage.hero.length > 0}
			<section class="">
				<RenderBlocks blockData={currentPage.hero[0]} />
			</section>
		{/if}
		<div
			id="render-block-container"
			class={`relative bg-background ${currentPage.hero?.[0] ? '' : 'pt-(--header-height)'}`}
		>
			{#each currentPage.layout as block}
				<RenderBlocks blockData={block} />
			{/each}
		</div>
	{/if}
{/key}
