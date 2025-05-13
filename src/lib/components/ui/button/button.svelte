<script lang="ts" module>
	import type { WithElementRef } from 'bits-ui';
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';
	import { type VariantProps, tv } from 'tailwind-variants';

	import { type IButton, type Page } from '@payload-types';

	export const buttonVariants = tv({
		base: "focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20  aria-invalid:border-destructive inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-theme text-sm font-medium outline-none transition-all focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
		variants: {
			variant: {
				default: 'bg-primary text-primary-foreground shadow-xs hover:bg-primary/90',
				destructive:
					'bg-destructive shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 text-white',
				outline: 'bg-background shadow-xs hover:bg-accent hover:text-accent-foreground border',
				secondary: 'bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80',
				ghost: 'hover:text-primary/70',
				link: 'text-primary underline-offset-4 hover:underline'
			},
			size: {
				default: 'h-9 px-4 py-2 has-[>svg]:px-3',
				sm: 'h-8 gap-1.5 px-3 has-[>svg]:px-2.5',
				lg: 'h-10  px-6 has-[>svg]:px-4',
				icon: 'size-9 rounded-sm '
			}
		},
		defaultVariants: {
			variant: 'default',
			size: 'default'
		}
	});

	export type ButtonVariant = VariantProps<typeof buttonVariants>['variant'];
	export type ButtonSize = VariantProps<typeof buttonVariants>['size'];

	export type ButtonProps = WithElementRef<HTMLButtonAttributes> &
		WithElementRef<HTMLAnchorAttributes> & {
			variant?: ButtonVariant;
			size?: ButtonSize;
			link?: IButton;
		};
</script>

<script lang="ts">
	import { cn, resolveID } from '@/utils';

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

	const { type: urlType, reference, url, display } = { ...link };

	let _href = $state(
		link && urlType == 'reference' && reference 
			? resolveID({ collection: reference!.relationTo, data: reference?.value })
			: Promise.resolve(url)
	);

	if (restProps['href'] !== undefined) {
		_href = Promise.resolve(restProps.href);
	}

//   let _href = $state(
//   restProps.href
//     ? restProps.href
//     : cmsData && urlType
//       ? urlType == "reference"
//         ? // should never be null if urltype ir referrence
//           resolveID({
//             collection: reference!.relationTo,
//             data: reference?.value,
//             lang: "en",
//           })
//         : url
//       : undefined,
// );


	const variant = _variant != 'default' ? _variant : (display?.variant ?? _variant);

	// const text = display?.text ?? undefined;
	const text = display?.text ?? children ;
</script>

{#await _href then href}
	{#if href || text}
		{#if href}
			{@const slug = urlType == 'reference' ? href.slug : href}
			<a
				bind:this={ref}
				data-slot="button"
				class={cn(buttonVariants({ variant, size }), className)}
				href={slug == 'home' ? '/' : slug}
				{...restProps}
			>
				<!-- {@render children?.()} -->
				{#if children}
					{@render children()}
				{:else}
					{text ?? href.title}
				{/if}
			</a>
		{:else}
			<button
				bind:this={ref}
				data-slot="button"
				class={cn(buttonVariants({ variant, size }), className)}
				{type}
				{...restProps}
			>
				{#if children}
					{@render children()}
				{:else}
					{text}
				{/if}
			</button>
		{/if}
	{/if}
{/await}
