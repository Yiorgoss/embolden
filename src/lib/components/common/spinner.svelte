<script lang="ts">
	import { cn } from '@/utils';
	import Icon from './icon.svelte';

	let { class: className, name }: { class?: string; name?: string } = $props();
</script>

<div class="flex h-full w-full items-center justify-center">
	<div class={cn('size-4 text-(--primary)', className)}>
		<Icon name="la:spinner" class="animate-[spin_0.8s_steps(8,_start)_infinite]" />
	</div>
</div>
