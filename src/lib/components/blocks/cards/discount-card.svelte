<script lang="ts">
	import { type IDiscountCard } from '@payload-types';
	import { RichTextRender } from '@/components/blocks/rich-text';
	import Switch from '@/components/ui/switch/switch.svelte';
	import { cn } from '@/utils';
	import { site } from '@/config';
	import { Button } from '@/components/ui/button';

	const { blockData }: { blockData: IDiscountCard } = $props();
	const { cards } = blockData;

	const hasOneDiscount =
		cards &&
		cards.reduce((acc: boolean, { includeDiscount }) => {
			return (acc = includeDiscount || acc);
		}, false);
	let checked = $state(false);
</script>

<section id="discount-card" class="container mx-auto py-5">
	<div
		class={cn(
			'flex items-center justify-center gap-5 py-5 md:justify-start md:py-8',
			!hasOneDiscount ? 'hidden' : ''
		)}
	>
		<Switch id="discount-switch" size="xl" bind:checked />
		<label for="discount-switch">Yearly Discount </label>
	</div>
	<div class="flex flex-col items-center justify-center md:flex-row">
		{#if cards}
			{#each cards as { richText, price, yearlyDiscount, includeDiscount, link}}
				<div class="relative w-full max-w-md flex-auto px-10 py-2">
					<div class="bg-primary flex flex-col rounded-3xl p-10">
						<RichTextRender
							overrides="prose-headings:text-background  prose-li:text-background prose-p:text-background"
							{richText}
						/>
						<div class="flex flex-col gap-4">
							<div class="text-background mx-auto flex flex-col text-balance font-thin">
								{#if includeDiscount && checked}
									<span class="text-4xl font-semibold">
										{@html site.currency}
										{yearlyDiscount}
									</span>
									<p class="px-2">per month, billed yearly</p>
								{:else}
									<span class="text-4xl font-semibold">
										{@html site.currency}
										{price}
									</span>
									<p class="">per month, billed monthly</p>
								{/if}
							</div>
              <Button class="w-fit" {link}/>
						</div>
					</div>
				</div>
			{/each}
		{/if}
	</div>
</section>
