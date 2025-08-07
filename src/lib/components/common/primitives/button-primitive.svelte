<script lang="ts">
	import { Button, type ButtonProps as DefaultButtonProps } from '@/components/ui/button';
	import { type IButton } from '@payload-types';
	import type { Snippet } from 'svelte';

	type ButtonProps = { text: string | Snippet } & DefaultButtonProps;
	const { class: className, variant, text, href, ...restProps }: ButtonProps = $props();
</script>

<Button class={className} {variant} {href} {...restProps}>
	{#if typeof text == 'string'}
		{text}
	{:else}
		{@render text?.()}
	{/if}
</Button>
