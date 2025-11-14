<script lang="ts">
	import type { IStickyContainers } from '@payload-types';
	import RichTextRender from '@/components/blocks/rich-text/render.svelte';
	import Picture from '@/components/common/picture.svelte';
	import { cn } from '@/utils';
	import { MediaQuery } from 'svelte/reactivity';

	const mobile = new MediaQuery('max-width: 480px');

	const { blockData }: { blockData: IStickyContainers; index?: number } = $props();
	const { list, title } = blockData;

	//  const height = mobile.current ? mobileStyle?.height : style?.height;
</script>

<section id="sticky-container-root" class="container mx-auto">
	<div class="">
		{#each list ?? [] as { richText, image, style }, i}
			{@const left = i % 2 == 1}
			<div
				style:top={`${50 * i + 5}px`}
				style:background={style?.background}
				class={cn(
					`text-background bg-primary rounded-theme sticky  `,
					left && 'bg-secondary border-foreground border '
				)}
			>
				{#if title && i == 0}
					<div class="px-6 font-serif italic break-all w-full p-2 text-xl">
						{title}
					</div>
				{/if}

				<div class="flex flex-col h-full justify-center items-center md:flex-row">
					<div
						class:hidden={!(image && image.url)}
						class:md:order-last={left}
						class={cn('w-full max-w-md md:max-w-full mx-auto p-6')}
					>
						{#if image}
							<Picture {image} />
						{/if}
					</div>
					<div class="flex h-full items-center justify-center p-6">
						<RichTextRender
							overrides={cn(
								'prose-p:text-background prose-headings:text-background',
								left && 'prose-p:text-foreground prose-headings:text-foreground'
							)}
							{richText}
						/>
					</div>
				</div>
				<!-- </div> -->
			</div>
		{/each}
	</div>
</section>
