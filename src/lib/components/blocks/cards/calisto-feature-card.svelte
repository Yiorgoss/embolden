<script lang="ts">
	import { type ICalistoFeatureCard } from '@payload-types';
	import RichTextRender from '@/components/blocks/rich-text/render.svelte';
	import Icon from '@/components/common/icon.svelte';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { expoOut } from 'svelte/easing';

	const { blockData }: { blockData: ICalistoFeatureCard } = $props();
	const { cards } = blockData;

	let observer: IntersectionObserver | undefined = $state();
	let startAnimation = $state(false);
	let el: HTMLElement | undefined = $state();

	onMount(() => {
		observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					startAnimation = true;
				}
			},
			{ rootMargin: '-30%' }
		);
		if (!el) return;
		observer.observe(el);
		() => {
			if (el) observer!.unobserve(el);
		};
	});

	$effect(() => {
		if (startAnimation && el && observer) {
			observer.unobserve(el);
		}
	});
</script>

{#key startAnimation}
	<section
		class:invisible={!startAnimation}
		in:fade={{ duration: 2000, delay: 0, easing: expoOut }}
		bind:this={el}
		id="feature-card"
		class="container mx-auto"
	>
		<div class="flex flex-col md:gap-0 gap-10 md:flex-row">
			{#if cards}
				{@const length = cards.length}
				{#each cards as { richText, icon }}
					<div
						class:md:w-[25%]={length == 4}
						class:md:w-[33%]={length == 3}
						class:md:w-[50%]={length == 2}
						class="px-10 pt-10 w-full max-w-md mx-auto"
					>
						<div class="relative flex-auto h-full">
							<div class="bg-primary h-full flex flex-col rounded-3xl p-10">
								<RichTextRender
									overrides="prose-headings:text-background prose-p:text-background"
									{richText}
								/>
							</div>
							<div
								class="bg-foreground absolute top-0 left-1/6 size-18 -translate-y-1/2 rounded-xl"
							>
								<Icon class="text-background h-full w-full rounded-xl bg-gray-800/50 p-3" {icon} />
							</div>
						</div>
					</div>
				{/each}
			{/if}
		</div>
	</section>
{/key}
