<script>
	import { onMount } from 'svelte';
	import { currentUser, theme } from '$lib/store';
	import { loadTheme, toggleTheme } from '$lib/utils';

	import { MoonIcon, SunIcon } from 'lucide-svelte';
	import { buttonVariants } from './ui/button';
	import { Button } from './ui/button';

	onMount(() => {
		loadTheme();
	});
</script>

<header class="flex items-center justify-between border-b p-4">
	<a href="/">
		<span class="font-inter text-2xl font-bold text-primary">todoit.</span>
	</a>
	<div class="flex gap-2">
		<Button variant="ghost" size="icon" on:click={toggleTheme}>
			{#if $theme === 'light'}
				<SunIcon size="16" class="fill-black" />
			{:else}
				<MoonIcon size="16" class="fill-white" />
			{/if}
		</Button>
		{#if $currentUser === null}
			<a href="/login" class={buttonVariants()}>Login</a>
		{:else}
			<form method="POST" action="?/logout">
				<button type="submit" class={buttonVariants({ variant: 'destructive' })}>Logout</button>
			</form>
		{/if}
	</div>
</header>
