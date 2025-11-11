import { cancelFrame, frame } from "motion";
import type { Attachment } from "svelte/attachments";

let mouse = $state({ x: 0, y: 0 });
let next = $state({ x: 0, y: 0 });

function move(element: HTMLElement) {
  next.x += Math.round((mouse.x - next.x) / 20);
  next.y += Math.round((mouse.y - next.y) / 20);

  element.style.transform = `translate(${next.x}px, ${next.y}px)`;

  frame.render(() => move(element));
}
export function mouseFollow(child: HTMLElement): Attachment {
  return (element) => {
    (element as HTMLElement).onmousemove = (event) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    };

    $effect(() => move(child as HTMLElement));
    return cancelFrame(() => move(element as HTMLElement));
  };
}
