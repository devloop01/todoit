import type { InferModel } from 'drizzle-orm';
import type { Schema } from './server/db';

export type Todo = InferModel<typeof Schema.todo>;
export type NewTodo = Omit<InferModel<typeof Schema.todo, 'insert'>, 'id' | 'createdAt'>;

export type TodoFilter = 'COMPLETED' | 'REMAINING';

export type User = InferModel<typeof Schema.user>;

