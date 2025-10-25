<script lang="ts">
	import { cn, splitRichTextIntoWords } from '@/utils';
	import { scrollRichText } from '@/attachments/animations/scroll-richtext';
	import { scroll, animate, stagger, transform, motionValue } from 'motion';
	import { onMount } from 'svelte';
	import type { Attachment } from 'svelte/attachments';
	import type { IRichTextField } from '@payload-types';

	const {
		html,
		overrides,
		style,
		cb
	}: { html: string; overrides?: string; style: IRichTextField['style']; cb?: () => void } =
		$props();

	const { height, background, minHeight } = style || {};

	onMount(() => {
		cb && cb();
	});
</script>

<div
	id="default-rich-text"
	style:height
	style:background
	style:min-height={minHeight}
	class={cn('relative overflow-hidden', overrides)}
>
	{@html html}
</div>
