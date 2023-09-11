<script>
	import Header from '$components/header.svelte';
</script>

<div class="mx-auto max-w-screen-md bg-background">
	<div class="relative flex h-screen flex-col">
		<Header />

		<slot />
	</div>
</div>
