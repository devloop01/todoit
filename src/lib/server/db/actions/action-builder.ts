import type { z } from 'zod';

type BuilderOptions<T> = {
	schema: T;
};

export function builder<T extends z.AnyZodObject>(options: BuilderOptions<T>) {
	const { schema: parentSchema } = options;

	type Callback<T, R> = (options: { input: T; error: z.ZodError | null }) => R;
	type Overwrite<T, U> = Pick<T, Exclude<keyof T, keyof U>> & U;

	return {
		input<K extends z.AnyZodObject>(schema: K) {
			const mergedSchema = parentSchema ? parentSchema.merge(schema) : schema;

			return {
				function<R>(callback: Callback<z.infer<T> & z.infer<K>, R>) {
					return (input: Overwrite<z.infer<T>, z.infer<K>>) => {
						const parsedData = mergedSchema.safeParse(input);

						if (parsedData.success) {
							return callback({ input: parsedData.data, error: null });
						} else {
							return callback({ input, error: parsedData.error });
						}
					};
				}
			};
		}
	};
}

