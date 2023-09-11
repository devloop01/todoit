<script lang="ts">
	import { melt, type Avatar } from '@melt-ui/svelte';
	import { getContext } from 'svelte';
	import { cn } from '$lib/utils';

	export let src: string | undefined = undefined;
	export let alt: string | undefined = undefined;

	let className: string | undefined = undefined;
	export { className as class };

	const avatar = getContext<Avatar>('avatar');

	if (src) avatar.options.src.set(src);

	const image = avatar.elements.image;
</script>

<img
	use:melt={$image}
	{alt}
	class={cn('aspect-square h-full w-full', className)}
	{...$$restProps}
/>
