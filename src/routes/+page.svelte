<script lang="ts">
    import init, { convert, alter_identifier } from "$lib/wasm/embolden.js";
    import { mergeUint8Arr, incompressibleExt } from "$lib/_helpers/index";
    import { Info } from "lucide-svelte";

    import { Input, type FormInputEvent } from "$lib/components/ui/input";
    import { Label } from "$lib/components/ui/label";
    import * as Popover from "$lib/components/ui/popover"
    import { Button } from "$lib/components/ui/button";
    import { Zip, unzip, ZipDeflate, ZipPassThrough } from "fflate";
    import { Switch } from "$lib/components/ui/switch";
    import * as Tooltip from "$lib/components/ui/tooltip";
    import { Separator } from "$lib/components/ui/separator";

    let urls: { filename: string; url: string }[] = [
        // { filename: "test", url: "test_url" },
    ];
    let overwrite = false;
    $: console.log(urls);

    const convertFile = async (event: FormInputEvent<Event>) => {
        let target = event.target as HTMLInputElement;
        if (!target.files) {
            return;
        }
        for (const file of target.files) {
            const file_u8 = await file.arrayBuffer();
            unzipParseZipFile(new Uint8Array(file_u8), file.name);
        }
    };

    const unzipParseZipFile = (
        compressed: Uint8Array,
        originalName: string,
    ) => {
        const zipper = new Zip();
        let finalZip = new Uint8Array();
        zipper.ondata = (err, data, final) => {
            if (err) throw new Error(`failed while zipping ${err}`);
            finalZip = mergeUint8Arr(finalZip, data);
            if (final) {
                urls.push({
                    filename: originalName,
                    url: URL.createObjectURL(
                        new Blob([finalZip.buffer], {
                            type: "application/epub+zip",
                        }),
                    ),
                });
                urls = urls;
            }
        };

        unzip(compressed, (err, res) => {
            init().then(() => {
                if (err) throw new Error(`failed to parse unzip data ${err}`);
                for (let [key, value] of Object.entries(res)) {
                    const ext = key.slice(key.lastIndexOf(".") + 1) || "";
                    // const ext2 = key.split(".")[-1];
                    if (!overwrite && key == "content.opf") {
                        value = alter_identifier(value);
                    }
                    const filename = incompressibleExt.has(ext)
                        ? new ZipPassThrough(key)
                        : new ZipDeflate(key, { level: 9 });
                    zipper.add(filename);

                    if (ext.includes("htm")) {
                        // because everyone has a different extension it seems.
                        // Maybe a better way would be to get the files form the toc?
                        //
                        // skip all files that arent text
                        // then send to rust for converting
                        let bold_raw = convert(value);
                        filename.push(bold_raw);
                    } else {
                        filename.push(value);
                    }
                    filename.push(new Uint8Array(0), true);
                }
                zipper.end();
                return finalZip;
            });
        });
    };
</script>

<div
    class="container max-w-[500px] overflow-hidden flex-center flex-col min-h-svh gap-5"
>
    <div class="flex flex-col gap-5">
        <div class="">
            <Label class="w-full">Upload a book to begin</Label>
            <Input on:change={(e) => convertFile(e)} multiple type="file" />
        </div>
        <div class="flex items-center space-x-2">
            <Switch bind:checked={overwrite} />
            <Label>
                Overwrite Existing
                <Tooltip.Root>
                    <Tooltip.Trigger>
                        <Info
                            class="hover:text-primary/60 inline h-4 w-4 align-top"
                        />
                    </Tooltip.Trigger>
                    <Tooltip.Content>
                        <p class="max-w-[200px]">
                            When enabled this will certain identifiers
                            untouched. This causes some ebook readers to
                            overwrite the previous book with the embolded
                            version.
                            <span class="block pt-2 text-destructive">
                                WARNING:
                            </span> Do not do this unless you have access to the
                            original file.
                        </p>
                    </Tooltip.Content>
                </Tooltip.Root>
            </Label>
        </div>
    </div>
    <Separator />
    <div
        class:hidden={urls.length === 0}
        class="justify-end gap-5 flex w-full flex-col"
    >
        {#each urls as url}
            <div
                class="w-full py-2 px-2"
                bind:innerText={url.filename}
                contenteditable="plaintext-only"
                aria-readonly={false}
                role="textbox"
                tabindex="0"
            >
                {url.filename}
            </div>
            <div class="flex justify-end items-center gap-5">
                <Popover.Root>
                    <Popover.Trigger
                        ><Button variant="ghost">Rename</Button
                        ></Popover.Trigger
                    >
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
        {/each}
    </div>
</div>
