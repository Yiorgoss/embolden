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

	const { data } = $props();

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
				toast.error('Submission Failed. Please try again or contact us directly.');
				return;
			}
			if (data.confirmationType == 'redirect') {
				goto(data.redirect);
				return;
			}
			toast.success(
				// data.confirmationMessage ?? 'Thank you for contacting us. We will be in touch shortly'
				"Thank you for reaching out! We've received your message and will be in touch shortly"
			);
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
	<div class="mx-auto flex flex-wrap max-w-3xl gap-y-5 p-10">
		<form.Field
			name="name"
			validators={{
				onChange: ({ value }) => (value.length < 3 ? 'Not long enough' : undefined),
				onChangeAsyncDebounceMs: 500,
				onChangeAsync: async ({ value }) => {
					await new Promise((resolve) => setTimeout(resolve, 1000));
					return value.includes('error') && 'No "error" allowed in first name';
				}
			}}
		>
			{#snippet children(field)}
				<div class="px-2 basis-1/2 flex flex-col gap-2">
					<Label for={field.name}>Name</Label>
					<Input
						id={field.name}
						type="text"
						placeholder={field.name}
						value={field.state.value}
						onblur={() => field.handleBlur()}
						oninput={(e: Event) => {
							const target = e.target as HTMLInputElement;
							field.handleChange(target.value);
						}}
					/>
					<FieldInfo {field} />
				</div>
			{/snippet}
		</form.Field>
		<form.Field
			name="email"
			validators={{
				onChange: ({ value }) => (value.length < 3 ? 'Not long enough' : undefined)
			}}
		>
			{#snippet children(field)}
				<div class="px-2 basis-1/2 flex flex-col gap-2">
					<Label for={field.name}>Email</Label>
					<Input
						id={field.name}
						type="text"
						placeholder={field.name}
						value={field.state.value}
						onblur={() => field.handleBlur()}
						oninput={(e: Event) => {
							const target = e.target as HTMLInputElement;
							field.handleChange(target.value);
						}}
					/>
					<FieldInfo {field} />
				</div>
			{/snippet}
		</form.Field>
		<form.Field name="message">
			{#snippet children(field)}
				<div class="px-2 basis-full flex flex-col gap-2">
					<Label for={field.name}>Message</Label>
					<Textarea
						class="min-h-30"
						placeholder={field.name}
						value={field.state.value}
						oninput={(e: Event) => {
							const target = e.target as HTMLInputElement;
							field.handleChange(target.value);
						}}
					/>
				</div>
			{/snippet}
		</form.Field>
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
