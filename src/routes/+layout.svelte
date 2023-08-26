<script lang="ts">
	import '../app.css';

	import { currentUser } from '$lib/store';
	import { onMount } from 'svelte';

	export let data;

	let { user } = data;
	$: ({ user } = data);

	onMount(() => {
		if (user) {
			currentUser.set({
				id: user.userId,
				...user
			});
		}
	});
</script>

<slot />
