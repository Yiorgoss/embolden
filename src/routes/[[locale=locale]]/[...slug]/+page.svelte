<script lang="ts">
	import { page } from '$app/state';
	import RenderBlocks from '@/components/blocks/render-blocks.svelte';
	import Meta from '@/components/blocks/seo/meta.svelte';
	import type { Page, Tenant } from '@payload-types';
	import { getPayloadState } from '@/state/payload.svelte';
	import { goto } from '$app/navigation';
	import type { PageProps } from './$types';

	const { data }: PageProps = $props();

	// let currentPage = $derived(payload.get(page.params.slug));
	let heroLoaded = $state(false);
</script>

{#if page}
	<Meta meta={data.meta} />
	<div class="min-h-lvh">
		{#if data.hero.length > 0}
			<section id="hero-container" class="">
				<RenderBlocks cb={() => (heroLoaded = true)} blockData={data.hero[0]} />
			</section>
		{/if}
		{#if heroLoaded}
			<div
				id="render-block-container"
				class={` relative ${data.hero?.[0] ? '' : 'pt-(--header-height)'}`}
			>
				{#each data.layout as block}
					<RenderBlocks blockData={block} />
				{/each}
			</div>
		{/if}
	</div>
{/if}
