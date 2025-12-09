<script lang="ts">
	import type { IRichTextCard } from '@payload-types';
	import { RichTextRender } from '../rich-text';
	import * as Card from '@/components/ui/card';

	const { blockData }: { blockData: IRichTextCard } = $props();
	const { richText, style: { background, alignX, alignY } = {} } = $derived(blockData);
</script>

<section id="rich-text-card-block" class="flex items-center justify-center h-full w-full py-8">
	<Card.Root
		style={`background:${background};`}
		class="h-full max-w-xs w-full hover:scale-105 transition-transform duration-300"
	>
		<Card.Content
			style={`justify-content:${alignX};align-items:${alignY}`}
			class="h-full flex justify-start items-start"
		>
			<RichTextRender {richText} />
		</Card.Content>
	</Card.Root>
</section>
