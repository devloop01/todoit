<script lang="ts">
	import '../app.css';

	import { currentUser } from '$lib/store';

	import { getFlash } from 'sveltekit-flash-message';
	import { Toaster, toast } from '$components/ui/toast';

	import { page } from '$app/stores';

	export let data;

	const flash = getFlash(page);

	flash.subscribe(($flash) => {
		if (!$flash) return;

		switch ($flash.type) {
			case 'success':
				toast.success($flash.message);
				break;
			case 'error':
				toast.error($flash.message);
				break;
			default:
				toast($flash.message);
				break;
		}

		flash.set(undefined);
	});

	let { user } = data;
	$: ({ user } = data);

	if (user) currentUser.set({ id: user.userId, ...user });
</script>

<slot />
<Toaster />
