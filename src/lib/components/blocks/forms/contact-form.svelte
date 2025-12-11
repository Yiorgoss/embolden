<script lang="ts">
	import { resolveID } from '@/utils';
	import type { Form, IContactFormBlock } from '@payload-types';

	import RenderForms from './render-forms.svelte';
	import Spinner from '@/components/common/spinner.svelte';
	import { page } from '$app/state';
	import { untrack } from 'svelte';

	const { blockData }: { blockData: IContactFormBlock } = $props();
	const { form: _formData } = $derived(blockData);
	const { locale } = page.params;

	let loading = $state(false);
	let data = $state();

	$effect(() => {
		console.log('x');
		untrack(() => (loading = true));
		resolveID({ collection: 'forms', data: _formData, lang: locale })
			.then((form) => (data = form))
			.then(() => (loading = false));
	});
</script>

{#if loading || !data}
	<Spinner />
{:else}
	<RenderForms {data} />
{/if}
