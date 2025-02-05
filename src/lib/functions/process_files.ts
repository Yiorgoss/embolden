import init, { convert, insert_into_content_opf } from "$lib/wasm/embolden.js";
import { Zip, unzip, ZipDeflate, ZipPassThrough } from "fflate";
import {
  generateCSS,
  incompressibleExt,
  mergeUint8Arr,
  singleStaticFontList,
} from ".";
import type { Font } from "./types";

interface UnzipParseZipFileI {
  file: {
    compressed: Uint8Array;
    name: string;
  };
  downloadList: { filename: string; url: string }[];
  options: {
    boldFullstop: boolean;
    boldWeight: string;
    regularWeight: string;
  };
  font: Font | undefined;
}
export const unzipParseZipFile = ({
  file,
  downloadList,
  font,
  options,
}: UnzipParseZipFileI) => {
  const zipper = new Zip();
  let finalZip = new Uint8Array();
  let isFontIncluded = false;

  zipper.ondata = (err, data, final) => {
    if (err) throw new Error(`failed while zipping ${err}`);
    finalZip = mergeUint8Arr(finalZip, data);
    if (final) {
      downloadList.push({
        filename: file.name,
        url: URL.createObjectURL(
          new Blob([finalZip.buffer], {
            type: "application/epub+zip",
          }),
        ),
      });
    }
  };

  unzip(file.compressed, (err, res) => {
    let filePaths = Object.keys(res).filter(
      (path) => path.slice(-3) == "opf" || path.slice(-3) == "css",
    );
    if (filePaths.length < 2)
      throw Error("Ambiguous number of files - too few");
    // if (filePaths.length < 2)
    //     throw Error("Ambiguous number of files - too many");

    let relativeOPFPath = "../".repeat(
      Math.abs(
        filePaths[0].split("/").length - filePaths[1].split("/").length,
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

        if (
          ext.includes("htm") &&
          !singleStaticFontList.includes(font?.name ?? "")
        ) {
          // because everyone has a different extension it seems.
          // Maybe a better way would be to get the files from content.opf
          let boldRaw = convert(value, options.boldFullstop);
          newFile.push(boldRaw);
        } else if (ext.includes("css")) {
          const cssString = generateCSS({
            font,
            boldWeight: options.boldWeight,
            regularWeight: options.regularWeight,
            relativeOPFPath,
          });

          const customCSS = new TextEncoder().encode(cssString);

          newFile.push(value);
          newFile.push(customCSS);
        } else if (ext.includes("opf")) {
          if (font) {
            const pathOPF = key.split("/").slice(0, -1).join("/");
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
        if (!isFontIncluded && font) {
          let fontFile = new ZipDeflate(
            `${relativeOPFPath}${font.name}.${font.ext}`,
            {
              level: 9,
            },
          );
          zipper.add(fontFile);
          fontFile.push(font.u8Data);
          fontFile.push(new Uint8Array(0), true);
          isFontIncluded = true;
        }
      }
      zipper.end();
      return finalZip;
    });
  });
};
