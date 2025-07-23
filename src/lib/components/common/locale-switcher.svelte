<script lang="ts">
	import { supportedLocales } from '@/config';
	import * as NavigationMenu from '@/components/ui/navigation-menu';
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import { invalidate, invalidateAll, goto } from '$app/navigation';

	const { locale, slug } = $derived(page.params);

	const navigate = async () => {
		if (locale == 'el') {
			goto(`/${slug}`);
		} else {
			goto(`/el/${slug}`);
		}
	};
</script>

{#key locale}
	<button onclick={() => navigate()}>
		{locale == 'el' ? 'en' : 'el'}
	</button>
{/key}
