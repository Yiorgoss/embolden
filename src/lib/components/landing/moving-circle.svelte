<script lang="ts">
    import { onMount } from "svelte";
    import { AnimatedCircle } from "$lib/classes/animated-circle";

    let frameID: number;
    let boundary: HTMLElement;
    let animatedCircles: AnimatedCircle[] = [];

    const animate = () => {
        animatedCircles.forEach((circle) => circle.nextFrame());
        frameID = requestAnimationFrame(animate);
    };

    onMount(() => {
        let bb = boundary.getBoundingClientRect();
        // let shadowCSS = ''
        let shadowCSS =
            "shadow-[inset_-10px_-10px_30px_-20px_#8f8f8f,inset_10px_10px_30px_-20px_#fff]";
        const circleInitials = [
            {
                position: {
                    speed: { x: 0.1, y: 0.05 },
                    current: { x: 1, y: 1 },
                    direction: { x: 1, y: 1 },
                    bounds: {
                        min: { x: 0, y: 0 },
                        max: { x: bb.width, y: bb.height },
                    },
                },
                dimensions: {
                    current: 100,
                    bounds: { min: 100, max: 120 },
                    direction: 1,
                    speed: 0.02,
                },
                // css: " shadow-[inset_0_35px_60px_-15px_084fc]",
                css: `${shadowCSS} bg-gradient-to-br from-[#d082fa] to-[#e37a42]`,
            },
            {
                position: {
                    speed: { x: 0.1, y: 0.02 },
                    current: { x: 1000, y: 600 },
                    direction: { x: -1, y: 1 },
                    bounds: {
                        min: { x: 0, y: 0 },
                        max: { x: bb.width, y: bb.height },
                    },
                },
                dimensions: {
                    current: 100,
                    bounds: { min: 150, max: 180 },
                    direction: -1,
                    speed: 0.04,
                },
                css: `${shadowCSS} bg-gradient-to-br from-[#ffd2f0] to-[#92c7d8]`,
            },
            {
                position: {
                    speed: { x: 0.03, y: 0.08 },
                    current: { x: 800, y: 0 },
                    direction: { x: 1, y: -1 },
                    bounds: {
                        min: { x: 0, y: 0 },
                        max: { x: bb.width, y: bb.height },
                    },
                },
                dimensions: {
                    current: 130,
                    bounds: { min: 200, max: 230 },
                    direction: 1,
                    speed: 0.01,
                },
                css: `${shadowCSS} bg-gradient-to-br from-[#f9f2e5] to-[#9dd99b]`,
            },
            {
                position: {
                    speed: { x: 0.02, y: 0.01 },
                    current: { x: 500, y: 600 },
                    direction: { x: -1, y: -1 },
                    bounds: {
                        min: { x: 0, y: 0 },
                        max: { x: bb.width, y: bb.height },
                    },
                },
                dimensions: {
                    current: 130,
                    bounds: { min: 100, max: 230 },
                    direction: 1,
                    speed: 0.13,
                },
                css: `${shadowCSS} bg-gradient-to-br from-[#f9f2e5] to-[#9dd99b]`,
            },
        ];

        circleInitials.forEach((initial) =>
            animatedCircles.push(
                new AnimatedCircle({
                    ...initial,
                    circleDomRef: boundary.appendChild(
                        document.createElement("div"),
                    ),
                }),
            ),
        ),
            (frameID = requestAnimationFrame(animate));
        return () => cancelAnimationFrame(frameID);
    });
    // $inspect(box1)
</script>

<div class="flex h-lvh w-full justify-center items-center">
    <div
        bind:this={boundary}
        class="overflow-hidden relative w-full h-full"
    ></div>
</div>
