import type { InferSelectModel, InferInsertModel } from 'drizzle-orm';
import type { z } from 'zod';

import type { Schema } from '$lib/server/db';
import type { todoFilter } from '$lib/schema';

export type TodoFilter = z.infer<typeof todoFilter>;

export type Todo = InferSelectModel<typeof Schema.todos>;
export type NewTodo = Omit<InferInsertModel<typeof Schema.todos>, 'id' | 'createdAt'>;

export type User = InferSelectModel<typeof Schema.users>;

export type FormMessage = {
	type: 'error' | 'success';
	message: string;
};

export type ValueFunction<TValue, TArg> = (arg: TArg) => TValue;
export type ValueOrFunction<TValue, TArg> = TValue | ValueFunction<TValue, TArg>;

