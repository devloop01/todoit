import type { z } from 'zod';

import type { todoSchema } from './schema';

export type Todo = z.infer<typeof todoSchema>;
