<script lang="ts">
	import DefaultRichText from '@/components/blocks/rich-text/default.svelte';
	import { cn, fetchFromCMS, getRestPopulateFn } from '@/utils';
	import { htmlConverters } from './converters';
	import { convertLexicalToHTMLAsync } from '@payloadcms/richtext-lexical/html-async';
	//  import { convertLexicalToHTMLAsync } from 'payload-richtext-fork/html-async';
	import Icon from '@/components/common/icon.svelte';
	import { onMount, untrack } from 'svelte';
	import { getPayloadState } from '@/state/payload.svelte';

	// there exists both richText overrides and component specific overrides
	const { richText, overrides, cb }: { richText: any; overrides?: string; cb?: () => void } =
		$props();
	const _html = $derived(
		richText && richText.text
			? convertLexicalToHTMLAsync({ data: richText.text, converters: htmlConverters })
			: ''
	);
	let { shouldAnimate, animation, style } = richText || {};
	const { marker } = style || {};
	// will cause issues if marker if not of color foreground, must either be overridden
	//  paylaod textstate gives
	//  <li>
	//    ::marker
	//    <span style+"...">...</span>
	//  </li>
	//  no clue how to style marker based on span style color
	//  ...
	//  ...
	//  think you can set a css variaable and then reference it
	const defaults = 'text-balance container my-auto wrap-break-word px-2 w-full max-w-full ';
</script>

{#await _html}
	<div class="flex h-full w-full items-center justify-center">
		<Icon name="loader-circle" class="text-foreground/20 animate-[spin_2s_linear_infinite] " />
	</div>
{:then html}
	<div style:--list-marker-color={marker} class="">
		{#if shouldAnimate}
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
