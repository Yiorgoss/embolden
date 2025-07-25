<script lang="ts">
	import { supportedLocales } from '@/config';
	import * as NavigationMenu from '@/components/ui/navigation-menu';
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import { invalidate, invalidateAll, goto } from '$app/navigation';

	const { locale, slug } = $derived(page.params);
	const targetLocale = $derived(locale == 'el' ? 'en' : 'el');
</script>

{#key locale}
	<a href={`${targetLocale}/${slug}`} lang={targetLocale} hreflang={targetLocale}>
		{targetLocale}
	</a>
{/key}
