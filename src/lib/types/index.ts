import type { InferSelectModel, InferInsertModel } from 'drizzle-orm';
import type { Schema } from '../server/db';

export type Todo = InferSelectModel<typeof Schema.todos>;
export type NewTodo = Omit<InferInsertModel<typeof Schema.todos>, 'id' | 'createdAt'>;

export type TodoFilter = 'COMPLETED' | 'REMAINING';

export type User = InferSelectModel<typeof Schema.users>;

export type ValueFunction<TValue, TArg> = (arg: TArg) => TValue;
export type ValueOrFunction<TValue, TArg> = TValue | ValueFunction<TValue, TArg>;

