<script lang="ts">
	import { Input } from '@/components/ui/input';
	import { Label } from '@/components/ui/label';
	import { Toaster } from '@/components/ui/sonner';
	import FieldInfo from './field-info.svelte';
	import { Textarea } from '@/components/ui/textarea';
	import { site } from '@/config';
	import { toast } from 'svelte-sonner';
	import { goto } from '$app/navigation';
	import { createForm } from '@tanstack/svelte-form';
	import { Button } from '@/components/ui/button';
	import Spinner from '@/components/common/spinner.svelte';
	import { convertLexicalToHTML } from 'payload-richtext-fork/html';
	import DefaultRichText from '@/components/blocks/rich-text/default.svelte';

	const { data } = $props();

	const html = convertLexicalToHTML({ data: data.confirmationMessage });
	const form = createForm(() => ({
		defaultValues: {
			name: '',
			email: '',
			message: ''
		},
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

<Toaster position="top-right" richColors closeButton />

<form
	id="form"
	onsubmit={(e) => {
		e.preventDefault();
		e.stopPropagation();
		form.handleSubmit();
	}}
>
	<div class=" mx-auto flex flex-wrap max-w-3xl gap-y-5 p-10">
		{#each data.fields as f}
			<form.Field name={f.name}>
				{#snippet children(fieldAPI)}
					<div style:flex-basis={`${f.width ?? 100}%`} class="px-2 flex flex-col gap-2">
						<Label for={f.name}>{f.label ?? f.name}</Label>
						{#if f.blockType == 'textarea'}
							<Textarea
								id={f.name}
								class="h-[200px]"
								placeholder={f.defaultValue ?? f.blockType}
								value={fieldAPI.state.value}
								onblur={() => fieldAPI.handleBlur()}
								oninput={(e: Event) => {
									const target = e.target as HTMLInputElement;
									fieldAPI.handleChange(target.value);
								}}
							/>
						{:else}
							<Input
								id={f.name}
								type={f.blockType}
								placeholder={f.defaultValue ?? f.blockType}
								value={fieldAPI.state.value}
								onblur={() => fieldAPI.handleBlur()}
								oninput={(e: Event) => {
									const target = e.target as HTMLInputElement;
									fieldAPI.handleChange(target.value);
								}}
							/>
						{/if}
						<FieldInfo field={fieldAPI} />
					</div>
				{/snippet}
			</form.Field>
		{/each}
		<div class="basis-full flex">
			<form.Subscribe
				selector={(state) => ({
					canSubmit: state.canSubmit,
					isSubmitting: state.isSubmitting
				})}
			>
				{#snippet children({ canSubmit, isSubmitting })}
					<Button type="submit" disabled={!canSubmit}>
						{#if isSubmitting}
							<div class="flex justify-center items-center gap-2">
								<Spinner />
								{data.submitButtonLabel ?? 'Submit'}
							</div>
						{:else}
							{data.submitButtonLabel ?? 'Submit'}
						{/if}
					</Button>
				{/snippet}
			</form.Subscribe>
			<Button
				type="button"
				id="reset"
				variant="ghost"
				onclick={() => {
					form.reset();
				}}
			>
				Reset
			</Button>
		</div>
	</div>
</form>
