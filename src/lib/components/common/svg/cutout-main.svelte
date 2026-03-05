<script lang="ts">
	const { data }: { data: any } = $props();
</script>

<svg>
	<defs>
		<clipPath
			id={data.id ?? 'cutoutMain'}
			clipPathUnits="objectBoundingBox"
			transform="scale(0.01, 0.01)"
		>
			<path
				d={`M
							${100 - data.w - data.xInc} 100                         A ${data.xInc},${data.yInc} 0,0,0
							${100 - data.w}             ${100 - data.yInc}          L
							${100 - data.w}             ${100 - data.h + data.yInc} A ${data.xInc},${data.yInc} 0,0,1
							${100 - data.w + data.xInc} ${100 - data.h}             L
							${100 - data.xInc}          ${100 - data.h}             A ${data.xInc},${data.yInc} 0,0,0
							100                         ${100 - data.h - data.yInc} L
							100                         ${data.yInc}                A ${data.xInc},${data.yInc} 0,0,0
							${100 - data.xInc}          0                           L
						  ${data.xInc}                0                           A ${data.xInc},${data.yInc} 0,0,0
							0                           ${data.yInc}                L
						  0                           ${100 - data.yInc}          A ${data.xInc},${data.yInc} 0,0,0
							${data.xInc}                100                         Z`}
			/>
		</clipPath>
	</defs>
</svg>
