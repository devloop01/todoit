<script lang="ts">
	import { cn } from '@/lib/utils';
	import type { HTMLLinkAttributes } from 'svelte/elements';

	interface $$Props extends HTMLLinkAttributes {
		href: string;
	}

	export let href: $$Props['href'];
	let className: $$Props['class'] = undefined;
	export { className as class };
</script>

<a {href} class={cn('text-sm text-primary hover:underline', className)} {...$$restProps}>
	<slot />
</a>
