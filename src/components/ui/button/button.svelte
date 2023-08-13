<script lang="ts">
	import type { VariantProps } from "class-variance-authority";
	import type { HTMLButtonAttributes } from "svelte/elements";
	import { cn } from "$lib/utils";

	import { buttonVariants } from ".";

	let className: string | undefined | null = undefined;
	export { className as class };
	export let type: HTMLButtonAttributes["type"] = undefined;
	export let variant: VariantProps<typeof buttonVariants>["variant"] = "default";
	export let size: VariantProps<typeof buttonVariants>["size"] = "default";

	type Props = {
		class?: string | null;
		variant?: VariantProps<typeof buttonVariants>["variant"];
		size?: VariantProps<typeof buttonVariants>["size"];
	};

	interface ButtonElement extends Props, HTMLButtonAttributes {
		type?: HTMLButtonAttributes["type"];
	}

	type $$Props = ButtonElement;
</script>

<button
	{type}
	class={cn(buttonVariants({ variant, size, className }))}
	{...$$restProps}
	on:click
	on:change
	on:keydown
	on:keyup
	on:mouseenter
	on:mouseleave
>
	<slot />
</button>
