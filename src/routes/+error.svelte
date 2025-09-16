<script lang="ts">
	import { page } from '$app/state';
</script>

<h1 class="flex h-svh w-full items-center justify-center">
	{page?.error?.message ?? 'Error Loading Page'}
</h1>
