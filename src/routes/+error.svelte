<script lang="ts">
	import { page } from '$app/stores';
</script>

<div class="h-screen grid place-content-center text-center bg-gray-100">
	<h1 class="text-gray-300 font-inter font-extrabold text-6xl">{$page.status}</h1>
	<h3 class="text-gray-800 font-inter font-medium text-xl">{$page.error?.message}</h3>
</div>
