<script lang="ts">
	import type { IRichTextCard } from '@payload-types';
	import { RichTextRender } from '../rich-text';
	import * as Card from '@/components/ui/card';
	import Picture from '@/components/common/picture.svelte';

	const { blockData }: { blockData: IRichTextCard } = $props();
	const { richText, style: { background, alignX, alignY, borderRadius, maxWidth, border } = {} } =
		$derived(blockData);
</script>

<section id="rich-text-card-block" class="flex items-center justify-center h-full w-full py-8">
	<Card.Root
		style={`background:${background};border:${border};border-radius:${borderRadius};max-width:${maxWidth};`}
		class="relative overflow-hidden h-full col-start-1 row-start-1 max-w-xs w-full hover:scale-105 transition-transform duration-300"
	>
		<Card.Content
			style={`justify-content:${alignX};align-items:${alignY}`}
			class="h-full flex justify-start items-start"
		>
			<RichTextRender {richText} />
		</Card.Content>
		{#if blockData?.image}
			<div class="absolute inset-0">
				<Picture image={blockData?.image} />
			</div>
		{/if}
	</Card.Root>
</section>
