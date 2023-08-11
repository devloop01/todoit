import { desc, eq, type InferModel } from 'drizzle-orm';

import { Schema, db } from '../index';

const createTodo = async (text: string) => {
	const newTodo = (await db.insert(Schema.todos).values({ title: text }).returning())[0];

	return newTodo;
};

const getTodo = async (id: string) => {
	return (await db.select().from(Schema.todos).where(eq(Schema.todos.id, id)))[0];
};

const getTodos = async () => {
	return await db.select().from(Schema.todos).orderBy(desc(Schema.todos.createdAt));
};

const updateTodo = async (
	id: string,
	todo: Partial<Omit<InferModel<typeof Schema.todos>, 'id' | 'createdAt'>>
) => {
	const updatedTodo = (
		await db.update(Schema.todos).set(todo).where(eq(Schema.todos.id, id)).returning()
	)[0];

	return updatedTodo;
};

const deleteTodo = async (id: string) => {
	await db.delete(Schema.todos).where(eq(Schema.todos.id, id));
};

export { createTodo, getTodo, getTodos, updateTodo, deleteTodo };
