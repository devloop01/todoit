<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';

	import { generateId } from '$lib/utils/id';

	import { Input } from '$components/ui/input';
	import { Label } from '$components/ui/label';

	interface $$Props extends HTMLInputAttributes {
		value?: string;
		error?: string;
		label?: string;
	}

	export let value: $$Props['value'] = undefined;
	export let label: $$Props['label'] = undefined;
	export let error: $$Props['error'] = undefined;
	export let id: $$Props['id'] = undefined;

	if (!id) id = generateId();
</script>

<div class="space-y-1">
	{#if label}
		<Label disabled={$$restProps.disabled} for={id}>{label}</Label>
	{/if}
	<Input
		bind:value
		{id}
		error={!!error}
		type="text"
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
	{#if error}
		<small class="text-xs text-destructive">{error}</small>
	{/if}
</div>
