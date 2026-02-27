<script lang="ts">
	import { cn, resolveID } from '@/utils';
	import { onMount } from 'svelte';
	import { type IButton, type Page } from '@payload-types';
	import { ButtonPrimitive } from '@/components/common/primitives';
	import { Button, type ButtonProps as DefaultButtonProps } from '@/components/ui/button';
	import { page } from '$app/state';

	type ButtonProps = { link?: IButton } & DefaultButtonProps;
	let {
		class: className,
		variant: _variant = 'default',
		size = 'default',
		ref = $bindable(null),
		type = 'button',
		link,
		children,
		...restProps
	}: ButtonProps = $props();

	const { locale } = $derived(page.params);
	let { type: urlType, reference, url, display } = $derived(link || {});

	let _href = $state<Partial<Page> | undefined | null>(undefined);
	let variant = $derived(display?.variant ?? _variant);

	let href = $derived.by(() => {
		if (restProps['href']) return restProps['href']; // hardcoded
		// must be IButton
		if (urlType == 'custom' && url) return url; // custom url
		if (urlType == 'reference' && reference) {
			//@ts-ignore
			const slug = reference.value.slug; //slug is present if depth > 0 because of defaultPopulate
			return locale ? `/${locale}/${slug}` : `/${slug}`;
		}
		// _href has not resolved or resolved undefined
		if (!_href) return 'javascript:void(0);';
		//if reached href must be resolved and must be of type reference
		const { slug } = _href;
		return locale ? `/${locale}/${slug}` : `/${slug}`;
	});
</script>

<Button class={cn('wrap-anywhere mx-2', className)} {variant} {href} {...restProps}>
	{#if display?.text}
		{display.text}
	{:else}
		{@render children?.()}
	{/if}
</Button>
