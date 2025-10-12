<script lang="ts">
	import { cn } from '@/utils';
	import { getContext, hasContext, onMount } from 'svelte';

	const { html, overrides, cb }: { html: string; overrides?: string; cb?: () => void } = $props();

	let element: HTMLDivElement;

	onMount(() => {
		cb && cb();
		//  old way of adding overrides, kept because we might switch back someday
		//  if (style) {
		//  	var sheet = window.document.styleSheets[0];

		//  	const randomClassName = 'random-class-' + Math.random().toString().slice(2);

		//  	sheet.insertRule(
		//  		`.${randomClassName} > .payload-rich-text { ${style ? style : ''} }`,
		//  		sheet.cssRules.length
		//  	);
		//  	element.classList.add(randomClassName);
		//  }
	});
</script>

<div id="default-rich-text" bind:this={element} class="not-italic">
	{@html html}
</div>
