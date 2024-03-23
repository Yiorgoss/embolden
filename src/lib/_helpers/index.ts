// import { Zip} from 'fflate'
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

export const mergeUint8Arr = (arr1: Uint8Array, arr2: Uint8Array) => {
  let mergedArray = new Uint8Array(arr1.length + arr2.length);
  mergedArray.set(arr1);
  mergedArray.set(arr2, arr1.length); // add at offset
  // console.log({ arr1: arr1, arr2: arr2 });
  return mergedArray;
};
