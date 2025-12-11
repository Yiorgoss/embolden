<script lang="ts">
	import { getContext, onDestroy, onMount, setContext, untrack, type Snippet } from 'svelte';
	import RenderBlocks from '@/components/blocks/render-blocks.svelte';
	import type { LayoutData, LayoutProps } from './$types';
	import { type INavigation, type Page, type Tenant } from '@payload-types';
	import { page } from '$app/state';
	import { site } from '@/config';
	import { getPayloadState } from '@/state/payload.svelte';

	const { children, data: tenant }: LayoutProps = $props();
	const payload = getPayloadState();

	//  onMount(() => payload.setupListener());
</script>

<div class="min-h-[svh]">
	<header class="text-foreground bg-background">
		<RenderBlocks hasLocaleSwitch={true} blockData={payload._state.get('header')} />
	</header>
	<div class="text-foreground bg-background h-full w-full">
		{@render children()}
	</div>
	<footer class="text-foreground bg-background">
		<RenderBlocks blockData={payload.get('footer')} />
	</footer>
</div>
