<script lang="ts">
	const { data }: { data: any } = $props();
</script>

<svg>
	<defs>
		<clipPath
			id={data.id ?? 'cutoutSmall'}
			clipPathUnits="objectBoundingBox"
			transform="scale(0.01, 0.01)"
		>
			<path
				fill="#FFFFFF"
				stroke="black"
				d={`M	
						${100 - data.w + 2 * data.xInc} 100                             A ${data.xInc},${data.yInc} 0,0,1 
						${100 - data.w + data.xInc}     ${100 - data.yInc}              L
						${100 - data.w + data.xInc}     ${100 - data.h + 2 * data.yInc} A ${data.xInc},${data.yInc} 0,0,1 
						${100 - data.w + 2 * data.xInc} ${100 - data.h + data.yInc}     L
						${100 - data.xInc}              ${100 - data.h + data.yInc}     A ${data.xInc},${data.yInc} 0,0,1
						100                             ${100 - data.h + 2 * data.yInc} L
						100                             ${100 - data.yInc}              A ${data.xInc},${data.yInc} 0,0,1
						${100 - data.xInc}              100                             Z
						`}
			/>
		</clipPath>
	</defs>
</svg>
