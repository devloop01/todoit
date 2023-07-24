import { z } from 'zod';

export const todoSchema = z.object({
	id: z.string().min(1),
	title: z.string().min(1),
	description: z.string().optional(),
	completed: z.boolean(),
	createdAt: z.date()
});

export const todoFilterSchema = z.enum(['ALL', 'COMPLETED', 'REMAINING']);
