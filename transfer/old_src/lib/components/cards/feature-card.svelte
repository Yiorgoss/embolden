<script lang="ts">
    let { icon, title, text } = $props();
</script>

<div
    class="flex h-full group hover:scale-105 transition-transform duration-800 rounded-md flex-col overflow-hidden"
>
    <div
        class="h-3 bg-gradient transition-all duration-500 bg-[size:200%] bg-left group-hover:bg-right"
    ></div>
    <div
        class="flex bg-white grow flex-col px-0 md:px-4 py-10 gap-5 justify-start items-center"
    >
        <div class=" object-cover overflow-hidden"><img class="h-auto w-[50px] object-cover" src={icon} alt=""/></div>
        <h3 class="text-center font-medium text-lg">{title}</h3>
        <p class="text-center text-primary/80 px-2">{text}</p>
    </div>
</div>
