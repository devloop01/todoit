<script>
	import { buttonVariants } from './ui/button';
</script>

<header class="flex items-center justify-between border-b p-4">
	<a href="/">
		<span class="font-inter text-2xl font-bold text-primary">todoit.</span>
	</a>
	{#if true}
		<a href="/sign-in" class={buttonVariants()}>Sign In</a>
	{:else}
		<img src="/avatar.jpg" alt="Avatar" class="h-9 w-9 rounded-full" />
	{/if}
</header>
