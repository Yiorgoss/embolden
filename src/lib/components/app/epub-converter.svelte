<script lang="ts">
    import { X } from "lucide-svelte";
    import { onMount } from "svelte";

    import { Input } from "$lib/components/ui/input";
    import { Label } from "$lib/components/ui/label";
    import * as Popover from "$lib/components/ui/popover";
    import * as RadioGroup from "$lib/components/ui/radio-group";
    import { Button } from "$lib/components/ui/button";
    import { Switch } from "$lib/components/ui/switch";

    import type { Font } from "$lib/functions/types";
    import { unzipParseZipFile } from "$lib/functions/process_files";
    import { fetchFonts } from "$lib/functions";

    let downloadList: { filename: string; url: string }[] = $state([]);

    // let overwrite = false;
    let boldFullstop = $state(false);
    let undoTextTransform = $state(false);
    let noCustomFont = $state(false);
    let font: Font;
    // let font: (typeof fontNameList)[1] | (typeof fontNameList)[0] | undefined =
    //     undefined;
    let fontBindValue = $state("default");

    let boldWeight = $state("700");
    let regularWeight = $state("400");

    onMount(async () => {
        font = await fetchFonts("OpenDyslexic-Regular");
    });

    const convertFile = async (
        event: Event & { currentTarget: EventTarget & HTMLInputElement },
    ) => {
        let target = event.target as HTMLInputElement;
        if (!target.files) {
            return;
        }
        for (const file of target.files) {
            const file_u8 = await file.arrayBuffer();
            unzipParseZipFile({
                file: { compressed: new Uint8Array(file_u8), name: file.name },
                downloadList,
                font,
                options:{boldFullstop, boldWeight, regularWeight}
            });
        }
    };
</script>

<div
    class="container mx-auto justify-center items-center overflow-hidden grid grid-cols-1 md:grid-cols-2 min-h-svh gap-5"
>
    <div
        class="flex justify-end md:justify-normal flex-col gap-5 px-10 min-h-[200px]"
    >
        <div class="">
            <Label class="w-full">Upload a book to begin</Label>
            <Input
                onchange={(e) => convertFile(e)}
                accept=".epub"
                type="file"
                multiple
            />
        </div>
        <div class="flex flex-col items-start space-x-2">
            <div class="flex items-center space-x-2">
                <Label>Make font thinner.</Label>
            </div>
            <RadioGroup.Root class="flex pt-2" bind:value={regularWeight}>
                <div class="flex items-center space-x-2">
                    <RadioGroup.Item value="400" />
                    <Label for="option-two">Default</Label>
                </div>
                <div class="flex items-center space-x-2">
                    <RadioGroup.Item value="300" />
                    <Label for="option-two">Thin</Label>
                </div>
                <div class="flex items-center space-x-2">
                    <RadioGroup.Item value="200" />
                    <Label for="option-two">Thinner</Label>
                </div>
                <div class="flex items-center space-x-2">
                    <RadioGroup.Item value="100" />
                    <Label for="option-two">Thinnest</Label>
                </div>
            </RadioGroup.Root>
        </div>
        <div class="flex flex-col items-start space-x-2">
            <div class="flex items-center space-x-2">
                <Label>Make bold bolder.</Label>
            </div>
            <RadioGroup.Root class="flex pt-2 " bind:value={boldWeight}>
                <div class="flex items-center space-x-2">
                    <RadioGroup.Item value="700" />
                    <Label for="option-two">Default</Label>
                </div>
                <div class="flex items-center space-x-2">
                    <RadioGroup.Item value="800" />
                    <Label for="option-two">Bolder</Label>
                </div>
                <div class="flex items-center space-x-2">
                    <RadioGroup.Item value="900" />
                    <Label for="option-two">Boldest</Label>
                </div>
            </RadioGroup.Root>
        </div>
        <div class="flex flex-col items-start space-x-2">
            <RadioGroup.Root class="flex pt-2 " bind:value={fontBindValue}>
                <div class="flex items-center space-x-2">
                    <RadioGroup.Item value="default" />
                    <Label for="option-two">Default</Label>
                </div>
                <div class="flex items-center space-x-2">
                    <RadioGroup.Item value="Montserrat" />
                    <Label for="option-two">Montserrat</Label>
                </div>
                <div class="flex items-center space-x-2">
                    <RadioGroup.Item value="OpenDyslexic" />
                    <Label for="option-two">OpenDyslexic</Label>
                </div>
            </RadioGroup.Root>
        </div>
        <div class="flex items-center space-x-2">
            <Switch bind:checked={undoTextTransform} />
            <Label>Remove text transforms.</Label>
        </div>
        <div class="flex items-center space-x-2">
            <Switch bind:checked={noCustomFont} />
            <Label>Remove custom font</Label>
        </div>
        <div class="flex items-center space-x-2">
            <Switch bind:checked={boldFullstop} />
            <Label>Make periods bold.</Label>
        </div>
    </div>
    <!-- <Separator orientation='vertical'/> -->
    <div
        class:hidden={downloadList.length === 0}
        class="gap-5 flex min-h-svh py-10 px-10 justify-start flex-col"
    >
        {#each downloadList as url, index}
            <div class="rounded-md py-4 px-6 relative">
                <Button
                    variant="ghost"
                    onclick={() => (downloadList= downloadList.filter((_, i) => index != i))}
                    class="absolute hover:bg-transparent hover:opacity-50 -top-2 -right-2"
                >
                    <X class="h-4 w-4 " />
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
                        <Popover.Content
                            class="flex flex-col justify-end items-end gap-3"
                        >
                            <Input
                                type="text"
                                placeholder="New Name"
                                bind:value={url.filename}
                            />
                            <Popover.Close>
                                <Button variant="ghost">Done</Button>
                            </Popover.Close>
                        </Popover.Content>
                    </Popover.Root>
                    <a href={url.url} download={`EMBOLDEN_${url.filename}`}>
                        <Button>Download</Button>
                    </a>
                </div>
            </div>
        {/each}
    </div>
</div>

