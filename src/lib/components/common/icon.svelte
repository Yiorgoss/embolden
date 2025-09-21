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
<!--  <script lang="ts">
	//  import {
	//  	CircleArrowRight,
	//  	ArrowRight,
	//  	ArrowLeft,
	//  	LoaderCircle,
	//  	Users,
	//  	Cog,
	//  	Accessibility,
	//  	MonitorSmartphone,
	//  	ChevronDown,
	//  	Menu
	//  } from '@lucide/svelte';
	import { onMount } from 'svelte';
	import { type IIcon } from '@payload-types';

	const {
		icon,
		name,
		class: className
	}: { icon?: IIcon; name?: string; class?: string } = $props();

	const dynamicResolveBlock = async ({ iconName }: { iconName: string }) => {
		switch (iconName) {
			case 'users':
				return import('@lucide/svelte/icons/users');
			case 'menu':
				return import('@lucide/svelte/icons/menu');
			case 'cog':
				return import('@lucide/svelte/icons/cog');
			case 'accessibility':
				return import('@lucide/svelte/icons/accessibility');
			case 'responsive':
				return import('@lucide/svelte/icons/monitor-smartphone');
			case 'chevron-down':
				return import('@lucide/svelte/icons/chevron-down');
			case 'circle-arrow-right':
				return import('@lucide/svelte/icons/circle-arrow-right');
			case 'arrow-right':
				return import('@lucide/svelte/icons/arrow-right');
			case 'arrow-left':
				return import('@lucide/svelte/icons/arrow-left');
			case 'loader-circle':
				return import('@lucide/svelte/icons/loader-circle');
		}
	};

	let iconPromise = $state();
	onMount(async () => {
		const iconName = icon?.name ?? name ?? undefined;
		iconPromise = await dynamicResolveBlock(iconName);
	});
</script>

{#if iconPromise}
	{#await iconPromise then I}
		{@const Icon = I.default}
		<Icon {className} {blockData} {cb} {hasLocaleSwitch} />
	{/await}
{/if}  -->
