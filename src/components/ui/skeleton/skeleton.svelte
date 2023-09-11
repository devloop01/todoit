<script lang="ts">
	import { cn } from '$lib/utils';

	let className: string | undefined = undefined;
	export { className as class };
	export let visible: boolean = false;
</script>

{#if visible}
	<slot />
{:else}
	<div
		class={cn(
			'relative overflow-hidden rounded-md',
			'before:absolute before:inset-0 before:z-10 before:bg-background',
			'after:absolute after:inset-0 after:z-20 after:animate-pulse after:bg-foreground/10',
			className
		)}
		{...$$restProps}
	>
		<slot />
	</div>
{/if}
