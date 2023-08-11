import type { InferModel } from 'drizzle-orm';
import type { Schema } from './server/db';

export type Todo = InferModel<typeof Schema.todos>;

export type TodoFilter = 'COMPLETED' | 'REMAINING';
