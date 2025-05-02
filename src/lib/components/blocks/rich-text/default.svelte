<script lang="ts">
  import { cn } from "@/utils";

  const { html, overrides }: { html: string; overrides?: string } = $props();
</script>

<div
  id="default-rich-text"
  class={cn(
    "prose prose-headings:font-serif prose-h3:text-3xl",
    overrides,
  )}
>
  {@html html}
</div>
