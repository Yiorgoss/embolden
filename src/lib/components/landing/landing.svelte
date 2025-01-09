<script lang="ts">
    import { Button } from "../ui/button";
    import MovingCircle from "./moving-circle.svelte";

</script>

<div class="grid w-full h-full">
    <div class=" relative col-start-1 row-start-1 ">
        <MovingCircle />
    </div>
    <div
        class="col-start-1 container flex justify-center items-center row-start-1"
    >
        <div
            class="bg-white/30 flex justify-center flex-col items-center backdrop-blur-sm shadow-md rounded-lg py-16 w-full  mb-12 mx-4"
        >
            <h2 class="text-5xl font-bold text-gray-900 pb-8">
                Effortless Reading With Embolden
            </h2>
            <p class="text-lg py-2 text-gray-600 mb-8">
                Upload your book, customize your font, and read with ease using
                bionic reading principles.
            </p>
            <Button size="lg" variant="default">Get Started</Button>
        </div>
    </div>
</div>
