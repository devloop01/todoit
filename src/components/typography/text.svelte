<script context="module" lang="ts">
	import { cva, type VariantProps } from 'class-variance-authority';

	export const textVariants = cva('', {
		variants: {
			variant: {
				default: 'leading-7 [&:not(:first-child)]:mt-4',
				lead: 'text-xl text-muted-foreground',
				large: 'text-lg font-semibold',
				muted: 'text-sm text-muted-foreground'
			}
		},
		defaultVariants: {
			variant: 'default'
		}
	});
	export type TextVariant = VariantProps<typeof textVariants>['variant'];
</script>

<script lang="ts">
	import { cn } from '$lib/utils';
	import type { HTMLAttributes } from 'svelte/elements';

	type $$Props = HTMLAttributes<HTMLParagraphElement> & {
		variant?: TextVariant;
	};

	let className: string | undefined | null = undefined;
	export { className as class };

	export let variant: $$Props['variant'] = 'default';
</script>

<p class={cn(textVariants({ variant, className }))} {...$$restProps}>
	<slot />
</p>
