<script>
	import { onMount } from 'svelte';
	import { theme } from '$lib/store';
	import { loadTheme, toggleTheme } from '$lib/utils/theme';
	import { isLoggedIn } from '$lib/utils/is';

	import { LogOutIcon, MoonIcon, SunIcon } from 'lucide-svelte';
	import { Button, buttonVariants } from '$components/ui';

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
		{#if $isLoggedIn}
			<form method="POST" action="/?/logout">
				<button type="submit" class={buttonVariants({ variant: 'ghost', size: 'icon' })}>
					<LogOutIcon size="16" />
				</button>
			</form>
		{:else}
			<a href="/login" class={buttonVariants()}>Login</a>
		{/if}
	</div>
</header>
