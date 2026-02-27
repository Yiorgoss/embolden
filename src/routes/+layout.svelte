<script lang="ts">
	import type { Snippet } from 'svelte';
	import '../app.css';
	import { page } from '$app/state';

	const { children }: { children: Snippet } = $props();
</script>

{@render children()}
