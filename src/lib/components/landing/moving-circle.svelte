<script lang="ts">
    import { onMount, tick } from "svelte";
    import { prefersReducedMotion } from "svelte/motion";

    import { AnimatedCircle } from "$lib/classes/animated-circle";
    import { getCircleData } from "$lib/assets/spheres/sphere-data";

    let { boundary }: { boundary: HTMLElement } = $props();

    let frameID: number;
    let animatedCircles: AnimatedCircle[] = [];

    const animate = () => {
        animatedCircles.forEach((circle) => circle.nextFrame());

        frameID = requestAnimationFrame(animate);

        if (prefersReducedMotion.current) {
            cancelAnimationFrame(frameID);
            return;
        }
    };

    onMount(async () => {
        // need to wait a tick for boundary not to be undefined seems a hack maybe tehre is a better way
        await tick();
        init();
    });

    const init = () => {
        let bb = boundary.getBoundingClientRect();
        const circlesData = getCircleData(bb);

        circlesData.forEach((circle) => {
            const sphere = document.createElement("img");
            sphere.src = circle.image;
            sphere.alt = "decorative";

            sphere.style.minWidth = `${circle.dimensions.current}px`;
            sphere.style.height = "auto";

            sphere.style.left = `${circle.position.initial.x}px`;
            sphere.style.top = `${circle.position.initial.y}px`;

            animatedCircles.push(
                new AnimatedCircle({
                    ...circle,
                    circleDomRef: boundary.appendChild(sphere),
                }),
            );
        });
        frameID = requestAnimationFrame(animate);
    };
    //     return () => cancelAnimationFrame(frameID);
    // });
</script>

<!-- <div class="flex w-full justify-center items-center"> -->
<!--     <div class="overflow-hidden relative w-full h-full"></div> -->
<!-- </div> -->
