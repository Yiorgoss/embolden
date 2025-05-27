<script lang="ts">
	import { cn } from '@/utils';
	import { onMount } from 'svelte';

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
			sheet.insertRule(`.${randomClassName} { ${style ? style : ''} }`, sheet.cssRules.length);

			element.classList.add(randomClassName);
		}
	});
</script>

<div
	id="calisto-rich-text"
	bind:this={element}
	class={cn(
		defaultCSS,
		'prose-headings:font-normal prose-p:font-normal prose-h1:font-serif prose-h2:font-cursive prose-h3:font-serif prose-h4:font-cursive max-w-full',
		overrides
	)}
>
	{@html html}
</div>
