<script lang="ts">
	import { cn, resolveID } from '@/utils';
	import { onMount } from 'svelte';

	import { ButtonPrimitive } from '@/components/common/primitives';
	import { type ButtonProps } from '@/components/ui/button';
	import { page } from '$app/state';

	let {
		class: className,
		variant: _variant = 'default',
		size = 'default',
		ref = $bindable(null),
		type = 'button',
		link,
		children
	}: ButtonProps = $props();

	const { locale } = page.params;
	const { type: urlType, reference, url, display } = { ...link };

	let _href = $state(
		link && urlType == 'reference' && reference
			? resolveID({ collection: reference!.relationTo, data: reference?.value })
			: Promise.resolve(url)
	);

	const variant = _variant != 'default' ? _variant : (display?.variant ?? _variant);

	// const text = display?.text ?? undefined;
	const text = display?.text ?? children;
</script>

{#await _href}
	<div></div>
{:then href}
	{@const slug = locale ? `/${locale ?? ''}/${href.slug}` : `/${href.slug}`}
	<ButtonPrimitive {variant} href={slug} text={text ?? href.title} />
{:catch error}
	<p>ERROR: {error}</p>
{/await}
