<script lang="ts">
    import { Slider } from "$lib/components/ui/slider";
    import IPhone from "./iphone.png";

    let value = $state([400, 700]);
</script>

<div class="py-10 px-2 flex flex-col justify-center items-center">
    <div class="max-w-sm">
        <div class="grid px-2 max-h-[300px] md:px-14 overflow-hidden items-start justify-start">
            <img
                src={IPhone}
                alt="iphone with emboldened text inside"
                class="col-start-1 row-start-1"
            />
            <p
                style={`--interactive-text: ${value[0]}; --interactive-bold:${value[1]}`}
                class="font-lg text-balance px-6 col-start-1 row-start-1 pt-8 interactive-example"
            >
                <b>Lor</b>em <b>ips</b>um <b>dol</b>or <b>s</b>it <b>am</b>et,
                <b>consec</b>tetur <b>adipi</b>scing <b>el</b>it. <b>S</b>ed
                <b>tem</b>por
                <b>hend</b>rerit <b>lor</b>em <b>i</b>d <b>orn</b>are.
                <b>Cura</b>bitur <b>od</b>io <b>mau</b>ris, <b>feug</b>iat
                <b>i</b>d
                <b>od</b>io
                <b>vulp</b>utate, <b>elem</b>entum <b>venen</b>atis
                <b>lib</b>ero.
                <b>Se</b>d <b>od</b>io <b>es</b>t, <b>tinci</b>dunt <b>qu</b>is
                <b>tor</b>tor <b>inter</b>dum, <b>effic</b>itur <b>vulpu</b>tate
                <b>pu</b>rus. <b>Aliq</b>uam <b>s</b>it <b>am</b>et
                <b>fauc</b>ibus <b>ni</b>si. <b>Maec</b>enas <b>i</b>d
                <b>lao</b>reet <b>ni</b>sl. <b>Pelle</b>ntesque <b>habi</b>tant
                <b>mo</b>rbi
                <b>tris</b>tique <b>sen</b>ectus <b>e</b>t <b>ne</b>tus
                <b>e</b>t
                <b>male</b>suada <b>ua</b>mes <b>a</b>c <b>tur</b>pis
                <b>ege</b>stas.
                <b>Nu</b>nc <b>od</b>io <b>lib</b>ero, <b>sod</b>ales <b>i</b>d
                <b>vene</b>natis <b>ve</b>l, <b>conse</b>ctetur <b>tem</b>pus
                <b>es</b>t.
            </p>
        </div>
    </div>
    <div class="max-w-md w-full px-2 pt-4 ">
        <div class="w-full flex text-xl py-2 font-semibold justify-between">
            <p class="font-thin">Thinnest</p>
            <p class="font-semibold">Boldest</p>
        </div>
        <Slider
            class=""
            type="multiple"
            bind:value
            max={900}
            min={100}
            step={100}
        />
    </div>
</div>

<style>
    .interactive-example {
        font-weight: var(--interactive-text);
    }
    .interactive-example > b {
        font-weight: var(--interactive-bold);
    }
</style>
