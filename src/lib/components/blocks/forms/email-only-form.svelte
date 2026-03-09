<script lang="ts">
	import type { Form, IContactFormBlock } from '@payload-types';

	import RenderForms from './render-forms.svelte';
	import { page } from '$app/state';
	import { untrack } from 'svelte';
	import { createForm } from '@tanstack/svelte-form';
	import { site } from '@/config';
	import { toast } from 'svelte-sonner';
	import { goto } from '$app/navigation';
	import DefaultRichText from '@/components/blocks/rich-text/default.svelte';
	import { convertLexicalToHTML } from '@payloadcms/richtext-lexical/html';
	import { RichTextRender } from '../rich-text';
	import Input from '@/components/ui/input/input.svelte';
	import { Button } from '@/components/ui/button';
	import Spinner from '@/components/common/spinner.svelte';
	import Icon from '@/components/common/icon.svelte';
	import { syncConverters } from '../rich-text/converters';

	const { data } = $props();

	const html = $derived(
		convertLexicalToHTML({ data: data?.confirmationMessage, converters: syncConverters })
	);

	const form = createForm(() => ({
		onSubmit: async (args) => {
			const { value } = args;
			let submissionData = Object.entries(value).map(([name, value]) => ({
				field: name,
				value
			}));

			const submissionResponse = await fetch(`${site.CMS}/api/form-submissions`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					form: data.id,
					submissionData
				})
			});
			const text = await submissionResponse.text();
			if (!submissionResponse.ok) {
				toast.error('Submission Failed. Please try again or contact us by phone.');
				return;
			}
			if (data.confirmationType == 'redirect') {
				goto(data.redirect);
				return;
			}
			toast.success(DefaultRichText, {
				componentProps: {
					html
				}
			});
			form.reset();
		}
	}));
</script>

<div class="flex flex-col gap-4 justify-center items-center w-full xl:w-3/4">
	{#each data.fields ?? [] as field}
		{#if field.blockType == 'message'}
			<DefaultRichText
				overrides="w-full "
				html={convertLexicalToHTML({ data: field.message, converters: syncConverters })}
			/>
		{:else if field.blockType == 'email'}
			<form
				id={`form-${data.id}`}
				class="w-full"
				onsubmit={(e) => {
					e.preventDefault();
					e.stopPropagation();
					form.handleSubmit();
				}}
			>
				<div class="grid-cols-4 grid-rows-1 grid justify-center items-center">
					<Input
						type={field.blockType}
						name={field.name}
						placeholder={field.defaultValue ?? field.label}
						required={field.required}
						style={`width:${field.width};`}
						class="font-2xl px-3 bg-input rounded-full col-start-1 col-end-5 row-start-1 h-14 "
					/>
					<form.Subscribe
						selector={(state) => ({
							canSubmit: state.canSubmit,
							isSubmitting: state.isSubmitting
						})}
					>
						{#snippet children({ canSubmit, isSubmitting })}
							<Button
								type="submit"
								disabled={!canSubmit}
								class="bg-transparent rounded-full oveflow-hidden size-10 col-start-4 justify-self-end row-start-1 mr-2 border-4 border-input text-input hover:border-primary hover:bg-transparent hover:text-primary"
							>
								{#if isSubmitting}
									<div class="flex justify-center items-center gap-2">
										<Spinner class="size-6 " />
									</div>
								{:else}
									<div class="size-6">
										<Icon name="fa6-solid:arrow-right" />
									</div>
								{/if}
							</Button>
						{/snippet}
					</form.Subscribe>
				</div>
			</form>
		{/if}
	{/each}
</div>
