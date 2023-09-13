import { z } from 'zod';

export const todoFilter = z.enum(['completed', 'remaining']);

