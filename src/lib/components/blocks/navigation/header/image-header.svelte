<script lang="ts">
	import { NavigationMenu as Nav } from 'bits-ui';
	import Icon from '@/components/common/icon.svelte';
	import Picture from '@/components/common/picture.svelte';
	import Button from '@/components/ui/button/button.svelte';
	import Dialog from '@/components/ui/dialog/dialog.svelte';
	import { type IImageHeader } from '@payload-types';
	const { blockData }: { blockData: IImageHeader } = $props();

	const { image, nav } = blockData;
	let open = $state(false);
</script>

<section class="absolute top-0 z-50 mx-auto h-(--header-height) w-full px-0 md:px-10">
	<div class="container mx-auto h-full">
		<!-- desktop -->
		<Nav.Root class="hidden items-center justify-between md:flex">
			<a href="/" class="">
				<div class="h-(--header-height) w-auto">
					<Picture class="object-contain py-2" {image} />
				</div>
			</a>
			<Nav.List class="flex items-center justify-center pr-10 ">
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
						class="focus-visible:ring-offset-background mr-4 w-fit p-2 focus-visible:outline-hidden"
					>
						<Icon class="size-10" name="menu" />
					</div>
				{/snippet}
				{#snippet content()}
					<Nav.Root class="h-full [&>div]:h-full ">
						<!-- bits-ui decides to add a untargetable div child under root so be careful with adding other divs -->
						<Nav.List class="flex h-full w-full flex-col items-start justify-center ">
							{#each nav ?? [] as { link }}
								<Nav.Item class="w-full py-4">
									<Nav.Link class="" onclick={() => (open = false)}>
										{#snippet child()}
											<Button
												variant="ghost"
												class="text-primary w-full py-10 text-xl font-semibold hover:bg-black/20"
												{link}
											/>
										{/snippet}
									</Nav.Link>
								</Nav.Item>
							{/each}
						</Nav.List>
					</Nav.Root>
				{/snippet}
			</Dialog>
		</div>
	</div>
</section>
