<script lang="ts">
	import { supportedLocales, defaultLocale } from '@/config';
	import * as NavigationMenu from '@/components/ui/navigation-menu';
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import { invalidate, invalidateAll, goto } from '$app/navigation';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import Icon from './icon.svelte';
	import { Button } from '@/components/ui/button';

	const { locale, slug } = $derived(page.params);
	const targetLocale = $derived(locale == 'el' ? 'en' : 'el');
	let disabled = $state(false);

	let currentLang = $derived(supportedLocales[locale] ?? supportedLocales[defaultLocale]);

	onMount(() => (document.documentElement.lang = locale ?? defaultLocale));
</script>

{#key locale}
	<DropdownMenu.Root>
		<DropdownMenu.Trigger aria-label="language menu" class="">
			{#snippet child({ props })}
				<Button
					{...props}
					variant="ghost"
					class="font-light py-2 px-2 text-xs flex justify-center gap-2 items-center"
					{disabled}
				>
					{#if disabled}
						<Icon name="loader-circle" class="animate-spin size-3" />
					{/if}
					<span class="">{currentLang}</span>
					<Icon name="chevron-down" class="font-thin stroke-1 size-4" />
				</Button>
			{/snippet}
		</DropdownMenu.Trigger>
		<DropdownMenu.Content class="rounded-[10px] py-2 px-2 ">
			<DropdownMenu.RadioGroup bind:value={currentLang}>
				{#each Object.entries(supportedLocales) as [key, value]}
					<DropdownMenu.Item class="rounded-xxs">
						<Button
							onclick={() => {
								disabled = true;
								setTimeout(() => {
									disabled = false;
								}, 1000);
							}}
							href={`/${key}/${slug}`}
							variant="ghost"
							lang={key}
							hreflang={key}
						>
							{value}
						</Button>
					</DropdownMenu.Item>
				{/each}
			</DropdownMenu.RadioGroup>
		</DropdownMenu.Content>
	</DropdownMenu.Root>
{/key}
