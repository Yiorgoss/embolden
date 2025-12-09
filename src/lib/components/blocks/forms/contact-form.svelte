<script lang="ts">
	import { resolveID } from '@/utils';
	import type { Form, IContactFormBlock } from '@payload-types';

	import RenderForms from './render-forms.svelte';
	import Spinner from '@/components/common/spinner.svelte';
	import { page } from '$app/state';

	const { blockData }: { blockData: IContactFormBlock } = $props();
	const { form: _formData } = $derived(blockData);
	const { locale } = page.params;

	const formData: Promise<Form> = resolveID({ collection: 'forms', data: _formData, lang: locale });
</script>

{#await formData}
	<div class="w-full h-full flex justify-center items-center">
		<div class="loader opacity-70 w-20 h-20"></div>
	</div>
{:then data}
	<RenderForms {data} />
{/await}
