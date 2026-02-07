<script lang="ts">
	import { Input } from '@/components/ui/input';
	import { Label } from '@/components/ui/label';
	import * as Popover from '@/components/ui/popover';
	import { Button } from '@/components/ui/button';
	import { Switch } from '@/components/ui/switch';
	import * as Select from '@/components/ui/select';
	import { Slider } from '@/components/ui/slider';

	import Icon from '@/components/common/icon.svelte';

	import type { Font } from './functions/types';
	import { unzipParseZipFile } from './functions/process_files';
	import { fetchFonts } from './functions';

	let downloadList: { filename: string; url: string }[] = $state([]);

	let boldFullstop = $state(false);
	let _embedFont = $state(false);

	let _font = $state('Default');
	let font: Promise<Font | undefined> = $derived.by(() => {
		if (_font == 'Default' || !_embedFont) return Promise.resolve(undefined);

		return fetchFonts(_font);
	});

	let fontWeights = $state([400, 700]);

	const convertFile = async (event: Event & { currentTarget: EventTarget & HTMLInputElement }) => {
		let target = event.target as HTMLInputElement;
		if (!target.files) {
			return;
		}
		for (const file of target.files) {
			const file_u8 = await file.arrayBuffer();
			unzipParseZipFile({
				file: { compressed: new Uint8Array(file_u8), name: file.name },
				downloadList,
				font: _embedFont ? await font : undefined,
				options: {
					boldFullstop,
					boldWeight: '' + fontWeights[1],
					regularWeight: '' + fontWeights[0]
				}
			});
		}
	};
</script>

<div
	class="container mx-auto justify-center items-start overflow-hidden grid grid-cols-1 md:grid-cols-2 min-h-svh gap-5"
>
	<div
		class="flex justify-end md:justify-normal flex-col gap-5 px-10 min-h-[200px] pt-14 md:pt-[100px]"
	>
		<div class="">
			<Label class="w-full">Upload a book to begin</Label>
			<Input onchange={(e) => convertFile(e)} accept=".epub" type="file" multiple />
		</div>
		<div class="flex flex-col items-start space-x-2">
			<div class="max-w-md w-full px-2 pt-4">
				<div class="w-full flex text-lg py-2 font-semibold justify-between">
					<p class="font-thin flex flex-col">
						Thinnest
						<span class="text-xs opacity-80">{fontWeights[0]}</span>
					</p>
					<p class="font-semibold flex flex-col">
						Boldest
						<span class="ml-auto text-xs opacity-80">{fontWeights[1]}</span>
					</p>
				</div>
				<Slider class="" type="multiple" bind:value={fontWeights} max={900} min={100} step={100} />
			</div>
		</div>
		<div class="flex gap-4 justify-start items-center">
			<div class="flex justify-center items-center gap-2">
				<Switch bind:checked={_embedFont} />
				<Label>Embed Font</Label>
			</div>
			<Select.Root disabled={!_embedFont} type="single" bind:value={_font}>
				<Select.Trigger class="w-[180px]">
					{_font}
				</Select.Trigger>
				<Select.Content>
					<Select.Item value="Default" label="Default">Default</Select.Item>
					<Select.Item value="OpenDyslexic" label="OpenDyslexic">Open Dyslexic</Select.Item>
					<Select.Item value="Montserrat" label="Montserrat">Montserrat</Select.Item>
					<Select.Item value="NotoSansMono" label="NotoSansMono">Noto Sans Mono</Select.Item>
				</Select.Content>
			</Select.Root>
		</div>
		<div class="flex items-center space-x-2">
			<Switch bind:checked={boldFullstop} />
			<Label>Make periods bold.</Label>
		</div>
	</div>
	<!-- <Separator orientation='vertical'/> -->
	<div
		class:hidden={downloadList.length === 0}
		class="gap-5 flex py-10 px-10 justify-start flex-col"
	>
		{#each downloadList as url, index}
			<div class="rounded-md py-4 px-6 relative">
				<Button
					variant="ghost"
					onclick={() => (downloadList = downloadList.filter((_, i) => index != i))}
					class="absolute hover:bg-transparent hover:opacity-50 -top-2 -right-2"
				>
					<Icon name="material-symbols:close-rounded" class="h-4 w-4 " />
				</Button>
				<div
					class="w-full py-2 px-4 hover:cursor-pointer"
					bind:innerText={url.filename}
					contenteditable="plaintext-only"
					aria-readonly={false}
					role="textbox"
					tabindex="0"
				>
					{url.filename}
				</div>
				<div class="flex justify-end items-center gap-5 pt-2">
					<Popover.Root>
						<Popover.Trigger>
							<Button variant="ghost">Rename</Button>
						</Popover.Trigger>
						<Popover.Content class="flex flex-col justify-end items-end gap-3">
							<Input type="text" placeholder="New Name" bind:value={url.filename} />
							<Popover.Close>
								<Button variant="ghost">Done</Button>
							</Popover.Close>
						</Popover.Content>
					</Popover.Root>
					<Button variant="outline" href={url.url} download={`EMBOLDEN_${url.filename}`}>
						Download
					</Button>
				</div>
			</div>
		{/each}
	</div>
</div>
