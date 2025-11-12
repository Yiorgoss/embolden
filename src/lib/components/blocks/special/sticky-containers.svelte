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
				style:top={`${50 * i + 5}px`}
				style:background={style?.background}
				style:height={`calc(100lvh - ${50 * 1 + 5}px)`}
				class={cn(
					`text-background h-full bg-primary rounded-theme sticky flex flex-wrap justify-center items-center md:flex-row `,
					left && 'bg-secondary border-foreground border '
				)}
			>
				{#if title && i == 0}
					<div class="px-6 font-serif italic break-all w-full p-2 text-xl">
						{title}
					</div>
				{/if}

				<div
					class:hidden={!(image && image.url)}
					class:md:order-first={left}
					class={cn('max-w-lg p-6 shrink h-fit md:h-full w-full')}
				>
					{#if image}
						<Picture
							{image}
							pictureClass="flex justify-center items-center "
							class="object-cover h-full w-full"
						/>
					{/if}
				</div>
				<div
					class:col-span-full={!(image && image.url)}
					class="flex max-w-md grow items-start justify-center p-6"
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
