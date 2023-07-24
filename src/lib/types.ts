import type { z } from 'zod';

import type { todoFilterSchema, todoSchema } from './schema';

export type Todo = z.infer<typeof todoSchema>;

export type TodoFilter = z.infer<typeof todoFilterSchema>;
