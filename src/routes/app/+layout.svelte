<script>
	import { currentUser } from '$lib/store';

	import Header from '$components/header.svelte';

	export let data;

	let { user } = data;
	$: ({ user } = data);

	if (user) currentUser.set({ id: user.userId, ...user });
</script>

<div class="mx-auto max-w-screen-md bg-background">
	<div class="relative flex h-screen flex-col flex-wrap justify-between">
		<Header />

		<slot />
	</div>
</div>
