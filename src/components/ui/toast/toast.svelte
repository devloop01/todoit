<script lang="ts" context="module">
	import { cva, type VariantProps } from 'class-variance-authority';

	const toastVariants = cva(
		'group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md transition-all duration-400 shadow-[0_3px_10px_rgba(0,0,0,0.1),0_3px_3px_rgba(0,0,0,0.05)]',
		{
			variants: {
				variant: {
					default: 'bg-background text-foreground',
					error: 'bg-destructive-muted text-destructive-muted-foreground',
					success: 'bg-success-muted text-success-muted-foreground'
				}
			},
			defaultVariants: {
				variant: 'default'
			}
		}
	);
</script>

<script lang="ts">
	import { melt, type Toast, type ToastsElements } from '@melt-ui/svelte';
	import { draw, fly, scale } from 'svelte/transition';
	import { backOut } from 'svelte/easing';

	import { Loader2, X } from 'lucide-svelte';
	import type { ToastData } from './toaster.svelte';

	export let elements: ToastsElements;
	$: ({ content, title, description, close } = elements);

	export let toast: Toast<ToastData>;
	$: ({ data, id } = toast);

	let variant: VariantProps<typeof toastVariants>['variant'];
	$: variant = data.type === 'loading' ? 'default' : data.type;
</script>

<div
	use:melt={$content(id)}
	transition:fly={{ duration: 200, y: '100%' }}
	class={toastVariants({ variant })}
>
	<div class="group relative flex w-[18rem] max-w-[calc(100vw-2rem)] items-center gap-2 p-3">
		{#if data.type !== 'default'}
			<div class="sq-5 relative grid place-items-center">
				{#if data.type === 'loading'}
					<div class="absolute" in:scale>
						<Loader2 class="sq-4 animate-spin duration-700" />
					</div>
				{:else if data.type === 'success'}
					<div class="sq-5 absolute" in:scale={{ duration: 600, easing: backOut }}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							class="fill-none stroke-success-muted stroke-2"
						>
							<path
								class="origin-center fill-success-muted-foreground stroke-success-muted-foreground"
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
							/>
							<path
								transition:draw
								class="stroke-success-muted"
								stroke-linecap="round"
								stroke-linejoin="round"
								d="m7 12.5 3 3 7-7"
							/>
						</svg>
					</div>
				{:else}
					<div class="sq-5 absolute" in:scale={{ duration: 600, easing: backOut }}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							class="fill-none stroke-destructive-muted stroke-2"
						>
							<path
								class="origin-center fill-destructive-muted-foreground stroke-destructive-muted-foreground"
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
							/>
							<path
								transition:draw
								class="stroke-destructive-muted"
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M8 16 12.001 12m3.999-4L12.001 12m0 0L8 8M12.001 12l3.999 4"
							/>
						</svg>
					</div>
				{/if}
			</div>
		{/if}

		<div class="flex-1">
			<h3 use:melt={$title(id)} class="flex items-center gap-2 text-sm font-semibold">
				{data.title}
			</h3>
			{#if data.description}
				<div use:melt={$description(id)} class="text-sm leading-4 opacity-90">
					{data.description}
				</div>
			{/if}
		</div>

		{#if data.dismissable}
			<button
				type="button"
				use:melt={$close(id)}
				class="sq-5 grid place-items-center rounded-full opacity-0 transition-all hover:bg-foreground/5 group-hover:opacity-100"
			>
				<X class="sq-4 !stroke-black/50" />
			</button>
		{/if}
	</div>
</div>
