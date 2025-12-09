<script lang="ts">
	import DefaultRichText from '@/components/blocks/rich-text/default.svelte';
	import { cn, fetchFromCMS, getRestPopulateFn } from '@/utils';
	import { htmlConverters } from './converters';
	//  import { convertLexicalToHTMLAsync } from '@payloadcms/richtext-lexical';
	import { convertLexicalToHTMLAsync } from '@payloadcms/richtext-lexical/html-async';

	import Icon from '@/components/common/icon.svelte';
	import { onMount, untrack } from 'svelte';

	// there exists both richText overrides and component specific overrides
	const { richText, overrides, cb }: { richText: any; overrides?: string; cb?: () => void } =
		$props();
	let html = $state<string | undefined>();

	let loading = $state(false);
	$effect(() => {
		untrack(() => (loading = true));
		if (richText && richText.text) {
			convertLexicalToHTMLAsync({ data: richText.text, converters: htmlConverters })
				.then((data) => (html = data))
				.then((page) => (loading = false))
				.catch((err) => console.log('error loading'));
		}
	});

	const defaults = 'container my-auto wrap-break-word px-2 md:px-0 w-full max-w-full ';
</script>

{#if richText}
	<!--  when switching languages richText becomes undefined  -->
	<div
		style:padding={richText.style?.padding}
		style:--list-marker-color={richText.style?.marker}
		class=""
	>
		{#if richText.shouldAnimate}
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
