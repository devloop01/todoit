<script lang="ts">
	import { onMount } from 'svelte';
	import { theme } from '$lib/store';
	import { loadTheme, toggleTheme } from '$lib/utils/theme';
	import { isLoggedIn } from '$lib/utils/is';

	import { MoonIcon, SunIcon, LogOut, Settings, User, MoreVerticalIcon } from 'lucide-svelte';
	import { Button, DropdownMenu, buttonVariants } from '$components/ui';
	import { enhance } from '$app/forms';
	import { melt } from '@melt-ui/svelte';

	onMount(() => {
		loadTheme();
	});

	let logoutFormEl: HTMLFormElement;
</script>

<header class="flex items-center justify-between border-b p-4">
	<a href="/">
		<span class="font-inter text-2xl font-bold text-primary">todoit.</span>
	</a>
	<div class="flex gap-2">
		<Button variant="outline" size="icon" on:click={toggleTheme}>
			{#if $theme === 'light'}
				<SunIcon size="16" class="fill-black" />
			{:else}
				<MoonIcon size="16" class="fill-white" />
			{/if}
		</Button>

		{#if $isLoggedIn}
			<DropdownMenu.Root>
				<DropdownMenu.Trigger asChild let:builder>
					<button
						use:melt={builder}
						class={buttonVariants({
							variant: 'outline',
							size: 'icon',
							class: 'data-[state="open"]:bg-accent'
						})}
					>
						<MoreVerticalIcon size="16" />
					</button>
				</DropdownMenu.Trigger>

				<DropdownMenu.Content class="w-56">
					<DropdownMenu.Label>Account</DropdownMenu.Label>
					<DropdownMenu.Group>
						<DropdownMenu.Item>
							<User class="mr-2 h-4 w-4" />
							<span>Profile</span>
						</DropdownMenu.Item>
						<DropdownMenu.Item>
							<Settings class="mr-2 h-4 w-4" />
							<span>Settings</span>
						</DropdownMenu.Item>
					</DropdownMenu.Group>

					<DropdownMenu.Separator />

					<form method="POST" action="/?/logout" use:enhance bind:this={logoutFormEl}>
						<DropdownMenu.Item on:click={() => logoutFormEl.requestSubmit()}>
							<LogOut class="mr-2 h-4 w-4" />
							<span>Log out</span>
						</DropdownMenu.Item>
					</form>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		{:else}
			<a href="/login" class={buttonVariants()}>Login</a>
		{/if}
	</div>
</header>
