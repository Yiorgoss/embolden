<script lang="ts">
	import { getContext, onMount, setContext, type Snippet } from 'svelte';
	import RenderBlocks from '@/components/blocks/render-blocks.svelte';
	import type { LayoutData } from './$types';
	import { type INavigation, type Page, type Tenant } from '@payload-types';
	import { page } from '$app/state';
	import { site } from '@/config';

	import {
		subscribe as payloadSubscribe,
		unsubscribe as payloadUnsubscribe,
		ready
	} from '@payloadcms/live-preview';
	import { mergeUpdateData } from '@/utils/payload-utils';
	import { PUBLIC_ENV } from '$env/static/public';

	const { data: propData, children }: { data: LayoutData; children: Snippet } = $props();
	let data = $state(propData); // need it to be written to for live preview
	const { nav }: { nav?: INavigation } = $derived(data);

	const isLivePreview = page.url.searchParams.get('livePreview') === 'true';
	const handleLivePreviewUpdate = (doc: Tenant) => {
		data = mergeUpdateData({ oldData: data, newData: doc });
		//  data = doc;
	};

	onMount(() => {
		let payloadLivePreview: undefined | any;
		if (isLivePreview) {
			const serverURL =
				PUBLIC_ENV == 'PROD' ? `https://${site.domainName}` : `http://localhost:3000`;
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

{#key [data, page.params.locale]}
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
