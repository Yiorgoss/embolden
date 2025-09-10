<script lang="ts">
	import Picture from '@/components/common/picture.svelte';
	import type { IHoverCard } from '@payload-types';
	import { RichTextRender } from '@/components/blocks/rich-text';
	import * as Card from '@/components/ui/card';
	import { cn } from '@/utils';

	const { blockData }: { blockData: IHoverCard } = $props();
	const { image, title, description, colorOverlayy } = blockData;

	let mobileHover = $state(false);
</script>

<section id="card-block" class="flex grow items-center h-full justify-center pt-10 md:pt-0">
	<Card.Root
		ontouchstart={() => (mobileHover = true)}
		ontouchend={() => (mobileHover = false)}
		class="h-full w-full group/card min-w-sm min-h-[400px] p-0 overflow-hidden max-w-md"
	>
		<Card.Content class="h-full p-0 ">
			<div class="grid h-full grid-cols-1 grid-rows-1">
				<div class="row-start-1 col-start-1">
					{#if image}
						<Picture loading="eager" {image} />
					{/if}
				</div>
				<div
					style:background={colorOverlayy}
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
								'group-hover/card:opacity-100 opacity-0 text-lg duration-300 transition-opacity',
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
