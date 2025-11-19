<script lang="ts">
	import { cn, splitRichTextIntoWords } from '@/utils';
	import { scrollRichText } from '@/attachments/animations/scroll-richtext';
	import { scroll, animate, stagger, transform, motionValue, inView } from 'motion';
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

	const { height, background, minHeight } = style || {};
	const { rtScrollPresets: preset, traceText } = animation || {};
	//  let element = $state() as HTMLElement;

	const html = splitRichTextIntoWords(htmlCMS);

	let elem = $state() as Element;
	$effect(() => {
		const path = elem.querySelectorAll('#animate-svg > path');
		let cleanup: () => void;
		untrack(() => {
			cleanup = inView(path, (element) => {
				const animation = animate(element, { pathLength: [0, 1] }, { duration: 2, delay: 0.5 });
				return () => animation.stop();
			});
		});
		return () => cleanup();
	});
</script>

<div id="animated-rich-text" class={cn('relative overflow-clip', overrides)}>
	<div
		style:height
		style:min-height={minHeight}
		style:text-wrap={textWrap}
		style:background
		class="grid grid-cols-1 grid-rows-1 justify-center items-center"
	>
		<!--  <div class:hidden={!traceText} class=" col-start-1 row-start-1 opacity-20">
			{@html html}
		</div>  -->
		<div {@attach scrollRichText({ preset })} class="col-start-1 row-start-1">
			{@html html}
		</div>
	</div>
</div>
