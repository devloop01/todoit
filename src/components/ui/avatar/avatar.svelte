<script lang="ts">
	import { createAvatar } from '@melt-ui/svelte';
	import { setContext } from 'svelte';
	import { cn } from '$lib/utils';

	let className: string | undefined = undefined;
	export { className as class };

	const avatar = createAvatar();
	setContext('avatar', avatar);
</script>

<div
	class={cn('relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full', className)}
	{...$$restProps}
>
	<slot />
</div>
