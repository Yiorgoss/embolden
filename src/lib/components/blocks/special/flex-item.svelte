<script lang="ts">
	import type { IFlexItem } from '@payload-types';
	import { cn } from '@/utils';
	import Icon from '@/components/common/icon.svelte';
	import Image from '@/components/common/image.svelte';
	import RichTextRender from '@/components/blocks/rich-text/render.svelte';

	const { blockData, className }: { blockData: IFlexItem; className: string } = $props();
</script>

<section id="flex-item-block">
	<div
		style:flex-direction={blockData.style?.flexDirection}
		style:gap={blockData.style?.gap}
		style:justify-content={blockData.style?.alignX}
		style:align-items={blockData.style?.alignY}
		style:background={blockData.style?.background}
		class={cn('flex', className)}
	>
		{#each blockData.list ?? [] as { icon, image, richText }, i}
			<Icon {icon} />
			<Image {image} />
			<RichTextRender {richText} />
		{/each}
	</div>
</section>
