<script lang="ts">
	import { cn } from '@/utils';
	import { getContext, hasContext, onMount } from 'svelte';

	const {
		html,
		defaultCSS,
		overrides,
		style,
		cb
	}: { html: string; defaultCSS: string; overrides?: string; style: string; cb?: () => void } =
		$props();

	let element: HTMLDivElement;

	onMount(() => {
		cb && cb();
		if (style) {
			var sheet = window.document.styleSheets[0];

			const randomClassName = 'random-class-' + Math.random().toString().slice(2);

			console.log(randomClassName);
			sheet.insertRule(
				`.${randomClassName} > .payload-rich-text { ${style ? style : ''} }`,
				sheet.cssRules.length
			);

			element.classList.add(randomClassName);
		}
	});
</script>

<div
	id="default-rich-text"
	bind:this={element}
	class={cn(
		defaultCSS,
		'prose-h1:text-xl prose-headings:font-semibold prose-p:font-normal',
		overrides
	)}
>
	{@html html}
</div>
