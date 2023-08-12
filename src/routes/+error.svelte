<script lang="ts">
	import { page } from '$app/stores';
</script>

<div class="grid h-screen place-content-center bg-gray-100 text-center">
	<h1 class="font-inter text-6xl font-extrabold text-gray-300">{$page.status}</h1>
	<h3 class="font-inter text-xl font-medium text-gray-800">{$page.error?.message}</h3>
</div>
