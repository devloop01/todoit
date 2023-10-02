<script lang="ts">
	import { Button as ButtonPrimitive } from 'bits-ui';
	import { cn } from '$lib/utils';
	import { Spinner } from '$components/icons';
	import { scale } from 'svelte/transition';
	import { type Props, buttonVariants } from '.';

	type $$Props = Props;

	let className: $$Props['class'] = undefined;
	export { className as class };
	export let type: $$Props['type'] = undefined;
	export let variant: $$Props['variant'] = 'default';
	export let size: $$Props['size'] = 'default';
	export let loading: $$Props['loading'] = false;
	export let disabled: $$Props['disabled'] = false;
	export let builders: $$Props['builders'] = [];
</script>

<ButtonPrimitive.Root
	{builders}
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
	<div class={cn('transition-colors duration-100 ease-cubic-out', loading && 'text-transparent')}>
		<slot />
	</div>
</ButtonPrimitive.Root>
