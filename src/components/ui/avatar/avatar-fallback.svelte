<script lang="ts">
	import { melt, type AvatarElements } from '@melt-ui/svelte';
	import { cn } from '$lib/utils';

	let className: string | undefined = undefined;
	export { className as class };

	export let elements: AvatarElements;
	$: ({ fallback } = elements);
</script>

<span
	use:melt={$fallback}
	class={cn('flex h-full w-full items-center justify-center rounded-full bg-muted', className)}
	{...$$restProps}
>
	<slot />
</span>
