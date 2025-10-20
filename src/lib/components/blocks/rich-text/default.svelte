<script lang="ts">
	import { cn } from '@/utils';
	import { getContext, hasContext, onMount } from 'svelte';

	const { html, overrides, cb }: { html: string; overrides?: string; cb?: () => void } = $props();

	let element: HTMLDivElement;

	onMount(() => {
		cb && cb();
	});
</script>

<div id="default-rich-text" bind:this={element} class={overrides}>
	{@html html}
</div>
