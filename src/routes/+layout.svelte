<script lang="ts">
	import '@/styles/app.postcss';

	import { page } from '$app/stores';
	import { browser, dev } from '$app/environment';

	import { getFlash } from 'sveltekit-flash-message';

	import { Toaster, toast } from '$components/ui/toast';
	import TailwindIndicator from '$components/tailwind-indicator.svelte';

	const flash = getFlash(page);

	flash.subscribe(($flash) => {
		if (!$flash) return;

		if (browser) {
			if (!$flash.type) toast($flash.message);
			if ($flash.type === 'success') toast.success($flash.message);
			if ($flash.type === 'error') toast.error($flash.message);
		}

		flash.set(undefined);
	});
</script>

<slot />
<Toaster />
{#if dev}
	<TailwindIndicator />
{/if}
