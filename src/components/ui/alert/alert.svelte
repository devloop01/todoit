<script lang="ts">
	import { cn } from '$lib/utils';
	import type { HTMLAttributes } from 'svelte/elements';
	import { alertVariants, type Variant } from '.';
	import { Button } from '$components/ui/button';
	import { XIcon } from 'lucide-svelte';
	import { fade } from 'svelte/transition';

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

<div in:fade={{ duration: 100 }}>
	{#if open}
		<div
			class={cn(alertVariants({ variant, className }), dismissable && 'pr-8')}
			{...$$restProps}
			role="alert"
			out:fade={{ duration: 100 }}
		>
			<slot />
			{#if dismissable}
				<Button
					type="button"
					variant="ghost"
					size="icon"
					class="absolute right-2 top-1/2 -translate-y-1/2 sq-6 hover:bg-foreground/10 hover:text-inherit"
					on:click={close}
				>
					<XIcon class="sq-4" />
				</Button>
			{/if}
		</div>
	{/if}
</div>
