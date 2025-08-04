<script lang="ts">
	import { NavigationMenu as Nav } from 'bits-ui';
	import Icon from '@/components/common/icon.svelte';
	import Picture from '@/components/common/picture.svelte';
	import Button from '@/components/common/button.svelte';
	import Dialog from '@/components/old_ui/dialog/dialog.svelte';
	import { type IImageHeader } from '@payload-types';
	import { onMount } from 'svelte';
	import { cn } from '@/utils';
	import { throttle } from '@/utils';
	import { page } from '$app/state';
	import LocaleSwitcher from '@/components/common/locale-switcher.svelte';

	const { blockData, hasLocaleSwitch }: { blockData: IImageHeader; hasLocaleSwitch: boolean } =
		$props();

	const { image, nav } = blockData;

	const { locale } = page.params;
	let open = $state(false);
	let currentY = $state(0);
	let previousY = $state(0);
	let scrollingUp = $state(false);

	let mounted = $state(false);

	const handleScroll = () => {
		if (currentY > previousY) {
			scrollingUp = true;
		} else {
			scrollingUp = false;
		}
		previousY = currentY;
	};

	onMount(() => (mounted = true));
</script>

<svelte:window bind:scrollY={currentY} onscroll={throttle(handleScroll, 100)} />

<section class="fixed top-0 z-30 mx-auto h-(--header-height) w-screen px-0 md:px-0">
	<div class="w-full h-full">
		<!-- desktop -->
		<Nav.Root
			class={cn(
				'translate-y-0 shadow-xl px-10 bg-background rounded-b-theme transition-transform ease-out duration-500 hidden w-full items-center justify-between md:flex',
				scrollingUp && '-translate-y-2/1'
			)}
		>
			<a href={`/${locale ?? ''}`} class="">
				<div class="h-(--header-height) lg:p-2 md:p-4 w-auto">
					<Picture class="object-contain py-2" loading="eager" {image} />
				</div>
			</a>
			<Nav.List class="flex items-center justify-center pr-10 ">
				{#if hasLocaleSwitch && mounted}
					<Nav.Item class="px-2">
						<LocaleSwitcher />
					</Nav.Item>
				{/if}
				{#each nav ?? [] as { link }}
					<Nav.Item class="px-2">
						<Nav.Link>
							{#snippet child()}
								<Button variant="ghost" class="h-full text-lg font-semibold " {link} />
							{/snippet}
						</Nav.Link>
					</Nav.Item>
				{/each}
			</Nav.List>
		</Nav.Root>
		<!-- mobile -->
		<div class="flex h-full items-center justify-end md:hidden">
			<Dialog class="h-full" bind:open>
				{#snippet trigger()}
					<div
						aria-label="navigation menu "
						class="focus-visible:ring-offset-background mr-4 w-fit p-2 focus-visible:outline-hidden"
					>
						<Icon class="size-8" name="menu" />
					</div>
				{/snippet}
				{#snippet content()}
					<Nav.Root class="h-full [&>div]:h-full ">
						<!-- bits-ui decides to add a untargetable div child under root so be careful with adding other divs -->
						<Nav.List class="flex h-full w-full flex-col items-start justify-center ">
							{#each nav ?? [] as { link }}
								<Nav.Item class="w-full py-4">
									<Nav.Link class="">
										{#snippet child()}
											<Button
												onclick={() => (open = false)}
												variant="ghost"
												class="text-primary w-full py-10 text-xl font-semibold hover:bg-black/20"
												{link}
											/>
										{/snippet}
									</Nav.Link>
								</Nav.Item>
							{/each}
							<Nav.Item class="w-full py-4">
								<LocaleSwitcher />
							</Nav.Item>
						</Nav.List>
					</Nav.Root>
				{/snippet}
			</Dialog>
		</div>
	</div>
</section>
