<script lang="ts" context="module">
	import { cva } from 'class-variance-authority';

	export const labelVariants = cva(
		'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 data-[disabled="true"]:cursor-not-allowed data-[disabled="true"]:opacity-70'
	);
</script>

<script lang="ts">
	import { cn } from '$lib/utils';
	import { createLabel, melt } from '@melt-ui/svelte';
	import type { HTMLLabelAttributes } from 'svelte/elements';

	interface $$Props extends HTMLLabelAttributes {
		disabled?: boolean;
	}

	let className: $$Props['class'] = undefined;
	export { className as class };
	export let disabled: $$Props['disabled'] = undefined;

	const {
		elements: { root }
	} = createLabel();
</script>

<label
	class={cn(labelVariants(), className)}
	data-disabled={disabled}
	aria-disabled={disabled}
	use:melt={$root}
	{...$$restProps}
>
	<slot />
</label>
