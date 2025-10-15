<script lang="ts">
	import { NavigationMenu as Nav } from 'bits-ui';
	import Picture from '@/components/common/picture.svelte';
	import Button from '@/components/common/button.svelte';
	import * as Sheet from '@/components/ui/sheet';
	import { type IImageHeader } from '@payload-types';
	import { onMount } from 'svelte';
	import { cn } from '@/utils';
	import { throttle } from '@/utils';
	import { page } from '$app/state';
	import LocaleSwitcher from '@/components/common/locale-switcher.svelte';
	import { Menu } from '@lucide/svelte';

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

<section class="fixed top-0 z-30 w-screen mx-auto h-(--header-height) px-0 md:px-0">
	<div class="w-full h-full pr-(--scrollbar-width)">
		<!-- desktop -->
		<Nav.Root
			class={cn(
				'translate-y-0 shadow-xl px-10 bg-background rounded-b-theme mr-10 transition-transform ease-out duration-500 hidden w-full items-center justify-between md:flex',
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
								<Button variant="ghost" class="font-serif h-full text-lg font-semibold " {link} />
							{/snippet}
						</Nav.Link>
					</Nav.Item>
				{/each}
			</Nav.List>
		</Nav.Root>
		<!-- mobile -->
		<div class="flex h-full items-center justify-end md:hidden">
			<Sheet.Root bind:open>
				<Sheet.Trigger class="h-full">
					<div
						aria-label="navigation menu "
						class="focus-visible:ring-offset-background bg-background border rounded-full mr-4 w-fit p-3 focus-visible:outline-hidden"
					>
						<Menu class="size-8" />
					</div>
				</Sheet.Trigger>
				<Sheet.Content>
					<Sheet.Header>
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
								<Nav.Item class="w-full py-4 flex justify-center items-center">
									<LocaleSwitcher />
								</Nav.Item>
							</Nav.List>
						</Nav.Root>
					</Sheet.Header>
				</Sheet.Content>
			</Sheet.Root>
		</div>
	</div>
</section>
