<script lang="ts">
  import { cn } from "@/utils";

  const { html, overrides }: { html: string; overrides?: string } = $props();
</script>

<div
  id='calisto-rich-text'
  class={cn(
    "prose prose-p:text-foreground prose-headings:text-foreground prose-p:font-normal prose-headings:font-normal prose-h1:font-serif prose-h2:font-cursive prose-h3:font-serif prose-h4:font-cursive prose-h1:text-7xl prose-h2:text-5xl prose-h3:text-5xl prose-h4:text-2xl max-w-full ",
    overrides,
  )}
>
  {@html html}
</div>
