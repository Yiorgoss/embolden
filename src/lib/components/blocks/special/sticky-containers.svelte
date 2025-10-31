<script lang="ts">
	import type { IStickyContainers } from '@payload-types';
	import RichTextRender from '@/components/blocks/rich-text/render.svelte';
	import Picture from '@/components/common/picture.svelte';
	import { cn } from '@/utils';

	const { blockData }: { blockData: IStickyContainers; index?: number } = $props();
	const { list: maybeList, title } = blockData;

	const list = maybeList ?? []; //typescript
</script>

<section id="sticky-container-root" class="container mx-auto">
	<div class="">
		{#each list as { richText, image, style }, i}
			{@const left = i % 2 == 1}
			<div
				style:top={`${80 * i + 5}px`}
				style:background={style?.background}
				class={cn(
					`text-background bg-primary rounded-theme sticky grid grid-cols-1 md:grid-cols-2 `,
					left && 'bg-secondary border-foreground border '
				)}
			>
				{#if title && i == 0}
					<div class="font-cursive break-all col-span-full w-full p-6 text-4xl">{title}</div>
				{/if}

				<div
					class:hidden={!(image && image.url)}
					class:md:order-last={left}
					class={cn('w-full max-w-md md:max-w-full mx-auto ')}
				>
					{#if image}
						<Picture class="rounded-2xl " {image} />
					{/if}
				</div>
				<div
					class:col-span-full={!(image && image.url)}
					class="flex h-full items-center justify-center p-6"
				>
					<RichTextRender
						overrides={cn(
							'prose-p:text-background prose-headings:text-background',
							left && 'prose-p:text-foreground prose-headings:text-foreground'
						)}
						{richText}
					/>
				</div>
				<!-- </div> -->
			</div>
		{/each}
	</div>
</section>
