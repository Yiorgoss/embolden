<script lang="ts">
    let { children } = $props();
</script>

<div class="frame-base">
    <div class="frame-base-light"></div>
    <div class="side-button mute"></div>
    <div class="side-button volume-up"></div>
    <div class="side-button volume-down"></div>
    <div class="side-button hold"></div>
    <div class="stripe top"></div>
    <div class="stripe bottom"></div>
    <div class="port"></div>
    <div class="layer2">
        <div class="layer2-light"></div>
        <div class="layer2-light light-right"></div>
        <div class="screen">
            <div id="background" class="flex justify-center items-center px-2" >{@render children?.()}</div>
            <div class="mask">
                <div class="left-pie"></div>
                <div class="right-pie"></div>
                <div class="speaker"></div>
                <div class="camera">
                    <div class="lenz left"></div>
                    <div class="lenz right"></div>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    .frame-base {
        display: block;
        width: 319.6px;
        height: 664.4px;
        background: white;
        margin-left: 50%;
        margin-top: 50%;
        transform: translate(-50%, -50%);
        border-radius: 48.6px;
        -moz-box-shadow: inset 0 0 12px #494949;
        -webkit-box-shadow: inset 0 0 12px #494949;
        box-shadow: inset 2px 0 12px #494949;
    }

    .layer2 {
        width: 306.6px;
        height: 651.4px;
        background: black;
        margin-left: 50%;
        margin-top: 50%;
        transform: translate(-50%, 6.5px);
        border-radius: 44.6px;
        -moz-box-shadow: 0px 0px 15px 1.5px #494949;
        -webkit-box-shadow: 0px 0px 15px 1.5px #494949;
        box-shadow: -2px 0px 15px 1.5px #494949;
        border: 1px 2px solid black;
    }

    .stripe {
        position: absolute;
        background: white;
        width: 100%;
        height: 4px;
    }

    .top {
        top: 10%;
    }

    .bottom {
        bottom: 10%;
    }

    .side-button {
        position: absolute;
        /* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#000000+0,e5e5e5+7,ffffff+50,ffffff+93,000000+100 */
        background: #000000; /* Old browsers */
        background: -moz-linear-gradient(
            top,
            #494949 0%,
            #aaaaaa 12%,
            #dddddd 50%,
            #aaaaaa 88%,
            #494949 100%
        ); /* FF3.6-15 */
        background: -webkit-linear-gradient(
            top,
            #494949 0%,
            #aaaaaa 12%,
            #dddddd 50%,
            #aaaaaa 88%,
            #494949 100%
        ); /* Chrome10-25,Safari5.1-6 */
        background: linear-gradient(
            to bottom,
            #494949 0%,
            #aaaaaa 12%,
            #dddddd 50%,
            #aaaaaa 88%,
            #494949 100%
        ); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
        filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#000000', endColorstr='#000000',GradientType=0 ); /* IE6-9 */
        width: 3px;
    }

    .mute {
        height: 25px;
        top: 75px;
        left: -1px;
        border-radius: 1.5px 0 0 1.5px;
    }

    .volume-up {
        height: 50px;
        top: 125px;
        left: -1px;
        border-radius: 1.5px 0 0 1.5px;
    }

    .volume-down {
        height: 50px;
        top: 190px;
        left: -1px;
        border-radius: 1.5px 0 0 1.5px;
    }

    .hold {
        height: 75px;
        top: 145px;
        left: 99.5%;
        border-radius: 0px 1.5px 1.5px 0px;
    }

    .port {
        position: absolute;
        background: white;
        width: 30px;
        height: 2px;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        border-radius: 50% 50% 0 0;
    }

    .screen {
        background: white;
        width: 286.6px;
        height: 631.4px;
        margin-left: 50%;
        margin-top: 50%;
        transform: translate(-50%, 9px);
        border-radius: 38.6px;
    }

    #background {
        border-radius: 38.6px;
        position: absolute;
        object-fit: cover;
        top: -1px;
        width: 100%;
        height: 100.5%;
        filter: brightness(80%);
    }

    #logo {
        position: absolute;
        width: 60px;
        height: 60px;
        margin-top: 100%;
        margin-left: 50%;
        transform: translate(-50%, -50%);
    }

    .mask {
        background: black;
        width: 160px;
        height: 25px;
        margin-left: 50%;
        transform: translate(-50%, -1px);
        border-radius: 0% 0% 20px 20px;
    }

    .left-pie {
        position: absolute;
        overflow: hidden;
        height: 8px;
        width: 8px;
        left: -8px;
        transform: rotate(90deg);
    }

    .left-pie::after {
        content: " ";
        position: absolute;
        left: 0%;
        top: 0%;
        box-shadow: 0 0 0 8px black;
        height: 200%;
        width: 200%;
        border-radius: 50%;
    }

    .right-pie {
        position: absolute;
        overflow: hidden;
        height: 8px;
        width: 8px;
        right: -8px;
        transform: rotate(0deg);
    }

    .right-pie::after {
        content: " ";
        position: absolute;
        left: 0%;
        top: 0%;
        box-shadow: 0 0 0 8px black;
        height: 200%;
        width: 200%;
        border-radius: 50%;
    }

    .speaker {
        position: absolute;
        height: 4px;
        width: 35px;
        background: #222222;
        margin-top: 5px;
        margin-left: 50%;
        transform: translateX(-50%);
        border-radius: 10px;
    }

    .camera {
        position: absolute;
        height: 8px;
        width: 8px;
        background: #222222;
        margin-top: 3px;
        margin-left: 70%;
        transform: translateX(-50%);
        border-radius: 10px;
    }

    .lenz {
        position: absolute;
        background: blue;
        -moz-box-shadow: inset 0 0 2px #0d1a53;
        -webkit-box-shadow: inset 0 0 2px #0d1a53;
        box-shadow: inset 0px 0 2px #0d1a53;
        border-radius: 8px;
    }

    .left {
        filter: brightness(70%);
        width: 4px;
        height: 4px;
        margin: 1px 2px 0 0;
    }

    .right {
        filter: brightness(50%);
        width: 5px;
        height: 5px;
        left: 2px;
        top: 1px;
    }

    .frame-base-light {
        position: absolute;
        width: 0px;
        height: 75.5%;
        border-radius: 48.6px;
        border: 157.4px solid white;
        border-top: 0px;
        top: 2px;
        margin-left: 2px;
    }

    .frame-base-light::after {
        position: absolute;
        content: " ";
        opacity: 0.5;
        width: 0px;
        height: 97.2px;
        border-radius: 50px;
        filter: blur(1px);
        border: 155.4px solid black;
        border-top: 0px;
        top: 2px;
        left: 0;
        transform: translateX(-50%);
    }

    .layer2-light {
        position: absolute;
        width: 0px;
        height: 601.4px;
        border-radius: 50px;
        opacity: 0.5;
        filter: blur(2px);
        border: 44.6px solid white;
        border-top: 0px;
        top: 2px;
        margin-left: 4px;
    }

    .layer2-light::after {
        position: absolute;
        content: " ";
        width: 0px;
        height: 601.4px;
        border-radius: 50px;
        border: 44.6px solid black;
        border-top: 0px;
        top: 2px;
        margin-left: -40px;
        z-index: 2;
    }

    .light-right {
        left: 100%;
        transform: rotate(180deg) translateX(96.2px);
    }
</style>
