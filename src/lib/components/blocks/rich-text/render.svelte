<script lang="ts">
	import CalistoRichText from '@/components/blocks/rich-text/calisto.svelte';
	import DefaultRichText from '@/components/blocks/rich-text/default.svelte';
	import { cn } from '@/utils';
	import { htmlConverters } from './converters';
	//  import { convertLexicalToHTMLAsync } from '@payloadcms/richtext-lexical/html-async';
	import { convertLexicalToHTMLAsync } from 'payload-richtext-fork/html-async';
	import Icon from '@/components/common/icon.svelte';

	// there exists both richText overrides and component specific overrides
	const { richText, overrides, cb }: { richText: any; overrides?: string; cb?: () => void } =
		$props();
	const _html =
		richText && richText.text
			? convertLexicalToHTMLAsync({ data: richText.text, converters: htmlConverters })
			: '';

	// removed prose-p:first-of-type:pt-10

	const defaultCSS =
		'group-[.card-group-selector]:prose-p:text-card-foreground group-[.card-group-selector]:prose-headings:text-card-foreground mx-auto prose prose-headings:mx-2 prose-headings:md:mx-0 prose-p:mx-2 prose-p:md:mx-2 prose-headings:my-0 prose-headings:py-0 prose-p:my-0 prose-p:text-foreground prose-headings:text-foreground prose-h1:md:text-7xl prose-h1:text-5xl prose-h2:md:text-5xl prose-h2:text-3xl prose-h3:md:text-3xl prose-h3:text-2xl prose-h4:md:text-2xl prose-h4:text-xl ';
</script>

{#await _html}
	<div class="flex h-full w-full items-center justify-center">
		<Icon name="loader-circle" class="animate-[spin_2s_linear_infinite] " />
	</div>
{:then html}
	{#if richText && richText.type == 'calisto'}
		<CalistoRichText {defaultCSS} overrides={cn(overrides, richText.overrides)} html={html ?? ''} />
	{:else}
		<DefaultRichText {defaultCSS} overrides={cn(overrides, richText.overrides)} html={html ?? ''} />
	{/if}
{/await}
