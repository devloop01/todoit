<script lang="ts">
	import { buttonVariants } from '$components/ui/button';
	import { Card, CardContent, CardHeader } from '$components/ui/card';
</script>

<svelte:head>
	<title>todoit. — make your todos</title>
</svelte:head>

<main class="mx-auto flex h-screen max-w-md items-center px-4">
	<Card class="w-full">
		<CardHeader class="flex-row items-center justify-between border-b py-3">
			<a href="/">
				<span class="font-inter text-2xl font-bold text-primary">todoit.</span>
			</a>
			<a href="/login" class={buttonVariants()}>Login</a>
		</CardHeader>
		<CardContent class="py-3">
			<p class="">A simple Todo Application</p>
		</CardContent>
	</Card>
</main>
