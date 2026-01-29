<script lang="ts">
	import { cn, resolveID } from '@/utils';
	import { onMount } from 'svelte';
	import { type IButton, type Page } from '@payload-types';
	import { ButtonPrimitive } from '@/components/common/primitives';
	import { Button, type ButtonProps as DefaultButtonProps } from '@/components/ui/button';
	import { page } from '$app/state';
	import { getPayloadState } from '@/state/payload.svelte';

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

	let payload = getPayloadState();

	let href = $derived.by(() => {
		if (restProps['href']) return restProps['href']; // hardcoded
		// must be IButton
		if (urlType == 'custom' && url) return url; // custom url
		// _href has not resolved or resolved undefined
		if (!_href) return 'javascript:void(0);';
		//if reached href must be resolved and must be of type reference
		const { slug } = _href;
		return locale ? `/${locale}/${slug}` : `/${slug}`;
	});

	$effect(() => {
		if (!link) return;
		if (urlType == 'reference' && reference) {
			payload
				.resolveID({
					collection: reference.relationTo,
					data: reference.value,
					lang: page.params.locale
				})
				.then((page) => {
					_href = { slug: page.slug };
				})
				.catch(() => (_href = null));
		}
	});
</script>

{#if display?.text}
	<Button class={cn('wrap-anywhere mx-2', className)} {variant} {href} {...restProps}>
		{#if display?.text}
			{display.text}
		{:else}
			{@render children?.()}
		{/if}
	</Button>
{/if}
