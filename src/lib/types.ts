import type { InferModel } from 'drizzle-orm';
import type { Schema } from './server/db';

export type Todo = InferModel<typeof Schema.todos>;
export type NewTodo = Omit<InferModel<typeof Schema.todos, 'insert'>, 'id' | 'createdAt'>;

export type TodoFilter = 'COMPLETED' | 'REMAINING';
