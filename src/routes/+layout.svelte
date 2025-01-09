<script lang="ts">
    import { Button } from "$lib/components/ui/button";
    import "../app.pcss";
    interface Props {
        children?: import("svelte").Snippet;
    }

    let { children }: Props = $props();
</script>

<header
    class="container absolute w-full flex justify-between items-center mb-12"
>
    <h1 class="text-3xl font-bold">mboldn</h1>
    <Button size="lg" href="##" variant="default">Contact Us</Button>
</header>

{@render children?.()}
