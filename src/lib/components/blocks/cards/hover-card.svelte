<script lang="ts">
	import Picture from '@/components/common/picture.svelte';
	import type { IHoverCard } from '@payload-types';
	import { RichTextRender } from '@/components/blocks/rich-text';
	import * as Card from '@/components/ui/card';
	import { cn } from '@/utils';

	const { blockData }: { blockData: IHoverCard } = $props();
	const { image, title, description, style } = blockData;

	let mobileHover = $state(false);
</script>

<section id="card-block" class="flex grow items-center h-full justify-center w-full pt-10 md:pt-0">
	<Card.Root
		ontouchstart={() => (mobileHover = true)}
		ontouchend={() => (mobileHover = false)}
		class="relative group/card min-h-[400px] p-0 overflow-hidden max-w-xs  w-full h-full"
	>
		<Card.Content class="absolute inset-0 p-0 ">
			<div class="grid h-full grid-cols-1 grid-rows-1">
				<div
					class:scale-120={mobileHover}
					class="row-start-1 h-full w-full col-start-1 duration-500 transition-transform group-hover/card:scale-120"
				>
					{#if image}
						<Picture loading="eager" {image} />
					{/if}
				</div>
				<div
					style:background={style?.background}
					class="row-start-1 col-start-1 flex flex-col relative p-8 z-10 mix-blend-harden"
				>
					<div class="grow duration-500">
						<div
							class={cn(
								'font-serif group-hover/card:opacity-0 transition-opacity duration-300 text-5xl p-2 absolute top-1/2 left-1/2 -translate-1/2',
								mobileHover && 'opacity-0'
							)}
						>
							{title}
						</div>
						<div
							class={cn(
								'group-hover/card:opacity-100 h-full flex  text-center justify-center items-center opacity-0 text-lg duration-300 transition-opacity',
								mobileHover && 'opacity-100'
							)}
						>
							{description}
						</div>
					</div>
				</div>
			</div>
		</Card.Content>
	</Card.Root>
</section>
