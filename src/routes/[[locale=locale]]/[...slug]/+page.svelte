<script lang="ts">
	import { page } from '$app/state';
	import RenderBlocks from '@/components/blocks/render-blocks.svelte';
	import Meta from '@/components/blocks/seo/meta.svelte';
	import { fetchFromCMS } from '@/utils';
	import { type PageData } from './$types';

	const { data }: { data: PageData } = $props();

	let currentPage = $state(data.pageData.docs[0]);

	let heroLoaded = $state(page.params.slug == '' ? false : true);
	const pages = $state(page.data.layoutData.pages.docs);
	const { locale, slug: currentSlug } = $derived(page.params);

	let unresolvedPage = $derived(
		pages.find(({ slug }: { slug: string }) => {
			locale;
			if (slug == '' || slug == '/') {
				// both should want the same page
				return slug == currentSlug || slug.slice(1) == currentSlug;
			}
			return slug == currentSlug;
		})
	);

	$effect(() => {
		const data = { id: unresolvedPage.id, locale };

		fetchFromCMS({ collection: 'pages', id: data.id, lang: data.locale })
			.then((res) => res.json())
			.then((json: any) => (currentPage = json.docs[0]));
	});
</script>

{#key [locale, currentPage]}
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
