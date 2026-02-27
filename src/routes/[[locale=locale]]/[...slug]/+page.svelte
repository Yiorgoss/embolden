<script lang="ts">
	import { page } from '$app/state';
	import RenderBlocks from '@/components/blocks/render-blocks.svelte';
	import Meta from '@/components/blocks/seo/meta.svelte';
	import type { Page, Tenant } from '@payload-types';
	import { goto } from '$app/navigation';
	import type { PageProps } from './$types';

	const { data }: PageProps = $props();

	let currentPage = $derived(data.pages.data);
	let heroLoaded = $state(false);
</script>

{#if currentPage}
	<Meta meta={currentPage.meta} />
	<div class="min-h-lvh">
		{#if currentPage.hero.length > 0}
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
	</div>
{/if}
