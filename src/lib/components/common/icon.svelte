<script lang="ts">
	import type { IIcon } from '@payload-types';
	import 'iconify-icon';

	const {
		icon,
		name,
		class: className
	}: { icon?: IIcon; name?: string; class?: string } = $props();
</script>

<iconify-icon icon={name ?? icon?.name ?? ''} class={className} style={icon?.style}></iconify-icon>
