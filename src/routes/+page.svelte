<script lang="ts">
    import FeatureCard from "$lib/components/cards/feature-card.svelte";
    import FAQ from "$lib/components/faq.svelte";
    import WhoAreWe from "$lib/components/who-are-we.svelte";
    import faqList from "$lib/assets/data/faq-list";
    import featureList from "$lib/assets/data/feature-list";
    import { Button } from "$lib/components/ui/button";
    import MovingCircle from "$lib/components/landing/moving-circle.svelte";
    import InteractiveExample from "$lib/components/interactive-text/interactive-example.svelte";

    let boundary: HTMLElement;
</script>

<div class="overflow-hidden">
    <!-- <Landing {boundary}/> -->
    <div class="grid w-full h-lvh">
        <div
            bind:this={boundary}
            class="-z-10 relative col-start-1 row-start-1"
        >
            <MovingCircle {boundary} />
        </div>
        <div
            class="max-w-full md:container col-start-1 row-start-1 flex justify-center items-center h-lvh"
        >
            <div
                class="bg-white/20 flex justify-center flex-col items-center backdrop-blur-sm shadow-2xl rounded-lg py-16 w-full mb-12 mx-0 md:mx-4"
            >
                <h2 class="text-center text-5xl font-bold pb-8">
                    Effortless Reading With Embolden
                </h2>
                <p class="text-lg py-2 text-center font-light mb-8">
                    Upload your book, customize your font, and read with ease.
                </p>
                <Button href="/app" size="lg" variant="default">
                    Try It Now
                </Button>
            </div>
        </div>
    </div>
    <div class="container px-0 md:px-10 pb-20">
        <div class="grid grid-cols-1 md:grid-cols-3 pl-0 md:pl-10">
            <div
                class="justify-center flex px-2 md:px-10 col-span-2 py-10 flex-col items-start"
            >
                <div class="">
                    <div class="font-semibold text-secondary-foreground">
                        Your reading, reimagined.
                    </div>
                    <div class="font-semibold text-3xl">What is Embolden?</div>
                </div>
                <div class="py-10 max-w-prose">
                    With Embolden, you have the power to personalize every
                    aspect of your reading material. Embolden allows you to
                    enhance your focus and comprehension. By bolding the start
                    of words, it guides your eyes naturally through the text,
                    making reading faster, easier and more enjoyable.
                </div>
                <Button href="/app" size="lg" variant="default">
                    Get Started
                </Button>
            </div>
            <InteractiveExample />
        </div>
    </div>
    <div class="">
        <div class=" px-2 pb-[100px] pt-10 text-center bg-purple-200">
            <h2 class="text-4xl font-bold">Why Use Embolden</h2>
            <p class="text-lg font-light pt-1">
                Custom reading experience designed to improve readability with
                an effortless flow.
            </p>
        </div>
        <div
            class="-mt-[80px] row-start-2 col-start-1 row-span-4 py-10 h-full shadow-2xl backdrop-blur-sm bg-white/20 w-11/12 container rounded-xl"
        >
            <div
                class="flex flex-col md:flex-row flex-wrap items-stretch justify-center"
            >
                {#each featureList as feature}
                    <div
                        class="px-0 md:px-2 lg:px-6 py-6 md:py-0 max-w-sm mx-auto w-full md:w-1/3"
                    >
                        <FeatureCard {...feature} />
                    </div>
                {/each}
            </div>
        </div>
    </div>
    <div class="container p-0 md:p-10 max-w-5xl">
        <div
            class="justify-center flex gap-10 px-2 md:px-10 col-span-2 py-10 flex-col items-start"
        >
            <div class="">
                <div class="font-semibold text-secondary-foreground">
                    Your reading, reimagined.
                </div>
                <div class="font-semibold text-3xl">What is Embolden?</div>
            </div>
            <div class=" max-w-prose">
                With Embolden, you have the power to personalize every aspect of
                your reading material Through the use of bionic reading
                principles, Embolden allows you to enhance your focus and
                comprehension. By bolding key parts of words, it guides your
                eyes naturally through the text, making reading faster, easier
                and more enjoyable.
            </div>
            <Button href="/app" size="lg" variant="default">Get Started</Button>
        </div>
    </div>
    <div class="py-10">
        <WhoAreWe />
    </div>
    <div class="py-10 container">
        <FAQ {faqList} />
    </div>
    <div class="flex flex-col pb-10 justify-center items-center">
        <h3 class="text-3xl text-balance py-5 font-medium">
            Need a question answered that isn't covered here?
        </h3>
        <p class="text-balance">
            Contact us at
            <a
                class="underline underline-offset-4"
                href="mailto:embolden@calisto.studio"
            >
                embolden@calisto.studio
            </a> or write to us on our feedback form listed on our business website.
        </p>
    </div>
</div>
