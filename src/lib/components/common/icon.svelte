<script lang="ts">
	import { cn } from '@/utils';
	import type { IIcon } from '@payload-types';
	import 'iconify-icon';

	const {
		icon,
		name,
		class: className,
		style
	}: { icon?: IIcon; name?: string; class?: string; style?: string } = $props();
</script>

<iconify-icon
	height="none"
	width="none"
	icon={name ?? icon?.name ?? ''}
	class={className}
	style:height={icon?.style?.height ?? 'inherit'}
	style:width={icon?.style?.width ?? 'inherit'}
	style={style ?? icon?.style?.string}
></iconify-icon>
