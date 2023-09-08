<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';

	import { generateId } from '$lib/utils/id';

	import { EyeIcon, EyeOffIcon } from 'lucide-svelte';
	import { Button } from '$components/ui/button';
	import { Input } from '$components/ui/input';
	import { Label } from '$components/ui/label';

	let reveal = false;

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
	<div class="relative flex items-center">
		<Input
			class="pr-8"
			bind:value
			{id}
			error={!!error}
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
			type={reveal ? 'text' : 'password'}
		/>
		<Button
			type="button"
			size="icon"
			variant="ghost"
			class="absolute right-1 h-7 w-7 hover:bg-foreground/5 active:scale-95"
			tabindex={-1}
			disabled={$$restProps.disabled}
			on:click={() => (reveal = !reveal)}
		>
			{#if reveal}
				<EyeIcon class="h-4 w-4" />
			{:else}
				<EyeOffIcon class="h-4 w-4" />
			{/if}
		</Button>
	</div>
	{#if error}
		<small class="text-xs text-destructive">{error}</small>
	{/if}
</div>
