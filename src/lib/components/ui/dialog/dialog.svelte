<script lang="ts" module>
import { tv, type VariantProps } from "tailwind-variants";
export const sheetVariants = tv({
  base: "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out fixed z-50 gap-4 p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
  variants: {
    side: {
      top: "data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-0 top-0 border-b",
      bottom:
        "data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-0 bottom-0 border-t",
      left: "data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm",
      right:
        "data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm",
    },
  },
  defaultVariants: {
    side: "left",
  },
});

export type Side = VariantProps<typeof sheetVariants>["side"];
</script>

<script lang="ts">
import type { Snippet } from "svelte";
import { X } from "@lucide/svelte";
import { Dialog, type WithoutChild } from "bits-ui";
import { cn } from "@/utils";

type Props = Dialog.RootProps & {
  trigger: Snippet;
  title?: Snippet;
  content: Snippet;
  class?: string;
  side?: "left" | "right" | "top" | "bottom";
  contentProps?: WithoutChild<Dialog.ContentProps>;
};

let {
  open = $bindable(false),
  class: className,
  side,
  onOpenChange,
  trigger,
  title,
  content,
  ...restProps
}: Props = $props();
</script>

<Dialog.Root bind:open={open} onOpenChange={onOpenChange}>
  <Dialog.Trigger class="">
    {@render trigger()}
  </Dialog.Trigger>
  <Dialog.Portal >
    <Dialog.Overlay />
    <Dialog.Content
      class={cn("", sheetVariants({ side }), className)}
      {...restProps}
    >
      <Dialog.Title>
        {@render title?.()}
      </Dialog.Title>
      <!-- <Dialog.Description class="h-full bg-red-300"> -->
      {@render content()}
      <!-- </Dialog.Description> -->
      <Dialog.Close>
        <div class={cn("absolute top-6 right-6 ")}>
          <X />
        </div>
      </Dialog.Close>
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>
