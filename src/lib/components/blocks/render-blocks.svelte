<script lang="ts">
	//  import { blockList } from '$lib/components/blocks';
	import { onMount, type ComponentType } from 'svelte';

	const {
		blockData,
		className,
		cb,
		hasLocaleSwitch
	}: { blockData: any; className?: string; cb?: () => void; hasLocaleSwitch?: boolean } = $props();

	const dynamicResolveBlock = async ({ blockName }: { blockName: string }) => {
		switch (blockName) {
			case 'calistoLanding':
				return import('./hero/calisto-landing.svelte');
			case 'mediumHero':
				return import('./hero/medium-hero.svelte');
			case 'stickyContainers':
				return import('./special/sticky-containers.svelte');
			case 'bentoGrid':
				return import('./special/bento-grid.svelte');
			case 'accordion':
				return import('./special/accordion.svelte');
			case 'carousel':
				return import('./special/carousel.svelte');
			case 'calistoFeatureCard':
				return import('./cards/calisto-feature-card.svelte');
			case 'discountCard':
				return import('./cards/discount-card.svelte');
			case 'singleCard':
				return import('./cards/single-card.svelte');
			case 'hoverCard':
				return import('./cards/hover-card.svelte');
			case 'blockColumnLayout':
				return import('./layout/block-column-layout.svelte');
			//  case 'contentColLayout':
			//  	return import('./layout/content-col-layout.svelte');
			case 'image':
				return import('./common/image.svelte');
			case 'gutter':
				return import('./common/gutter.svelte');
			case 'rtBlock':
				return import('./rich-text/block.svelte');
			case 'imageHeader':
				return import('./navigation/header/image-header.svelte');
			case 'floatingHeader':
				return import('./navigation/header/floating-header.svelte');
			case 'richTextFooter':
				return import('./navigation/footer/rich-text-footer.svelte');
			case 'contactForm':
				return import('./forms/contact-form.svelte');
			case 'scrollGrowLanding':
				return import('./hero/scroll-grow-landing.svelte');
			case 'marquee':
				return import('./special/marquee.svelte');
			case 'richTextCard':
				return import('./cards/rich-text-card.svelte');
			case 'infoBanner':
				return import('./banners/info-banner.svelte');
		}
	};

	let calculatedBlockType = $state<any>();
	$effect(() => {
		const blockName = blockData?.blockType ?? undefined;
		dynamicResolveBlock({ blockName }).then((block) => (calculatedBlockType = block));
	});

	//  $effect(() => {
	//  	blockData;
	//  	if (blockData?.blockType == 'richTextFooter') console.log({ renderBlock: blockData.contact.q });
	//  });
	//  $inspect(blockData);

	//  const calculatedBlockType = blockList.get(blockData?.blockType ?? undefined) ?? undefined;
	//  const SvelteComponent = $derived(calculatedBlockType.default);
</script>

{#if calculatedBlockType && calculatedBlockType.default}
	{@const Block = calculatedBlockType.default}
	<Block {className} {blockData} {cb} {hasLocaleSwitch} />
{/if}
