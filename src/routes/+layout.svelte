<script lang="ts">
	import '../app.css';

	import { getFlash } from 'sveltekit-flash-message';
	import { Toaster, toast } from '$components/ui/toast';

	import { page } from '$app/stores';

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
</script>

<slot />
<Toaster />
