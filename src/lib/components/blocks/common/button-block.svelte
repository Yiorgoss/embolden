<script lang="ts">
	import { type IButton } from '@payload-types';
	import Button from '@/components/common/button.svelte';

	const { blockData }: { blockData: IButton } = $props();
</script>

<section id="button-block">
	<Button link={blockData.link} />
</section>
