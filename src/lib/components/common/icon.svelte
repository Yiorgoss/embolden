<script lang="ts">
	import {
		CircleArrowRight,
		ArrowRight,
		ArrowLeft,
		LoaderCircle,
		Users,
		Cog,
		Accessibility,
		MonitorSmartphone,
		ChevronDown,
		Menu
	} from '@lucide/svelte';
	import { type IIcon } from '@payload-types';

	const {
		icon,
		name,
		class: className
	}: { icon?: IIcon; name?: string; class?: string } = $props();

	const iconList = new Map();
	iconList.set('users', Users);
	iconList.set('menu', Menu);
	iconList.set('cog', Cog);
	iconList.set('accessibility', Accessibility);
	iconList.set('responsive', MonitorSmartphone);
	iconList.set('chevron-down', ChevronDown);
	iconList.set('circle-arrow-right', CircleArrowRight);
	iconList.set('arrow-right', ArrowRight);
	iconList.set('arrow-left', ArrowLeft);
	iconList.set('loader-circle', LoaderCircle);

	// const IconComponent = $derived(iconList.get(icon.text))

	const iconName = icon?.name ?? name ?? undefined;
	const calculatedBlockType = iconList.get(iconName) ?? undefined;
	const IconComponent = $derived(calculatedBlockType);
</script>

{#if calculatedBlockType}
	<IconComponent class={className} />
{/if}
