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
</script>

{#await _html}
	<div class="flex h-full w-full items-center justify-center">
		<Icon name="loader-circle" class="animate-[spin_2s_linear_infinite] " />
	</div>
{:then html}
	<DefaultRichText overrides={cn(overrides, richText.overrides)} html={html ?? ''} />
{/await}
