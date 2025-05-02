<script lang="ts">
  import Icon from "@/components/common/icon.svelte";
  import { type IAccordion } from "@payload-types";
  import { Accordion } from "bits-ui";
  import { RichTextRender } from "@/components/blocks/rich-text";
  import Button from "@/components/ui/button/button.svelte";

  const { blockData }: { blockData: IAccordion } = $props();

  const { list: maybeNoList, link, icon } = blockData;
  const list = maybeNoList ?? [];
</script>

<section class="">
  <Accordion.Root class="w-full max-w-full sm:max-w-[70%]" type="multiple">
    {#each list as item, i}
      <Accordion.Item
        value={`acc-item-${i}`}
        class="group border-b border-dark-10 px-1.5"
      >
        <Accordion.Header>
          <Accordion.Trigger
            class="flex w-full flex-1 select-none items-center justify-between py-5 [&[data-state=open]>span>svg]:rotate-180 transition-all duration-200"
          >
            <div class="w-full text-left font-serif px-2 text-2xl">
              <span class="pr-4">{i+1}.</span>
              <span class="">
                {item.title}
              </span>
            </div>
            <span
              class="inline-flex size-8 items-center justify-center rounded-[7px] bg-ransparent hover:bg-dark-10"
            >
              <Icon {icon} class="transition-all duration-200"/>
            </span>
          </Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content
          class="overflow-hidden text-sm tracking-[-0.01em] data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
        >
          <div class="pb-[25px]">
            <RichTextRender richText={item.richText} />
          </div>
        </Accordion.Content>
      </Accordion.Item>
    {/each}
  </Accordion.Root>
  <Button cmsData={link} />
</section>
