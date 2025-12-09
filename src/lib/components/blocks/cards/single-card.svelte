<script lang="ts">
	import type { ISingleCard } from '@payload-types';
	import * as Card from '@/components/ui/card';
	import { RichTextRender } from '../rich-text';
	import Button from '@/components/common/button.svelte';
	import Picture from '@/components/common/picture.svelte';

	const { blockData }: { blockData: ISingleCard } = $props();
	const { content: { richText, link, image } = {} } = $derived(blockData);
</script>

<Card.Root class="h-full w-full">
	<Card.Header>
		<Picture class="rounded-lg p-5 " {image} />
	</Card.Header>
	<Card.Content class="h-full">
		<RichTextRender
			overrides="prose-headings:text-background prose-p:text-background p-2"
			{richText}
		/>
	</Card.Content>
	<Card.Footer>
		<Button {link} />
	</Card.Footer>
</Card.Root>
