<script context="module" lang="ts">
	export const inputVariants = cva(
		[
			'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
			'data-[error="true"]:border-destructive data-[error="true"]:placeholder:text-destructive data-[error="true"]:focus-visible:ring-destructive'
		],
		{
			variants: {
				variant: {
					default: ''
				}
			},
			defaultVariants: {
				variant: 'default'
			}
		}
	);
</script>

<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';
	import { cn } from '$lib/utils';
	import { cva } from 'class-variance-authority';

	type $$Props = HTMLInputAttributes & {
		value?: string;
		class?: string;
		error?: boolean;
	};

	export let value: $$Props['value'] = undefined;
	export let error: $$Props['error'] = undefined;
	let className: $$Props['class'] = undefined;
	export { className as class };
</script>

<input
	class={cn(inputVariants({ className }))}
	data-error={error}
	aria-invalid={error}
	bind:value
	on:blur
	on:change
	on:click
	on:focus
	on:keydown
	on:keypress
	on:keyup
	on:mouseover
	on:mouseenter
	on:mouseleave
	on:paste
	on:input
	{...$$restProps}
/>
