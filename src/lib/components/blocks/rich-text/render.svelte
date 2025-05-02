<script lang="ts">
	import CalistoRichText from '@/components/blocks/rich-text/calisto.svelte';
	import DefaultRichText from '@/components/blocks/rich-text/default.svelte';
	import { cn } from '@/utils';
	// import { convertLexicalToHTML } from './converters';
	import { htmlConverters } from './converters';
	import { convertLexicalToHTMLAsync } from '@payloadcms/richtext-lexical/html-async';
	import type { IPill } from '@payload-types';
	import type { DefaultNodeTypes, SerializedBlockNode, SerializedInlineBlockNode } from '@payloadcms/richtext-lexical';
	import Icon from '@/components/common/icon.svelte';

	// there exists both richText overriides and component specific overrides
	const { richText, overrides }: { richText: any; overrides?: string } = $props();
	const _html =
		richText && richText.text
			? convertLexicalToHTMLAsync({ data: richText.text, converters: htmlConverters })
			: '';
	// convertLexicalToHTMLAsync({ data: richText.text })
	const defaultCSS =
		'mx-auto prose-headings:mx-2 prose-headings:md:mx-0 prose-p:mx-2 prose-p:md:mx-2 prose-headings:my-0 prose-headings:py-0 prose-p:my-0 prose-p:first-of-type:pt-10 prose-p:text-foreground prose-headings:text-foreground ';
</script>

{#await _html}
	<div class="flex h-full w-full items-center justify-center">
		<Icon name="loader-circle" class="animate-[spin_2s_linear_infinite] " />
	</div>
{:then html}
	{#if richText && richText.type == 'calisto'}
		<CalistoRichText overrides={cn(defaultCSS, overrides, richText.overrides)} html={html ?? ''} />
	{:else}
		<DefaultRichText overrides={cn(defaultCSS, overrides, richText.overrides)} html={html ?? ''} />
	{/if}
{/await}
