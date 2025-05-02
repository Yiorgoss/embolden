<script lang="ts">
	import { resolveID } from '@/utils';
	import type { Form, IContactFormBlock } from '@payload-types';

	import RenderForms from './render-forms.svelte';
	import Spinner from '@/components/common/spinner.svelte';

	const { blockData }: { blockData: IContactFormBlock } = $props();
	const { form: _formData } = blockData;

	const formData: Promise<Form> = resolveID({ collection: 'forms', data: _formData });
</script>

{#await formData}
	<Spinner />
{:then data}
	<RenderForms {data} />
{/await}
