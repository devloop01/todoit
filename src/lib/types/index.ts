export * from './todo';
export * from './user';

export type FormMessage = {
	type: 'error' | 'success';
	message: string;
};

// utils
export type ValueFunction<TValue, TArg> = (arg: TArg) => TValue;
export type ValueOrFunction<TValue, TArg> = TValue | ValueFunction<TValue, TArg>;

