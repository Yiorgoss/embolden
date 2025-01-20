<script lang="ts">
    import { Button } from "$lib/components/ui/button";
    import { Menu } from "lucide-svelte";
    import "../app.css";
    import Header from "$lib/components/header.svelte"
    interface Props {
        children?: import("svelte").Snippet;
    }

    let { children }: Props = $props();
</script>

<Header />
<div class="">
    {@render children?.()}
</div>
