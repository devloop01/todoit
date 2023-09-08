import { cva, type VariantProps } from 'class-variance-authority';

import Root from './alert.svelte';
import Description from './alert-description.svelte';
import Title from './alert-title.svelte';

export const alertVariants = cva('relative w-full rounded-lg border p-4 text-sm', {
	variants: {
		variant: {
			default: 'bg-background text-foreground [&>svg]:text-foreground',
			destructive: 'bg-destructive/10 border-destructive text-destructive [&>svg]:text-destructive',
			success: 'bg-success/10 border-success text-success [&>svg]:text-success'
		}
	},
	defaultVariants: {
		variant: 'default'
	}
});

export type Variant = VariantProps<typeof alertVariants>['variant'];
export type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export {
	Root,
	Description,
	Title,
	//
	Root as Alert,
	Description as AlertDescription,
	Title as AlertTitle
};

