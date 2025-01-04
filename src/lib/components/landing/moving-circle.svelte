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
        const circleInitials = [
            {
                position: {
                    speed: { x: 0.05, y: 0.01 },
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
                css: "bg-green-400 ",
            },
            {
                position: {
                    speed: { x: 0.1, y: 0.02 },
                    current: { x: 500, y: 200 },
                    direction: { x: -1, y: 1 },
                    bounds: {
                        min: { x: 0, y: 0 },
                        max: { x: bb.width, y: bb.height },
                    },
                },
                dimensions: {
                    current: 100,
                    bounds: { min: 100, max: 120 },
                    direction: -1,
                    speed: 0.02,
                },
                css: "bg-red-400",
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
                    bounds: { min: 130, max: 150 },
                    direction: 1,
                    speed: 0.01,
                },
                css: "bg-blue-500",
            },
        ];

        circleInitials.forEach((initial) =>
            animatedCircles.push(
                new AnimatedCircle(
                    initial,
                    boundary.appendChild(document.createElement("div")),
                ),
            ),
        ),
            (frameID = requestAnimationFrame(animate));
        return () => cancelAnimationFrame(frameID);
    });
    // $inspect(box1)
</script>

<div class="flex pb-10 h-lvh w-full justify-center items-center">
    <div bind:this={boundary} class="overflow-hidden bg-sky-950 relative w-full h-full"></div>
</div>

