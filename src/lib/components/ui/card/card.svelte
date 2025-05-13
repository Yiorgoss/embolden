<script lang="ts">
	import { cn } from '@/utils';
	import type { Snippet } from 'svelte';

	const {
		title,
		content,
		footer,
		class: className
	}: { title?: Snippet; content?: Snippet; footer?: Snippet; class: string } = $props();
</script>

<section
	class={cn(
		'group card-group-selector bg-card text-card-foreground rounded-theme flex h-full w-full max-w-xl flex-col items-center justify-center p-4',
		className
	)}
>
	{@render title?.()}
	{@render content?.()}
	{@render footer?.()}
</section>
