<script lang="ts">
	import { resolveID } from '@/utils';
	import type { Form, IContactFormBlock } from '@payload-types';

	import RenderForms from './render-forms.svelte';
	import Spinner from '@/components/common/spinner.svelte';
	import { page } from '$app/state';
	import { untrack } from 'svelte';

	const { blockData }: { blockData: IContactFormBlock } = $props();
	const { form } = $derived(blockData);
	const { locale } = page.params;
</script>

<RenderForms data={form} />
