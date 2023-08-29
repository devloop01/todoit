<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<main class="flex-1">
	<h1>
		{JSON.stringify(data.todo, null, 2)}
	</h1>
</main>
