<script context="module" lang="ts">
	import { cva } from 'class-variance-authority';

	export type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4';

	export const headingVariants = cva('', {
		variants: {
			variant: {
				h1: 'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
				h2: 'scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0',
				h3: 'scroll-m-20 text-2xl font-semibold tracking-tight',
				h4: 'scroll-m-20 text-xl font-semibold tracking-tight'
			}
		},
		defaultVariants: {
			variant: 'h1'
		}
	});
</script>

<script lang="ts">
	import { cn } from '$lib/utils';
	import type { HTMLAttributes } from 'svelte/elements';

	type $$Props = HTMLAttributes<HTMLHeadingElement> & {
		level?: HeadingLevel;
	};

	let className: string | undefined | null = undefined;
	export { className as class };

	export let level: $$Props['level'] = 'h1';
</script>

<svelte:element
	this={level}
	class={cn(headingVariants({ variant: level, className }))}
	{...$$restProps}
>
	<slot />
</svelte:element>
