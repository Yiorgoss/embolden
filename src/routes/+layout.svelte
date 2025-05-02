<script lang="ts">
	import '../app.css';
	import { onMount, type Snippet } from 'svelte';
	import RenderBlocks from '@/components/blocks/render-blocks.svelte';
	import type { LayoutData } from './$types';
	import { type INavigation, type Page } from '@payload-types';

	const { data, children }: { data: LayoutData; children: Snippet } = $props();
	const { pages, nav }: { pages: Page[]; nav: INavigation } = data;
</script>


<header class="text-foreground bg-background">
	{#if nav && nav.header && nav.header.length > 0}
		<RenderBlocks blockData={nav.header[0]} />
	{/if}
</header>
<main class="text-foreground bg-background h-full w-full">
	{@render children()}
</main>
<footer class="text-foreground bg-background">
	{#if nav && nav.footer && nav.footer.length > 0}
		<RenderBlocks blockData={nav.footer[0]} />
	{/if}
</footer>
