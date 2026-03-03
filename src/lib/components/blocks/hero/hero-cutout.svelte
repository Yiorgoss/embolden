<script lang="ts">
	import { type IHeroCutout } from '@payload-types';

	import Picture from '@/components/common/picture.svelte';
	import Button from '@/components/common/button.svelte';
	import { RichTextRender } from '@/components/blocks/rich-text';
	import { fade } from 'svelte/transition';
	import { onMount, setContext } from 'svelte';
	import RenderForms from '@/components/blocks/forms/render-forms.svelte';
	import EmailOnlyForm from '@/components/blocks/forms/email-only-form.svelte';

	const { blockData, cb }: { blockData: IHeroCutout; cb?: () => void } = $props();
	const { image, richText, form } = $derived(blockData);

	onMount(() => {
		cb && cb();
	});
	// let element = $state() as HTMLElement;
	let CUT = { w: 37, h: 35, xInc: 3, yInc: 5 };

	let outerWidth = $state() as number;
	let offsetWidth = $state() as number;
	let offsetHeight = $state() as number;
</script>

<svelte:window bind:outerWidth />
<section id="block_hero_cutout">
	<div class="p-10 pt-(--header-height) lg:min-h-auto h-full lg:h-lvh w-full bg-background">
		<div class="h-full w-full">
			<div
				bind:offsetWidth
				bind:offsetHeight
				class="container overflow-hidden mx-auto grid grid-rows-[2] lg:grid-rows-1 grid-cols-1 lg:gap-0 gap-10 h-full w-full"
			>
				<div class="opacity-60 clip-img max-h-lvh h-full w-full col-start-1 row-start-1">
					<Picture {image} class=" rounded-md " />
				</div>
				<div
					style={`width:calc(100% - ${outerWidth > 1024 ? CUT.w * offsetWidth * 0.01 : '0'}px);`}
					class="h-full p-4 flex justify-center items-end col-start-1 row-start-1"
				>
					<RichTextRender {richText} />
				</div>
				<div
					class="relative col-start-1 row-start-2 lg:row-start-1 clip-cutout w-full mx-auto sm:w-3/4 md:w-1/2 lg:w-full"
				>
					<div
						style={`width:${outerWidth < 1024 ? 'auto' : `${offsetWidth * (CUT.w - CUT.xInc) * 0.01}px`};
										height:${outerWidth < 1024 ? 'auto' : `${offsetHeight * (CUT.h - CUT.yInc) * 0.01}px`};`}
						class="oveflow-hidden relative lg:absolute bottom-0 right-0 flex justify-center items-center"
					>
						<EmailOnlyForm {form} />
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="absolute">
		<svg>
			<defs>
				<clipPath id="imgClipPath" clipPathUnits="objectBoundingBox" transform="scale(0.01, 0.01)">
					<path
						d={`M
							${100 - CUT.w - CUT.xInc} 100                       A ${CUT.xInc},${CUT.yInc} 0,0,0
							${100 - CUT.w}            ${100 - CUT.yInc}         L
							${100 - CUT.w}            ${100 - CUT.h + CUT.yInc} A ${CUT.xInc},${CUT.yInc} 0,0,1
							${100 - CUT.w + CUT.xInc} ${100 - CUT.h}            L
							${100 - CUT.xInc}         ${100 - CUT.h}            A ${CUT.xInc},${CUT.yInc} 0,0,0
							100                       ${100 - CUT.h - CUT.yInc} L
							100                       ${CUT.yInc}               A ${CUT.xInc},${CUT.yInc} 0,0,0
							${100 - CUT.xInc}         0                         L
						  ${CUT.xInc}               0                         A ${CUT.xInc},${CUT.yInc} 0,0,0
							0                         ${CUT.yInc}               L
						  0                         ${100 - CUT.yInc}         A ${CUT.xInc},${CUT.yInc} 0,0,0
							${CUT.xInc}               100                       Z`}
					/>
				</clipPath>
			</defs>
		</svg>
		<svg>
			<defs>
				<clipPath
					id="cutoutClipPath"
					clipPathUnits="objectBoundingBox"
					transform="scale(0.01, 0.01)"
				>
					<path
						fill="#FFFFFF"
						stroke="black"
						d={`M	
						${100 - CUT.w + 2 * CUT.xInc} 100                           A ${CUT.xInc},${CUT.yInc} 0,0,1 
						${100 - CUT.w + CUT.xInc}     ${100 - CUT.yInc}             L
						${100 - CUT.w + CUT.xInc}     ${100 - CUT.h + 2 * CUT.yInc} A ${CUT.xInc},${CUT.yInc} 0,0,1 
						${100 - CUT.w + 2 * CUT.xInc} ${100 - CUT.h + CUT.yInc}     L
						${100 - CUT.xInc}             ${100 - CUT.h + CUT.yInc}     A ${CUT.xInc},${CUT.yInc} 0,0,1
						100                           ${100 - CUT.h + 2 * CUT.yInc} L
						100                           ${100 - CUT.yInc}             A ${CUT.xInc},${CUT.yInc} 0,0,1
						${100 - CUT.xInc}             100 Z
						`}
					/>
				</clipPath>
			</defs>
		</svg>
	</div>
</section>

<style>
	@media (width >= 1024px) {
		/*same as tailwind lg*/

		.clip-img {
			-webkit-clip-path: url(#svgPath);
			clip-path: url(#imgClipPath);
		}
		.clip-cutout {
			-webkit-clip-path: url(#svgPath);
			clip-path: url(#cutoutClipPath);
		}
	}
</style>
