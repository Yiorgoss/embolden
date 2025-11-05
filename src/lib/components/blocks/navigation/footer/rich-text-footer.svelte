<script lang="ts">
	import Picture from '@/components/common/picture.svelte';
	import { type IRichTextFooter } from '@payload-types';
	import { RichTextRender } from '../../rich-text';
	import Icon from '@/components/common/icon.svelte';
	import Button from '@/components/common/button.svelte';

	const { blockData }: { blockData: IRichTextFooter } = $props();
	const { image, richText, contact, nav, socials } = blockData;
</script>

<div class="inset-shadow-[0_15px_20px_-15px_rgb(0_0_0_/_0.25)] rounded-theme">
	<div
		class="container pt-10 md:px-0 px-5 pb-10 mx-auto flex justify-between items-center flex-col gap-4 md:flex-row"
	>
		<div class="w-full md:px-0 md:w-4/8 grow pt-10 md:pt-0">
			<RichTextRender overrides="" {richText} />
		</div>
		<div
			class="w-full md:w-3/8 flex flex-col text-center justify-start md:justify-around pt-10 md:pt-0"
		>
			<div class="">
				<h3 class="text-6xl text-balance font-serif">{contact?.q}</h3>
				<Button class=" px-0 md:px-4" variant="ghost" href={`mailto:${contact?.email}`}>
					<div class="flex items-center gap-2">
						<Icon name="circle-arrow-right" />
						<span class="">{contact?.email}</span>
					</div>
				</Button>
			</div>
			<div class="flex justify-around pt-10">
				<div class="flex flex-col items-start">
					<h3 class="font-semibold text-xl">Sitemap</h3>
					{#each nav ?? [] as { link }}
						<Button variant="ghost" size="sm" class="p-0" {link} />
					{/each}
				</div>
				<div class="flex flex-col items-start">
					<h3 class="font-semibold text-xl">Social Links</h3>
					{#each socials ?? [] as { link }}
						<Button variant="ghost" class="p-0" {link} />
					{/each}
				</div>
			</div>
		</div>
	</div>
</div>
