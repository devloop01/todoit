<script lang="ts">
	import { EyeIcon, EyeOffIcon } from 'lucide-svelte';

	import { Button } from '../button';
	import { Input } from '../input';

	let show = false;
</script>

<div class="relative flex items-center">
	<Input {...$$restProps} type={show ? 'text' : 'password'} class="pr-8" />
	<Button
		type="button"
		size="icon"
		variant="ghost"
		class="absolute right-0"
		on:click={() => (show = !show)}
	>
		{#if show}
			<EyeIcon class="w-5 h-5" />
		{:else}
			<EyeOffIcon class="w-5 h-5" />
		{/if}
	</Button>
</div>
