import type { ValueFunction, ValueOrFunction } from '$lib/types';
import type { ClassValue } from 'clsx';

import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

const isFunction = <TValue, TArg>(
	valOrFunction: ValueOrFunction<TValue, TArg>
): valOrFunction is ValueFunction<TValue, TArg> => typeof valOrFunction === 'function';

export const resolveValue = <TValue, TArg>(
	valOrFunction: ValueOrFunction<TValue, TArg>,
	arg: TArg
): TValue => (isFunction(valOrFunction) ? valOrFunction(arg) : valOrFunction);

