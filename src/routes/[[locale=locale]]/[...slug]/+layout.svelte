<script lang="ts">
	import { type Snippet } from 'svelte';
	import RenderBlocks from '@/components/blocks/render-blocks.svelte';
	import type { LayoutData } from './$types';
	import { type INavigation, type Page } from '@payload-types';

	const { data, children }: { data: LayoutData; children: Snippet } = $props();
	const { nav }: { nav: INavigation } = data.layoutData;
</script>

{#key data}
	<div class="min-h-[svh]">
		<header class="text-foreground bg-background">
			{#if nav && nav.header && nav.header.length > 0}
				<RenderBlocks hasLocaleSwitch={true} blockData={nav.header[0]} />
			{/if}
		</header>
		<div class="text-foreground bg-background h-full w-full">
			{@render children()}
		</div>
		<footer class="text-foreground bg-background">
			{#if nav && nav.footer && nav.footer.length > 0}
				<RenderBlocks blockData={nav.footer[0]} />
			{/if}
		</footer>
	</div>
{/key}
