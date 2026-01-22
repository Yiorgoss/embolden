import type { IAnimation } from "@payload-types";

const animationPresets = {

} as { [key: string]: any }

export type PresetKeys = keyof typeof animationPresets;

export function animatePreset(element: Element, { animation }: { animation: IAnimation & { preset: string } }) {

}
