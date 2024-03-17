<script lang="ts">
    import init, { convert } from "$lib/wasm/embolden.js";
    import {
        mergeUint8Arr,
        incompressibleExt,
        epubTextExt,
    } from "$lib/_helpers/index";

    import { Input, type FormInputEvent } from "$lib/components/ui/input";
    import { Label } from "$lib/components/ui/label";
    import { Button } from "$lib/components/ui/button";
    import { Zip, unzip, ZipDeflate, ZipPassThrough } from "fflate";

    let url:string = "";
    let originalFileName = ''

    const convertFile = async (event: FormInputEvent<Event>) => {
        let target = event.target as HTMLInputElement;
        if (!target.files) {
            return;
        }
        originalFileName = target.files[0].name
        const file_u8 = await target.files[0].arrayBuffer();
        unzipParseZipFile(new Uint8Array(file_u8));
    };

    const unzipParseZipFile = (compressed: Uint8Array) => {
        const zipper = new Zip();
        let finalZip = new Uint8Array();
        zipper.ondata = (err, data, final) => {
            if (err) throw new Error(`failed while zipping ${err}`);
            finalZip = mergeUint8Arr(finalZip, data);
            if (final) {
                url = URL.createObjectURL(new Blob([finalZip.buffer],     ));
                // let url = new Blob([finalZip.buffer]);
            }
        };

        unzip(compressed, (err, res) => {
            init().then(() => {
                if (err) throw new Error(`failed to parse unzip data ${err}`);
                for (const [key, value] of Object.entries(res)) {
                    const ext = key.slice(key.lastIndexOf(".") + 1) || "";
                    // const ext2 = key.split(".")[-1];
                    const filename = incompressibleExt.has(ext)
                        ? new ZipPassThrough(key)
                        : new ZipDeflate(key, { level: 9 });
                    zipper.add(filename);

                    if (epubTextExt.has(ext)) {
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

<div class="container flex-center flex-col min-h-svh gap-5">
    <div class="grid grid-cols-2">
        <div class="">
            <Label class="w-full">Upload a book to begin</Label>
            <Input on:change={(e) => convertFile(e)} type="file" />
        </div>
        <div class:hidden={url.length == 0} class="justify-end flex flex-col">
            <a href={url} download={`EMBOLDEN_${originalFileName}`}><Button>Download</Button></a>
        </div>
    </div>
</div>
