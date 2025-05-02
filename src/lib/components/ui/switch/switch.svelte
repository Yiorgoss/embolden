<script lang="ts">
  import {
    Switch as SwitchPrimitive,
    type WithoutChildrenOrChild,
  } from "bits-ui";
  import { cn } from "@/utils";

  let {
    ref = $bindable(null),
    class: className,
    checked = $bindable(false),
    size = "default",
    ...restProps
  }: WithoutChildrenOrChild<
    SwitchPrimitive.RootProps & { size?: "sm" | "md" | "default" | "lg" | "xl" }
  > = $props();
  const customSize =
    size == "sm"
      ? ["w-6 h-3","size-2"]
      : size == "md"
        ? ["w-8 h-4","size-3"]
        : size == "default"
          ? ["w-10 h-5","size-4"]
          : size == "lg"
            ? ["w-12 h-6","size-5"]
            : size == "xl"
              ? ["w-14 h-7","size-6"]
              : ["w-16 h-8","size-7"]
</script>

<SwitchPrimitive.Root
  bind:ref
  bind:checked
  data-slot="switch"
  class={cn(
    "peer inline-flex  shrink-0 cursor-pointer items-center rounded-full px-[3px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-foreground grayscale-100 data-[state=checked]:grayscale-0 bg-gray-500  data-[state=unchecked]:inset ",
    customSize[0],
    className,
  )}
  {...restProps}
>
  <SwitchPrimitive.Thumb
    data-slot="switch-thumb"
    class={cn(
      "pointer-events-none block shrink-0 rounded-full bg-background transition-transform data-[state=checked]:translate-x-[calc(100%+3px)] data-[state=unchecked]:translate-x-[-1px] data-[state=unchecked]:shadow-mini",
      customSize[1]
    )}
  />
</SwitchPrimitive.Root>

