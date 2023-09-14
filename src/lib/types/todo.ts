import type { InferSelectModel, InferInsertModel } from 'drizzle-orm';
import type { z } from 'zod';

import type { Schema } from '$lib/server/db';
import type { todoFilter } from '$lib/schema';

export type TodoFilter = z.infer<typeof todoFilter>;

export type Todo = InferSelectModel<typeof Schema.todos>;
export type NewTodo = Omit<InferInsertModel<typeof Schema.todos>, 'id' | 'createdAt'>;

