<script lang="ts">
    const { faqList } = $props();
    import * as Accordion from "$lib/components/ui/accordion";
</script>

<div class="flex justify-center items-center">
    <Accordion.Root type="single" class="max-w-[800px] w-full ">
        <h2 class="text-4xl py-5  font-bold">Frequently Asked Questions</h2>
        <p class="font-light pb-10 ">
            We're here to answer any and all of your Embolden related questions.
        </p>
        {#each faqList as faq}
            <Accordion.Item
                class="border-b-0 bg-secondary px-5 md:mb-4 mb-8 shadow-lg rounded-lg "
            >
                <Accordion.Trigger class="text-lg">
                    {faq.question}
                </Accordion.Trigger>
                <Accordion.Content>
                    {#each faq.contentList as content}
                        <p class="pt-4 text-md">
                            {content.text}
                        </p>
                    {/each}
                </Accordion.Content>
            </Accordion.Item>
        {/each}
    </Accordion.Root>
</div>
