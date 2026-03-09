<script lang="ts">
	import { resolveID } from '@/utils';
	import type { Form, IContactFormBlock } from '@payload-types';

	import RenderForms from './render-forms.svelte';
	import Spinner from '@/components/common/spinner.svelte';
	import { page } from '$app/state';
	import { untrack } from 'svelte';

	const {
		blockData,
		design, //hardcoded
		form: _form
	}: { blockData: IContactFormBlock; design?: string; form?: Form } = $props();

	const { locale } = page.params;

	const getForm = async (name: string) => {
		switch (name) {
			case 'oneLineEmail':
				return import('./email-only-form.svelte');
			case 'default':
				return import('./render-forms.svelte');
			default:
				return undefined;
		}
	};

	const FormBlock = $derived(await getForm(blockData?.design ?? design));
	const form = $derived(blockData?.form ?? _form);
</script>

{#if FormBlock && FormBlock.default && form}
	<FormBlock.default data={form}></FormBlock.default>
{/if}
