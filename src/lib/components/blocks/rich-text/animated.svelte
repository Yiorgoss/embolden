<script lang="ts">
	import { cn, splitRichTextIntoWords } from '@/utils';
	import { scrollRichText } from '@/attachments/animations/scroll-richtext';
	import { scroll, animate, stagger, transform, motionValue } from 'motion';
	import { onMount } from 'svelte';
	import type { Attachment } from 'svelte/attachments';
	import type { IRichTextField } from '@payload-types';

	const {
		html: htmlCMS,
		overrides,
		style,
		animation,
		cb
	}: {
		html: string;
		overrides?: string;
		style: IRichTextField['style'];
		animation: IRichTextField['animation'];
		cb?: () => void;
	} = $props();

	onMount(() => {
		cb && cb();
	});

	const { height, background, minHeight } = style || {};
	const { rtScrollPresets: preset, traceText } = animation || {};
	let element = $state() as HTMLElement;

	const html = splitRichTextIntoWords(htmlCMS);
	console.log({ htmlCMS, html });
</script>

<div id="animated-rich-text" class={cn('relative overflow-hidden', overrides)}>
	<div
		style:height
		style:background
		style:min-height={minHeight}
		class="grid grid-cols-1 grid-rows-1 justify-center items-center"
	>
		<div class:hidden={!traceText} class=" col-start-1 row-start-1 opacity-20">
			{@html html}
		</div>
		<div {@attach scrollRichText({ preset })} class="col-start-1 row-start-1">
			{@html html}
		</div>
	</div>
</div>
