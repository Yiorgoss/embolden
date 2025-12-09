<script lang="ts">
	import { page } from '$app/state';
	import RenderBlocks from '@/components/blocks/render-blocks.svelte';
	import Meta from '@/components/blocks/seo/meta.svelte';
	import type { Page, Tenant } from '@payload-types';
	import { getPayloadState } from '@/state/payload.svelte';
	import { goto } from '$app/navigation';

	let payload = getPayloadState();

	let currentPage = $derived(payload.get(page.params.slug));
	let heroLoaded = $state(page.params.slug == '' ? false : true);
</script>

{#key page.params.slug}
	{#if currentPage}
		<Meta meta={currentPage.meta} />
		{#if currentPage && currentPage.hero.length > 0}
			<section id="hero-container" class="">
				<RenderBlocks cb={() => (heroLoaded = true)} blockData={currentPage.hero[0]} />
			</section>
		{/if}
		{#if heroLoaded}
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
