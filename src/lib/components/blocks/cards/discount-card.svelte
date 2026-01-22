<script lang="ts">
	import { type IDiscountCard } from '@payload-types';
	import { RichTextRender } from '@/components/blocks/rich-text';
	import Switch from '@/components/ui/switch/switch.svelte';
	import { cn } from '@/utils';
	import { site } from '@/config';
	import Button from '@/components/common/button.svelte';
	import { animate } from '@/attachments/animations/animate.svelte';

	const { blockData }: { blockData: IDiscountCard } = $props();
	const { cards } = $derived(blockData);
	const hasOneDiscount = $derived(
		cards &&
			cards.reduce((acc: boolean, { includeDiscount }) => {
				return (acc = includeDiscount || acc);
			}, false)
	);
	let checked = $state(false);
</script>

<section id="discount-card" class="container mx-auto py-5">
	<div
		class={cn(
			'flex items-center justify-center px-0 md:px-10 gap-5 py-5 md:justify-start md:py-8',
			!hasOneDiscount ? 'hidden' : ''
		)}
	>
		<Switch id="discount-switch" bind:checked />
		<label for="discount-switch">Yearly Discount </label>
	</div>
	<div
		class="flex justify-center items-center md:items-stretch flex-col md:flex-row gap-10 flex-wrap"
	>
		{#if cards}
			{#each cards as { richText, price, yearlyDiscount, includeDiscount, link }}
				<div
					class="animate-child max-w-xs w-full hover:scale-105 transition-transform duration-300"
				>
					<div class="bg-primary justify-between h-full flex flex-col rounded-3xl p-10">
						<RichTextRender {richText} />
						<div class="flex flex-col gap-8 px-4">
							<div class="text-background flex flex-col text-balance font-thin">
								{#if includeDiscount && checked}
									<span class="text-4xl pt-5 font-semibold">
										{@html site.currency}
										{yearlyDiscount}
									</span>
									<p class="px-2">per month, billed yearly</p>
								{:else}
									<span class="text-4xl pt-5 font-bold">
										{@html site.currency}
										{price}
									</span>
									<p class="">per month, billed monthly</p>
								{/if}
							</div>
							<Button class="w-fit" {link} />
						</div>
					</div>
				</div>
			{/each}
		{/if}
	</div>
</section>
