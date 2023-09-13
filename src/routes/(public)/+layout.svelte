<script lang="ts">
</script>

<div class="mx-auto max-w-screen-md">
	<div class="flex h-screen flex-col">
		<header class="border-b p-4">
			<a href="/">
				<span class="text-2xl font-bold text-primary">todoit.</span>
			</a>
		</header>

		<div class="flex flex-1 flex-col px-4 py-8">
			<div class="mx-auto w-full max-w-[500px]">
				<slot />
			</div>
		</div>
	</div>
</div>
