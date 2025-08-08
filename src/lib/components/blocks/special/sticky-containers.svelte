<script lang="ts">
	import type { IStickyContainers } from '@payload-types';
	import RichTextRender from '@/components/blocks/rich-text/render.svelte';
	import Picture from '@/components/common/picture.svelte';
	import { cn } from '@/utils';

	const { blockData }: { blockData: IStickyContainers; index?: number } = $props();
	const { list: maybeList, title, style } = blockData;

	const list = maybeList ?? []; //typescript
</script>

<section
	id="sticky-container-root"
	style:backgroundColor={style?.bgColor}
	class="container mx-auto py-5"
>
	<div class="">
		{#each list as { richText, image }, i}
			{@const left = i % 2 == 1}
			<div
				style:top={`${90 * i + 5}px`}
				class={cn(
					`text-background bg-primary rounded-theme sticky grid grid-cols-1 md:grid-cols-2 `,
					left && 'bg-secondary border-foreground border '
				)}
			>
				{#if title && i == 0}
					<div class="font-cursive col-span-full w-full px-10 py-6 text-4xl">{title}</div>
				{/if}

				<div
					class:hidden={!(image && image.url)}
					class:md:order-last={left}
					class={cn('h-[300px] w-full p-12 md:h-[700px]', left && 'h-[295px] md:h-[695px]')}
				>
					{#if image}
						<Picture class="rounded-2xl " {image} />
					{/if}
				</div>
				<div
					class:col-span-full={!(image && image.url)}
					class="flex h-full items-center justify-center p-12"
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
