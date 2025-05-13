<script lang="ts">
	import type { ISingleCard } from '@payload-types';
	import { Card } from '@/components/ui/card';
	import { RichTextRender } from '../rich-text';
	import { Button } from '@/components/ui/button';
	import Picture from '@/components/common/picture.svelte';

	const { blockData }: { blockData: ISingleCard } = $props();
	const { content } = blockData;
	const { richText, link, image } = content ?? {};
</script>

<Card class="p-7 ">
	{#snippet content()}
		<Picture class="rounded-theme p-5 " {image} />
		<RichTextRender overrides="p-2" {richText} />
		<Button {link} />
	{/snippet}
</Card>
