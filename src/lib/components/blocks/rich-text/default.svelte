<script lang="ts">
	import { cn } from '@/utils';
	import { scroll, animate, stagger, transform, motionValue } from 'motion';
	import { onMount } from 'svelte';
	import type { Attachment } from 'svelte/attachments';
	import type { IRichTextField } from '@payload-types';
	import Spinner from '@/components/common/spinner.svelte';
	import { animateScroll } from '@/attachments/animations/scroll';

	const {
		html,
		loading = false,
		overrides,
		style,
		cb
	}: {
		html: string;
		loading?: boolean;
		overrides?: string;
		style?: IRichTextField['style'];
		cb?: () => void;
	} = $props();

	const { height, background, minHeight, textWrap } = $derived(style || {});

	onMount(() => {
		cb && cb();
	});
</script>

<div
	id="default-rich-text"
	style:height
	style:background
	style:text-wrap={textWrap}
	style:min-height={minHeight}
	class={cn('relative overflow-hidden', overrides)}
>
	{#if loading}
		<div class="h-20 w-full loader"></div>
	{:else}
		{@html html}
	{/if}
</div>
