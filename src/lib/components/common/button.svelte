<script lang="ts">
	import { cn, resolveID } from '@/utils';
	import { onMount } from 'svelte';
	import { type IButton } from '@payload-types';
	import { ButtonPrimitive } from '@/components/common/primitives';
	import { type ButtonProps as DefaultButtonProps } from '@/components/ui/button';
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

	const { locale } = page.params;
	let { type: urlType, reference, url, display } = { ...link };

	let _href = $state(
		link && urlType == 'reference' && reference
			? resolveID({ collection: reference!.relationTo, data: reference?.value })
			: Promise.resolve({ slug: link?.url })
	);

	// either the url will exist or the reference will.
	// url will be null if a reference exists or if its a hardcoded href
	// reference will not exist if the url is not null
	//  console.log({ link, reject: !(link?.url || link?.reference) && !restProps['href'] });
	if (!(link?.url || link?.reference) && !restProps['href']) _href = Promise.reject();

	const variant = _variant != 'default' ? _variant : (display?.variant ?? _variant);
	const text = display?.text ?? children;

	if (restProps['href']) _href = Promise.resolve({ slug: restProps['href'] });
</script>

{#await _href}
	<div></div>
{:then href}
	{@const slug = locale ? `/${locale ?? ''}/${href.slug}` : `/${href.slug}`}
	<ButtonPrimitive
		class={className}
		{variant}
		href={slug}
		text={text ?? href.title}
		{...restProps}
	/>
{:catch error}
	<div>{error}</div>
{/await}
