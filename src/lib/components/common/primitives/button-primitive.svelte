<script lang="ts">
	import { Button } from '@/components/ui/button';
	import { type IButton } from '@payload-types';
	const { variant, text, href }: { variant: string; text: string; href: string } = $props();
</script>

<Button {variant} {href}>
	{text}
</Button>
