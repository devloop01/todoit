<script lang="ts">
	import { cn } from '$lib/utils';
	import type { HTMLAttributes } from 'svelte/elements';
	import { alertVariants, type Variant } from '.';
	import { Button } from '$components/ui/button';
	import { XIcon } from 'lucide-svelte';

	type $$Props = HTMLAttributes<HTMLDivElement> & {
		variant?: Variant;
		dismissable?: boolean;
	};

	let className: $$Props['class'] = undefined;
	export { className as class };
	export let variant: $$Props['variant'] = 'default';
	export let dismissable: $$Props['dismissable'] = false;

	let open = true;

	function close(e: MouseEvent) {
		e.stopPropagation();
		open = false;
	}
</script>

{#if open}
	<div
		class={cn(alertVariants({ variant, className }), dismissable && 'pr-8')}
		{...$$restProps}
		role="alert"
	>
		<slot />
		{#if dismissable}
			<Button
				type="button"
				variant="ghost"
				size="icon"
				class="square-6 absolute right-2 top-1/2 -translate-y-1/2 hover:bg-foreground/10 hover:text-inherit"
				on:click={close}
			>
				<XIcon class="square-4" />
			</Button>
		{/if}
	</div>
{/if}
