<script lang="ts">
</script>

<div class="mx-auto max-w-screen-md">
	<div class="flex h-screen flex-col">
		<header class="border-b p-4">
			<a href="/">
				<span class="font-inter text-2xl font-bold text-primary">todoit.</span>
			</a>
		</header>

		<div class="flex max-w-2xl flex-1 flex-col justify-center px-4 py-8">
			<slot />
		</div>
	</div>
</div>
