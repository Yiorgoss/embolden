<script lang="ts">
	import { getContext, onDestroy, onMount, setContext, untrack, type Snippet } from 'svelte';
	import RenderBlocks from '@/components/blocks/render-blocks.svelte';
	import type { LayoutData, LayoutProps } from './$types';
	import { type INavigation, type Page, type Tenant } from '@payload-types';
	import { page } from '$app/state';
	import { site } from '@/config';
	import { getPayloadState } from '@/state/payload.svelte';

	const { children, data: nav }: LayoutProps = $props();
</script>

<div class="text-base">
	<header class="text-foreground bgg-background">
		<RenderBlocks blockData={nav.header?.[0]} />
	</header>
	<main class="text-foreground bg-background h-full w-full">
		{@render children()}
	</main>
	<footer class="text-foreground bg-background">
		<RenderBlocks blockData={nav.footer?.[0]} />
	</footer>
</div>
