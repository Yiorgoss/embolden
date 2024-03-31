<script lang="ts">
    import init, {
        convert,
        add_css,
        alter_identifier,
    } from "$lib/wasm/embolden.js";
    import { mergeUint8Arr, incompressibleExt } from "$lib/_helpers/index";
    import { Info, X } from "lucide-svelte";

    import { Input, type FormInputEvent } from "$lib/components/ui/input";
    import { Label } from "$lib/components/ui/label";
    import * as Popover from "$lib/components/ui/popover";
    import * as RadioGroup from "$lib/components/ui/radio-group";
    import { Button } from "$lib/components/ui/button";
    import { Zip, unzip, ZipDeflate, ZipPassThrough } from "fflate";
    import { Switch } from "$lib/components/ui/switch";
    import * as Tooltip from "$lib/components/ui/tooltip";

    let urls: { filename: string; url: string }[] = [];
    // urls.push({ filename: "1", url: "aotenarsotea" });
    // urls.push({ filename: "2", url: "aotenarsotea" });
    // urls.push({ filename: "3", url: "aotenarsotea" });
    // urls.push({ filename: "4", url: "aotenarsotea" });
    let overwrite = false;
    let bold_fullstop = false;

    let bold_weight: "700";
    let make_bolder = false;

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
                    if (bold_weight && ext.includes("css")) {
                        value = add_css(value, +bold_weight);
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
                        let bold_raw = convert(value, bold_fullstop);
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
    class="container mx-auto justify-center items-center overflow-hidden grid grid-cols-1 md:grid-cols-2 min-h-svh gap-5"
>
    <div
        class="flex justify-end md:justify-normal flex-col gap-5 px-10 min-h-[200px]"
    >
        <div class="">
            <Label class="w-full">Upload a book to begin</Label>
            <Input
                on:change={(e) => convertFile(e)}
                accept=".epub"
                type="file"
                multiple
            />
        </div>
        <div class="flex flex-col items-start space-x-2">
            <div class="flex items-center space-x-2">
                <Switch bind:checked={make_bolder} />
                <Label>
                    Make periods bolder.
                    <Tooltip.Root>
                        <Tooltip.Trigger>
                            <Info
                                class="hover:text-primary/60 inline h-4 w-4 align-top"
                            />
                        </Tooltip.Trigger>
                        <Tooltip.Content>
                            <p class="max-w-[200px]">
                                Choose bold font weight.
                                <br />
                                Defaults to 700 if unchecked.
                            </p>
                        </Tooltip.Content>
                    </Tooltip.Root>
                </Label>
            </div>
            <RadioGroup.Root class="flex pt-2 " bind:value={bold_weight}>
                <div class="flex items-center space-x-2">
                    <RadioGroup.Item
                        disabled={!make_bolder}
                        value="800"
                        id="option-two"
                    />
                    <Label for="option-two">800</Label>
                </div>
                <div class="flex items-center space-x-2">
                    <RadioGroup.Item
                        disabled={!make_bolder}
                        value="900"
                        id="option-two"
                    />
                    <Label for="option-two">900</Label>
                </div>
                <div class="flex items-center space-x-2">
                    <RadioGroup.Item
                        disabled={!make_bolder}
                        value="1000"
                        id="option-two"
                    />
                    <Label for="option-two">1000</Label>
                </div>
            </RadioGroup.Root>
        </div>
        <div class="flex items-center space-x-2">
            <Switch bind:checked={bold_fullstop} />
            <Label>
                Make periods bold.
                <Tooltip.Root>
                    <Tooltip.Trigger>
                        <Info
                            class="hover:text-primary/60 inline h-4 w-4 align-top"
                        />
                    </Tooltip.Trigger>
                    <Tooltip.Content>
                        <p class="max-w-[200px]">
                            When enabled periods will be made bold, this helps
                            fast readers make out sentences easier.
                        </p>
                    </Tooltip.Content>
                </Tooltip.Root>
            </Label>
        </div>
    </div>
    <!-- <Separator orientation='vertical'/> -->
    <div
        class:hidden={urls.length === 0}
        class="gap-5 flex min-h-svh py-10 px-10 justify-start flex-col"
    >
        {#each urls as url, index}
            <div class="rounded-md py-4 px-6 relative">
                <Button
                    variant="ghost"
                    on:click={() => (urls = urls.filter((_, i) => index != i))}
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
