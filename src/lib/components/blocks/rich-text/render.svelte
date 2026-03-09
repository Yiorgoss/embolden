<script lang="ts">
	import DefaultRichText from '@/components/blocks/rich-text/default.svelte';
	import { cn, fetchFromCMS, getRestPopulateFn } from '@/utils';
	import { htmlConverters } from './converters';
	import { convertLexicalToHTMLAsync } from '@payloadcms/richtext-lexical/html-async';
	import { site } from '@/config';
	import { page } from '$app/state';

	import Icon from '@/components/common/icon.svelte';
	import { onMount, untrack } from 'svelte';

	// there exists both richText overrides and component specific overrides
	const { richText, overrides, cb }: { richText: any; overrides?: string; cb?: () => void } =
		$props();
	// let html = $state<string | undefined>();

	const html = $derived(
		await convertLexicalToHTMLAsync({
			data: richText.text,
			converters: htmlConverters,
			//@ts-ignore
			populate: getRestPopulateFn({
				apiURL: `${site.CMS}/api`,
				locale: page.params.locale ?? 'en'
			})
		})
	);
	const defaults = 'container my-auto wrap-break-word w-full max-w-full ';
</script>

{#if richText}
	<!--  when switching languages richText becomes undefined  -->
	<div
		style:padding={richText.style?.padding}
		style:--list-marker-color={richText.style?.marker}
		class=""
	>
		{#if false && richText.animation.type}
			<!--  {#await import('./animated.svelte') then B: any}
				{@const Block = B.default}
				<Block
					overrides={cn(defaults, overrides)}
					style={richText.style}
					animation={richText.animation}
					html={html ?? ''}
				/>
			{/await}  -->
		{:else}
			<DefaultRichText
				overrides={cn(defaults, overrides)}
				style={richText.style}
				html={html ?? ''}
			/>
		{/if}
	</div>
{/if}
<!--  {/key}  -->
