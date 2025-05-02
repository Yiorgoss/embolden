<script lang="ts">
  import Picture from "@/components/common/picture.svelte";
  import { type Image } from "@payload-types";

  const { blockData }: { blockData: Image } = $props();

</script>

<div id="image-block" class="">
  <Picture class="h-[300px] md:h-full  max-h-[500px] rounded-none md:rounded-theme" data={blockData.image}/>
</div>
