<script lang="ts">
    import * as Sheet from "$lib/components/ui/sheet/index.js";
    import { Menu } from "lucide-svelte";
    import { Button } from "./ui/button";
</script>

<header
    class="absolute  top-0 left-0 right-0 w-full flex z-10 h-[100px] items-center mb-12"
>
    <div class="flex justify-between items-center w-full container">
        <Button href="/" variant="ghost">
            {@render title()}
        </Button>
        <div class="md:hidden block">
            <Sheet.Root>
                <Sheet.Trigger><Menu /></Sheet.Trigger>
                <Sheet.Content side="left" class="flex-col flex justify-around">
                    <Sheet.Header>
                        <Sheet.Title class="scale-110"
                            >{@render title()}</Sheet.Title
                        >
                    </Sheet.Header>
                    <div class="grow scale-110">
                        <div class="flex gap-10 flex-col items-center justify-center h-full ">
                            {@render links()}
                        </div>
                    </div>
                    <Sheet.Footer>
                        All creative works by Calisto Studio
                    </Sheet.Footer>
                </Sheet.Content>
            </Sheet.Root>
        </div>

        <div class="hidden md:block">
            {@render links()}
        </div>
    </div>
</header>

{#snippet links()}
    <Button
        size="lg"
        href="https://calisto.studio"
        variant="ghost"
        class="hover:bg-transparent"
    >
        Contact Us
    </Button>
    <Button href="/app" size="lg" variant="default">Use App</Button>
{/snippet}

{#snippet title()}
    <h1 class="text-3xl font-bold">mboldn</h1>
{/snippet}
