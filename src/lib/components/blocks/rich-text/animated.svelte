<script lang="ts">
	import { cn } from '@/utils';
	import { animate } from '@/attachments/animations/animate.svelte';
	import { onMount, untrack } from 'svelte';
	import type { Attachment } from 'svelte/attachments';
	import type { IRichTextField } from '@payload-types';
	import Spinner from '@/components/common/spinner.svelte';

	const {
		html,
		loading = false,
		overrides,
		style,
		animation,
		cb
	}: {
		html: string;
		loading?: boolean;
		overrides?: string;
		style: IRichTextField['style'];
		animation: IRichTextField['animation'];
		cb?: () => void;
	} = $props();

	onMount(() => {
		cb && cb();
	});

	const { height, background, minHeight, textWrap } = $derived(style || {});
</script>

<div id="animated-rich-text" class={cn('relative overflow-clip', overrides)}>
	<div
		style:height
		style:min-height={minHeight}
		style:text-wrap={textWrap}
		style:background
		class="grid grid-cols-1 grid-rows-1 justify-center items-center"
	>
		{#if loading}
			<Spinner class="size-12 col-start-1 row-start-1" />
		{:else}
			<div {@attach animate({ animation })} class=" col-start-1 row-start-1">
				{@html html}
			</div>
		{/if}
	</div>
</div>
