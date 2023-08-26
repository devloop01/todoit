<script>
	import { currentUser } from '$lib/store';
	import { buttonVariants } from './ui/button';
</script>

<header class="flex items-center justify-between border-b p-4">
	<a href="/">
		<span class="font-inter text-2xl font-bold text-primary">todoit.</span>
	</a>
	{#if $currentUser === null}
		<a href="/sign-in" class={buttonVariants()}>Sign In</a>
	{:else}
		<form method="POST" action="?/logout">
			<button type="submit" class={buttonVariants({ variant: 'destructive' })}>Sign Out</button>
		</form>
	{/if}
</header>
