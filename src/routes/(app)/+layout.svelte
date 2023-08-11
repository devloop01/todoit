<script>
	import Header from '$components/header.svelte';
</script>

<div class="max-w-screen-md mx-auto bg-gray-50">
	<div class="relative h-screen flex flex-col justify-between flex-wrap">
		<Header />

		<slot />
	</div>
</div>
