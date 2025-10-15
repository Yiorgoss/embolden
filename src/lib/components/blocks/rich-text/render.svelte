<script lang="ts">
	import DefaultRichText from '@/components/blocks/rich-text/default.svelte';
	import { cn } from '@/utils';
	import { htmlConverters } from './converters';
	//  import { convertLexicalToHTMLAsync } from '@payloadcms/richtext-lexical/html-async';
	import { convertLexicalToHTMLAsync } from 'payload-richtext-fork/html-async';
	import Icon from '@/components/common/icon.svelte';

	// there exists both richText overrides and component specific overrides
	const {
		richText,
		overrides,
		className,
		cb
	}: { className?: null; richText: any; overrides?: string; cb?: () => void } = $props();
	const _html =
		richText && richText.text
			? convertLexicalToHTMLAsync({ data: richText.text, converters: htmlConverters })
			: '';

	// will cause issues if marker if not of color foreground, must either be overridden
	//  paylaod textstate gives
	//  <li>
	//    ::marker
	//    <span style+"...">...</span>
	//  </li>
	//  no clue how to style marker based on span style color
	const defaults =
		' max-w-full prose marker:text-inherit prose-headings:text-foreground prose-ul:text-foreground prose-li:text-foreground prose-ol:text-foreground prose-p:text-foreground ';
</script>

{#await _html}
	<div class="flex h-full w-full items-center justify-center">
		<Icon name="loader-circle" class="animate-[spin_2s_linear_infinite] " />
	</div>
{:then html}
	<DefaultRichText overrides={cn(defaults, overrides)} html={html ?? ''} />
{/await}
