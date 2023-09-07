import { cva, type VariantProps } from 'class-variance-authority';

import Root from './alert.svelte';
import Description from './alert-description.svelte';
import Title from './alert-title.svelte';

export const alertVariants = cva(
	'relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground',
	{
		variants: {
			variant: {
				default: 'bg-background text-foreground',
				destructive:
					'bg-destructive-muted border-destructive-muted-foreground text-destructive-muted-foreground [&>svg]:text-destructive-muted-foreground',
				success:
					'bg-success-muted border-success-muted-foreground text-success-muted-foreground [&>svg]:text-success-muted-foreground'
			}
		},
		defaultVariants: {
			variant: 'default'
		}
	}
);

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

