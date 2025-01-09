<script lang="ts">
    let { icon, title, text } = $props();
</script>

<div
    class="flex h-full group hover:scale-105 transition-transform duration-800 rounded-md flex-col overflow-hidden"
>
    <div
        class="h-3 bg-gradient-to-r from-blue-400 via-pink-400 to-blue-400 transition-all duration-500 bg-[size:200%] bg-left group-hover:bg-right"
    ></div>
    <div
        class="flex bg-gray-50 grow flex-col px-4 py-14 gap-5 justify-start items-center"
    >
        <div class="icon">{icon}</div>
        <h3 class="text-center font-medium text-xl">{title}</h3>
        <p class="text-center text-gray-600 px-2">{text}</p>
    </div>
</div>
