import type { PresetKeys } from "@/attachments/animations/scroll";
import type { IAnimation } from "@payload-types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChild<T> = T extends { child?: any } ? Omit<T, "child"> : T;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChildren<T> = T extends { children?: any } ? Omit<T, "children"> : T;
export type WithoutChildrenOrChild<T> = WithoutChildren<WithoutChild<T>>;
export type WithElementRef<T, U extends HTMLElement = HTMLElement> = T & { ref?: U | null };


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function createAnimationObject({ type, preset }: { type: IAnimation['type'], preset: PresetKeys[] }) {
  if (!type) return
  let obj = { type }
  //@ts-ignore 
  obj[`${type}`] = preset
  return obj as IAnimation
}

export function wrapLetters({ el, childClass = "animate-child" }: { el: HTMLElement, childClass?: string }) {
  const words = el.querySelectorAll('.animate-word')
  words.forEach(word => {
    const letters = (word as HTMLElement).innerText.split("")
    let inner = letters.reduce((acc: string, val: string) =>
      acc += `<span class="${childClass}">${val == " " ? "&nbsp;" : val}</span>`
      , "")
    word.innerHTML = inner
  })
}
