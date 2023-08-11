<script>
	import { buttonVariants } from './ui/button';
</script>

<header class="bg-white p-4 flex items-center justify-between border-b">
	<a href="/">
		<span class="font-inter font-bold text-2xl text-primary">todoit.</span>
	</a>
	{#if true}
		<a href="/sign-in" class={buttonVariants()}>Sign In</a>
	{:else}
		<img src="/avatar.jpg" alt="Avatar" class="h-9 w-9 rounded-full" />
	{/if}
</header>
