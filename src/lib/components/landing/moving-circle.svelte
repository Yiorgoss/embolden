<script lang="ts">
    import { onMount, tick } from "svelte";
    import { prefersReducedMotion } from "svelte/motion";

    import { AnimatedCircle } from "$lib/classes/animated-circle";
    import { getCircleData } from "$lib/data/circle-data";

    let { boundary }: { boundary: HTMLElement } = $props();

    let frameID: number;
    let animatedCircles: AnimatedCircle[] = [];

    const animate = () => {
        animatedCircles.forEach((circle) => circle.nextFrame());

        frameID = requestAnimationFrame(animate);

        if (prefersReducedMotion.current) {
          cancelAnimationFrame(frameID);
          return
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
            animatedCircles.push(
                new AnimatedCircle({
                    ...circle,
                    circleDomRef: boundary.appendChild(
                        document.createElement("div"),
                    ),
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
