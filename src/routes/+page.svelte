<script lang="ts">
    import EpubConverter from "$lib/components/app/epub-converter.svelte";
    import Landing from "$lib/components/landing/landing.svelte";

    import FeatureCard from "$lib/components/cards/feature-card.svelte";

    const features = [
        {
            icon: "",
            title: "Fully Customizable Reading",
            text: "Choose boldness, fonts, and punctuation to create a personalized reading experience.",
        },
        {
            icon: "",
            title: "Learning Difficulty Supportive",
            text: "Bionic reading tools enhance focus and simplify words for smoother reading.",
        },
        {
            icon: "",
            title: "Read Longer Without Fatigue",
            text: "Minimize effort with text designed to keep you reading comfortably for hours.",
        },
    ];
</script>

<div class="bg-green-200">
    <Landing />
    <div class="container px-2 text-center min-h-[200px] flex flex-col justify-center items-center bg-purple-200 rounded-xl ">
        <h2 class="text-4xl font-bold mb-2">
            Why Use Embolden
        </h2>
        <p class="text-md font-thin mb-8">
            Custom reading experience designed to improve readability with an
            effortless flow.
        </p>
    </div>

    <div class="py-10 container rounded-xl mx-4 -mt-8 bg-green-100 shadow-2xl">
        <div class="flex items-stretch justify-center">
            {#each features as feature}
                <div class="px-8 w-1/3">
                    <FeatureCard {...feature} />
                </div>
            {/each}
        </div>
    </div>
    <EpubConverter />
</div>
<!-- <WhyUS /> -->
