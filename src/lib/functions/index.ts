import type { Font } from "./types";
import montserratRegular from "$lib/fonts/Montserrat/Montserrat-Regular.ttf";
import montserratItalic from "$lib/fonts/Montserrat/Montserrat-Italic.ttf";

import dyslexicRegular from "$lib/fonts/OpenDyslexic/OpenDyslexic-Regular.otf";
import dyslexicBold from "$lib/fonts/OpenDyslexic/OpenDyslexic-Bold.otf";
import dyslexicItalic from "$lib/fonts/OpenDyslexic/OpenDyslexic-Italic.otf";
import dyslexicBoldItalic from "$lib/fonts/OpenDyslexic/OpenDyslexic-Bold-Italic.otf";

// import { Zip} from 'fflate'

export const mergeUint8Arr = (arr1: Uint8Array, arr2: Uint8Array) => {
    let mergedArray = new Uint8Array(arr1.length + arr2.length);
    mergedArray.set(arr1);
    mergedArray.set(arr2, arr1.length); // add at offset
    // console.log({ arr1: arr1, arr2: arr2 });
    return mergedArray;
};

interface generateCSSI {
    font: Font;
    regularWeight: string;
    boldWeight: string;
    relativeOPFPath: string;
}
export const generateCSS = ({
    font,
    boldWeight,
    relativeOPFPath,
    regularWeight,
}: generateCSSI): string => {
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
  font-weight: ${regularWeight} !important;
`;
    if (font)
        cssString = `${cssString} 
  font-family: ${font.name}, sans-serif !important;
`;

    cssString = `${cssString} }`;
    return cssString;
};

export const fetchFonts = async (fontName: string) => {
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

export const fontList = [
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
export const incompressibleExt = new Set([
    "zip",
    "gz",
    "png",
    "jpg",
    "jpeg",
    "pdf",
    "doc",
    "docx",
    "ppt",
    "pptx",
    "xls",
    "xlsx",
    "heic",
    "heif",
    "7z",
    "bz2",
    "rar",
    "gif",
    "webp",
    "webm",
    "mp4",
    "mov",
    "mp3",
    "aifc",
]);
