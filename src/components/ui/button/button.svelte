<script context="module" lang="ts">
	import { cva } from 'class-variance-authority';

	export const buttonVariants = cva(
		'inline-flex items-center justify-center rounded-md text-sm font-medium transition-all ease-cubic-out focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
		{
			variants: {
				variant: {
					default: 'bg-primary text-primary-foreground shadow hover:bg-primary/90',
					destructive:
						'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
					outline:
						'border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground',
					secondary: 'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
					ghost: 'hover:bg-accent hover:text-accent-foreground',
					link: 'text-primary underline-offset-4 hover:underline'
				},
				size: {
					default: 'h-9 px-4 py-2',
					sm: 'h-8 rounded-md px-3 text-xs',
					lg: 'h-10 rounded-md px-8',
					icon: 'h-9 w-9'
				}
			},
			defaultVariants: {
				variant: 'default',
				size: 'default'
			}
		}
	);
</script>

<script lang="ts">
	import type { VariantProps } from 'class-variance-authority';
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import { cn } from '$lib/utils';
	import { Spinner } from '$components/icons';
	import { scale } from 'svelte/transition';

	interface $$Props extends HTMLButtonAttributes {
		type?: HTMLButtonAttributes['type'];
		class?: string | null;
		variant?: VariantProps<typeof buttonVariants>['variant'];
		size?: VariantProps<typeof buttonVariants>['size'];
		loading?: boolean;
	}

	let className: string | undefined | null = undefined;
	export { className as class };
	export let type: HTMLButtonAttributes['type'] = undefined;
	export let variant: VariantProps<typeof buttonVariants>['variant'] = 'default';
	export let size: VariantProps<typeof buttonVariants>['size'] = 'default';
	export let loading: $$Props['loading'] = false;
	export let disabled: $$Props['disabled'] = false;
</script>

<button
	{type}
	class={cn(buttonVariants({ variant, size, className }))}
	disabled={loading || disabled}
	{...$$restProps}
	on:click
	on:change
	on:keydown
	on:keyup
	on:mouseenter
	on:mouseleave
>
	{#if loading}
		<div transition:scale={{ duration: 100, start: 1.5 }} class="absolute">
			<Spinner color="white" />
		</div>
	{/if}
	<div class={cn('ease-cubic-out transition-colors duration-100', loading && 'text-transparent')}>
		<slot />
	</div>
</button>
