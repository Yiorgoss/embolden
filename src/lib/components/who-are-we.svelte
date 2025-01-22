<script lang="ts">
    import { Button } from "./ui/button";
</script>

<div class="grid grid-rows-5">
    <div
        class="col-start-1 row-start-1 row-span-3 w-full flex gap-4 py-10 justify-start items-center flex-col bg-secondary"
    >
        <p class="font-light">The Team Behind Embolden</p>
        <h3 class="text-3xl font-mono font-medium">
            <span class="text-5xl font-cursive">C</span>alisto
            <span class="text-5xl font-cursive">S</span>tudio
        </h3>
        <p class="text-center text-balance font-light max-w-prose">
            Embolden is a product of the creative minds at our web design and
            development agency - Calisto Studio.
        </p>
    </div>

    <div class="container px-4 row-start-3 col-start-1 row-span-3">
        <div
            class="shadow-2xl rounded-xl flex justify-center items-center flex-col  py-10 bg-white/30 backdrop-blur-2xl"
        >
            <div class="text-4xl text-center font-semibold pt-8 pb-10">Interested In A Custom Website?</div>
            <div class="max-w-prose text-center pb-10">
                With the same attention to detail and passion for innovation we
                design custom, responsive websites that bring ideas to life and
                help your business thrive
            </div>
            <Button size="lg" variant="default" href="https://calisto.studio">
                Contact Us
            </Button>
        </div>
    </div>
</div>
