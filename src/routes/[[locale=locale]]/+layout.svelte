<script lang="ts">
	import { getContext, onDestroy, onMount, setContext, untrack, type Snippet } from 'svelte';
	import RenderBlocks from '@/components/blocks/render-blocks.svelte';
	import type { LayoutData, LayoutProps } from './$types';
	import { type INavigation, type Page, type Tenant } from '@payload-types';
	import { page } from '$app/state';
	import { site } from '@/config';
	import { getPayloadState } from '@/state/payload.svelte';

	import {
		subscribe as payloadSubscribe,
		unsubscribe as payloadUnsubscribe,
		ready
	} from '@payloadcms/live-preview';
	import { mergeUpdateData } from '@/utils/payload-utils';
	import { PUBLIC_ENV } from '$env/static/public';

	const { children }: { children: Snippet } = $props();
	let data = $derived(page.data); // need it to be written to for live preview
	const nav = $derived(page.data.nav);

	const isLivePreview = page.url.searchParams.get('livePreview') === 'true';
	const handleLivePreviewUpdate = (doc: Tenant) => {
		data = mergeUpdateData({ oldData: data, newData: doc });
	};

	onMount(() => {
		let payloadLivePreview: undefined | any;
		if (isLivePreview) {
			const serverURL =
				PUBLIC_ENV == 'PROD' ? `https://admin.${site.domainName}` : `http://localhost:3000`;
			ready({ serverURL });
			payloadLivePreview = payloadSubscribe({
				callback: (doc) => handleLivePreviewUpdate(doc),
				depth: 10,
				initialData: data,
				serverURL
			});
		}
		() => payloadLivePreview && payloadUnsubscribe(payloadLivePreview);
	});

	setContext('payload-live-preview', () => data);
</script>

<div class="text-base">
	<header class="text-foreground bg-background">
		<RenderBlocks hasLocaleSwitch={true} blockData={payload.get('header')} />
	</header>
	<div class="text-foreground bg-background h-full w-full">
		{@render children()}
	</div>
	<footer class="text-foreground bg-background">
		<RenderBlocks blockData={payload.get('footer')} />
	</footer>
</div>
