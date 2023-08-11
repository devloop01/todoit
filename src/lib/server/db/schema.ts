import { pgTable, serial, boolean, varchar, timestamp, uuid } from 'drizzle-orm/pg-core';

export const todos = pgTable('todos', {
	id: uuid('id').defaultRandom().primaryKey(),
	title: varchar('title', { length: 50 }).notNull(),
	description: varchar('description', { length: 255 }),
	completed: boolean('completed').notNull().default(false),
	createdAt: timestamp('created_at', { mode: 'string' }).notNull().defaultNow()
});
