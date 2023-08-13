<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';

	import { EyeIcon, EyeOffIcon } from 'lucide-svelte';

	import { Button } from '../button';
	import { Input } from '../input';

	let show = false;
	export let value: HTMLInputAttributes['value'] = undefined;
</script>

<div class="relative flex items-center">
	<Input
		class="pr-8"
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
		type={show ? 'text' : 'password'}
	/>
	<Button
		type="button"
		size="icon"
		variant="ghost"
		class="absolute right-0"
		on:click={() => (show = !show)}
	>
		{#if show}
			<EyeIcon class="h-4 w-4" />
		{:else}
			<EyeOffIcon class="h-4 w-4" />
		{/if}
	</Button>
</div>
