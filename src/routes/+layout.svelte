<script lang="ts">
	import type { Snippet } from 'svelte';
	import '../app.css';
	import { setPayloadState } from '@/state/payload.svelte';

	const { children }: { children: Snippet } = $props();

	setPayloadState();
</script>

{@render children()}
