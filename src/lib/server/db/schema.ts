import { pgTable, boolean, varchar, timestamp, bigint } from 'drizzle-orm/pg-core';

export const todos = pgTable('todos', {
	id: varchar('id', { length: 15 }).primaryKey(),
	title: varchar('title', { length: 50 }).notNull(),
	description: varchar('description', { length: 255 }),
	completed: boolean('completed').notNull().default(false),
	created_at: timestamp('created_at', { mode: 'string' }).notNull().defaultNow(),

	user_id: varchar('user_id', { length: 15 })
		.notNull()
		.references(() => users.id)
});

// -----------------------------------
// --------- Lucia Auth Tables -------
// -----------------------------------

export const users = pgTable('users', {
	id: varchar('id', { length: 15 }).primaryKey(),
	email: varchar('email', { length: 100 }).notNull().unique(),
	email_verified: boolean('email_verified').notNull().default(false),
	name: varchar('name', { length: 100 }).notNull(),
	created_at: timestamp('created_at', { mode: 'string' }).notNull().defaultNow()
});

export const sessions = pgTable('user_sessions', {
	id: varchar('id', { length: 128 }).primaryKey(),
	user_id: varchar('user_id', { length: 15 })
		.notNull()
		.references(() => users.id),
	active_expires: bigint('active_expires', { mode: 'number' }).notNull(),
	idle_expires: bigint('idle_expires', { mode: 'number' }).notNull()
});

export const keys = pgTable('user_keys', {
	id: varchar('id', { length: 255 }).primaryKey(),
	user_id: varchar('user_id', { length: 15 })
		.notNull()
		.references(() => users.id),
	hashed_password: varchar('hashed_password', { length: 255 })
});

export const verificationTokens = pgTable('email_verification_tokens', {
	id: varchar('id', { length: 63 }).primaryKey(),
	user_id: varchar('user_id', { length: 15 })
		.notNull()
		.references(() => users.id),
	expires: bigint('expires', { mode: 'number' }).notNull()
});

export const passwordResetTokens = pgTable('password_reset_tokens', {
	id: varchar('id', { length: 63 }).primaryKey(),
	user_id: varchar('user_id', { length: 15 })
		.notNull()
		.references(() => users.id),
	expires: bigint('expires', { mode: 'number' }).notNull()
});

