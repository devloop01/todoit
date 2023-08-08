<script lang="ts" context="module">
	type MouseDownEvent = MouseEvent & {
		currentTarget: EventTarget & HTMLLabelElement;
	};
	export type LabelRootProps = {
		onMouseDown?: (event: MouseDownEvent) => void;
		ref?: HTMLLabelElement | undefined;
	};
</script>

<script lang="ts">
	export let onMouseDown: LabelRootProps['onMouseDown'] = undefined;
	export let ref: LabelRootProps['ref'] = undefined;
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<label
	{...$$restProps}
	on:mousedown={(event) => {
		onMouseDown?.(event);
		// prevent text selection when double clicking label
		if (!event.defaultPrevented && event.detail > 1) {
			event.preventDefault();
		}
	}}
	bind:this={ref}
>
	<slot />
</label>
