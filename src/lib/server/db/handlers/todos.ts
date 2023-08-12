import type { NewTodo } from '$lib/types';

import { desc, eq } from 'drizzle-orm';

import { Schema, db } from '..';

const createTodo = async (text: string) => {
	const [newTodo] = await db.insert(Schema.todos).values({ title: text }).returning();

	return newTodo;
};

const getTodo = async (id: string) => {
	const [todo] = await db.select().from(Schema.todos).where(eq(Schema.todos.id, id));

	return todo;
};

const getTodos = async () => {
	return await db.select().from(Schema.todos).orderBy(desc(Schema.todos.createdAt));
};

const updateTodo = async (id: string, todo: NewTodo) => {
	const [updatedTodo] = await db
		.update(Schema.todos)
		.set({
			title: todo.title,
			description: todo.description,
			completed: todo.completed
		})
		.where(eq(Schema.todos.id, id))
		.returning();

	return updatedTodo;
};

const deleteTodo = async (id: string) => {
	await db.delete(Schema.todos).where(eq(Schema.todos.id, id));
};

export { createTodo, getTodo, getTodos, updateTodo, deleteTodo };
