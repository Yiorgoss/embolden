<script lang="ts">
	import DefaultRichText from '@/components/blocks/rich-text/default.svelte';
	import { cn, fetchFromCMS, getRestPopulateFn } from '@/utils';
	import { htmlConverters } from './converters';
	import { convertLexicalToHTMLAsync } from '@payloadcms/richtext-lexical/html-async';
	import { site } from '@/config';
	import { page } from '$app/state';

	import Icon from '@/components/common/icon.svelte';
	import { onMount, untrack } from 'svelte';
	import { getPayloadState } from '@/state/payload.svelte';

	// there exists both richText overrides and component specific overrides
	const { richText, overrides, cb }: { richText: any; overrides?: string; cb?: () => void } =
		$props();
	let html = $state<string | undefined>();

	//  let payload = getPayloadState()
	//  let livePreviewDynamicAnimations = $derived(payload.isLivePreview && richText.animation.type)

	let loading = $state(false);
	$effect(() => {
		untrack(() => (loading = true));
		if (richText && richText.text) {
			const data = $state.snapshot(richText.text);
			html = data;
			convertLexicalToHTMLAsync({
				data,
				converters: htmlConverters,
				populate: getRestPopulateFn({
					apiURL: `${site.CMS}/api`,
					locale: page.params.locale ?? 'en'
				})
			})
				.then((res) => {
					html = res;
					loading = false;
				})
				.catch((err) => console.log(`error loading ${err}`));
		}
	});
	const defaults = 'container my-auto wrap-break-word w-full max-w-full ';
</script>

{#if richText}
	<!--  when switching languages richText becomes undefined  -->
	<div
		style:padding={richText.style?.padding}
		style:--list-marker-color={richText.style?.marker}
		class=""
	>
		{#if richText.animation.type}
			{#await import('./animated.svelte') then B: any}
				{@const Block = B.default}
				<Block
					{loading}
					overrides={cn(defaults, overrides)}
					style={richText.style}
					animation={richText.animation}
					html={html ?? ''}
				/>
			{/await}
		{:else}
			<DefaultRichText
				{loading}
				overrides={cn(defaults, overrides)}
				style={richText.style}
				html={html ?? ''}
			/>
		{/if}
	</div>
{/if}
<!--  {/key}  -->
