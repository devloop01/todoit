<script>
	import Header from '$components/header.svelte';
</script>

<div class="mx-auto max-w-screen-md bg-gray-50">
	<div class="relative flex h-screen flex-col flex-wrap justify-between">
		<Header />

		<slot />
	</div>
</div>
