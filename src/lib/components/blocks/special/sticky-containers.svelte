<script lang="ts">
	import type { IStickyContainers } from '@payload-types';
	import RichTextRender from '@/components/blocks/rich-text/render.svelte';
	import Picture from '@/components/common/picture.svelte';
	import { cn } from '@/utils';
	import { MediaQuery } from 'svelte/reactivity';

	const mobile = new MediaQuery('max-width: 480px');

	const { blockData }: { blockData: IStickyContainers; index?: number } = $props();
	const { list, title, style } = $derived(blockData);

	//  const height = mobile.current ? mobileStyle?.height : style?.height;
</script>

<section id="sticky-container-root" class="container mx-auto">
	<div class="relative">
		{#each list ?? [] as { richText, image }, i}
			{@const left = i % 2 == 1}

			<div
				style:top={`${50 * i + 5}px`}
				style:background={style?.background}
				class={cn(
					` text-background bg-primary rounded-theme sticky`,
					left && 'bg-secondary border-foreground border '
				)}
			>
				{#if title && i == 0}
					<div class="px-6 font-serif italic break-all w-full p-2 text-xl">
						{title}
					</div>
				{/if}
				<div class="flex flex-col md:flex-row justify-start items-center">
					<div
						class:md:order-last={left}
						class="h-[300px] md:h-auto w-full md:w-1/2 px-4 py-10 md:px-10"
					>
						{#if image}
							<Picture
								{image}
								pictureClass="min-h-0 h-full w-full flex justify-center items-center"
								class=""
							/>
						{/if}
					</div>
					<div class:md:pl-10={left} class="h-full grow-2 shrink-0 flex-2 py-10 px-2">
						<RichTextRender
							overrides={cn(
								'prose-p:text-background prose-headings:text-background',
								left && 'prose-p:text-foreground prose-headings:text-foreground'
							)}
							{richText}
						/>
					</div>
				</div>
			</div>
		{/each}
	</div>
</section>
