<script lang="ts">
    import init, {
        convert,
        insert_into_content_opf,
    } from "$lib/wasm/embolden.js";
    import { mergeUint8Arr, incompressibleExt } from "$lib/_helpers/index";
    import { Info, X } from "lucide-svelte";
    import { onMount } from "svelte";

    import { Input, type FormInputEvent } from "$lib/components/ui/input";
    import { Label } from "$lib/components/ui/label";
    import * as Popover from "$lib/components/ui/popover";
    import * as RadioGroup from "$lib/components/ui/radio-group";
    import { Button } from "$lib/components/ui/button";
    import { Zip, unzip, ZipDeflate, ZipPassThrough } from "fflate";
    import { Switch } from "$lib/components/ui/switch";
    import * as Tooltip from "$lib/components/ui/tooltip";

    import montserratRegular from "$lib/fonts/Montserrat/Montserrat-Regular.ttf";
    // import montserratItalic from "$lib/fonts/Montserrat/Montserrat-Italic.ttf";

    import dyslexicRegular from "$lib/fonts/OpenDyslexic/OpenDyslexic-Regular.otf";
    // import dyslexicBold from "$lib/fonts/OpenDyslexic/OpenDyslexic-Bold.otf";
    // import dyslexicItalic from "$lib/fonts/OpenDyslexic/OpenDyslexic-Italic.otf";
    // import dyslexicBoldItalic from "$lib/fonts/OpenDyslexic/OpenDyslexic-Bold-Italic.otf";
    //
    // const fontList = [
    //     {
    //         name: "Montserrat",
    //         ext: "ttf",
    //         variants: [
    //             { name: "Regular", style: "normal", src: montserratRegular },
    //             { name: "Italic", style: "italic", src: montserratItalic },
    //         ],
    //     },
    //     {
    //         name: "OpenDyslexic",
    //         ext: "otf",
    //         variants: [
    //             {
    //                 name: "Regular",
    //                 style: "normal",
    //                 weight: "normal",
    //                 src: dyslexicRegular,
    //             },
    //             {
    //                 name: "Bold",
    //                 style: "normal",
    //                 weight: "bold",
    //                 src: dyslexicBold,
    //             },
    //             {
    //                 name: "Italic",
    //                 style: "italic",
    //                 weight: "normal",
    //                 src: dyslexicItalic,
    //             },
    //             {
    //                 name: "Bold-Italic",
    //                 style: "italic",
    //                 weight: "bold",
    //                 u8: dyslexicBoldItalic,
    //             },
    //         ],
    //     },
    // ];

    let fontList = [
        {
            name: "OpenDyslexic-Regular",
            ext: "otf",
            style: "normal",
            src: dyslexicRegular,
        },
        {
            name: "Montserrat-Regular",
            ext: "ttf",
            style: "normal",
            src: montserratRegular,
        },
    ];

    let urls: { filename: string; url: string }[] = [];

    // let overwrite = false;
    let boldFullstop = false;
    let undoTextTransform = false;
    let noCustomFont = false;
    let font: { name: string; ext: string; u8Data: Uint8Array } | undefined;
    // let font: (typeof fontNameList)[1] | (typeof fontNameList)[0] | undefined =
    //     undefined;
    let fontBindValue = "default";

    $: boldWeight = "700";
    $: fontWeight = "400";
    onMount(async () => {
        font = await fetchFonts("OpenDyslexic-Regular");
    });

    const fetchFonts = async (fontName: string) => {
        const fontObj = fontList.find(({ name }) => name == fontName);
        if (!fontObj) return;

        // return fontObj.variants.forEach(async ({ name, src }) => {
        const response = await fetch(fontObj.src);
        const arrayBuffer = await response.arrayBuffer().then();
        return {
            name: fontObj.name,
            ext: fontObj.ext,
            u8Data: new Uint8Array(arrayBuffer),
        };
        // });
    };

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
            let filePaths = Object.keys(res).filter(
                (path) => path.slice(-3) == "opf" || path.slice(-3) == "css",
            );
            if (filePaths.length < 2)
                throw Error("Ambiguous number of files - too few");
            if (filePaths.length < 2)
                throw Error("Ambiguous number of files - too many");

            let relativeOPFPath = "../".repeat(
                Math.abs(
                    filePaths[0].split("/").length -
                        filePaths[1].split("/").length,
                ),
            );
            init().then(() => {
                if (err) throw new Error(`failed to parse unzip data ${err}`);
                for (let [key, value] of Object.entries(res)) {
                    const ext = key.slice(key.lastIndexOf(".") + 1) || "";
                    const newFile = incompressibleExt.has(ext)
                        ? new ZipPassThrough(key)
                        : new ZipDeflate(key, { level: 9 });
                    zipper.add(newFile);

                    if (ext.includes("htm")) {
                        // because everyone has a different extension it seems.
                        // Maybe a better way would be to get the files from content.opf
                        let boldRaw = convert(value, boldFullstop);
                        newFile.push(boldRaw);
                    } else if (ext.includes("css")) {
                        // take care with the ordering of when these values are added
                        let cssString = `
b {
  text-transform: none !important;  
  font-weight: ${boldWeight} !important;
}`;
                        if (font)
                            cssString = `${cssString}

@font-face {
  font-family: ${font.name};
  font-style: normal; 
  src: url("${relativeOPFPath}${font.name}.${font.ext}"); 
}

* {
  font-weight: ${fontWeight} !important;
`;
                        if (font)
                            cssString = `${cssString} 
  font-family: ${font.name}, sans-serif !important;
`;

                        cssString = `${cssString} }`;

                        const customCSS = new TextEncoder().encode(cssString);

                        newFile.push(value);
                        newFile.push(customCSS);
                    } else if (ext.includes("opf")) {
                        if (font) {
                            const pathOPF = key
                                .split("/")
                                .slice(0, -1)
                                .join("/");
                            value = insert_into_content_opf(
                                value,
                                `${pathOPF ? pathOPF + "/" : pathOPF}${font.name}.${font.ext}`,
                            );
                        }
                        newFile.push(value);
                    } else {
                        newFile.push(value);
                    }
                    newFile.push(new Uint8Array(0), true);
                    if (font) {
                        let fontFile = new ZipDeflate(
                            `${relativeOPFPath}${font.name}.${font.ext}`,
                            {
                                level: 9,
                            },
                        );
                        zipper.add(fontFile);
                        fontFile.push(font.u8Data);
                        fontFile.push(new Uint8Array(0), true);
                    }
                }
                zipper.end();
                console.log("done");
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
                <Label>
                    Make font thinner.
                    <Tooltip.Root>
                        <Tooltip.Trigger>
                            <Info
                                class="hover:text-primary/60 inline h-4 w-4 align-top"
                            />
                        </Tooltip.Trigger>
                        <Tooltip.Content>
                            <p class="max-w-[200px]">
                                Choose font weight of the unbolded text.
                                <br />
                                Defaults to 400 if unchecked.
                            </p>
                        </Tooltip.Content>
                    </Tooltip.Root>
                </Label>
            </div>
            <RadioGroup.Root class="flex pt-2" bind:value={fontWeight}>
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
                <Label>
                    Make bold bolder.
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
            <Label>
                Remove text transforms.
                <Tooltip.Root>
                    <Tooltip.Trigger>
                        <Info
                            class="hover:text-primary/60 inline h-4 w-4 align-top"
                        />
                    </Tooltip.Trigger>
                    <Tooltip.Content>
                        <p class="max-w-[200px]">
                            Some publishers force all bold text to also be
                            uppercase. This causes words to become disjointed.
                            Thus you can remove all forced cases of text
                            transformations. Keep in mind this will apply to all
                        </p>
                    </Tooltip.Content>
                </Tooltip.Root>
            </Label>
        </div>
        <div class="flex items-center space-x-2">
            <Switch bind:checked={noCustomFont} />
            <Label>
                Remove custom font
                <Tooltip.Root>
                    <Tooltip.Trigger>
                        <Info
                            class="hover:text-primary/60 inline h-4 w-4 align-top"
                        />
                    </Tooltip.Trigger>
                    <Tooltip.Content>
                        <p class="max-w-[200px]">
                            Some publishers include a custom font, sometimes
                            this isn't the easiest font to read.
                        </p>
                    </Tooltip.Content>
                </Tooltip.Root>
            </Label>
        </div>
        <div class="flex items-center space-x-2">
            <Switch bind:checked={boldFullstop} />
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
