<script lang="ts">
</script>

<div class="flex h-screen flex-col">
	<header class="border-b bg-white p-4">
		<a href="/">
			<span class="font-inter text-2xl font-bold">todoit.</span>
		</a>
	</header>

	<div class="flex flex-1 flex-col justify-center px-4">
		<slot />
	</div>
</div>
