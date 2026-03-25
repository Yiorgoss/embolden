<script lang="ts">
	import { type IButton } from '@payload-types';
	import Button from '@/components/common/button.svelte';

	const { blockData }: { blockData: IButton } = $props();
</script>

<section
	id="button-block"
	style:align-items={blockData?.style?.alignY}
	style:justify-content={blockData?.style?.alignX}
	style:padding={blockData?.style?.padding}
	class="w-full h-full flex"
>
	<Button link={blockData?.link} />
</section>
