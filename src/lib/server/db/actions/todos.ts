import { z } from 'zod';
import { and, eq } from 'drizzle-orm';

import { todoFilter } from '@/lib/schema';

import { Schema, db } from '$lib/server/db';
import { generateId } from '$lib/utils/id';
import { builder } from './action-builder';

const defaultSchema = z.object({ userId: z.string() });

const b = builder({ schema: defaultSchema });

const createTodo = b
	.input(z.object({ title: z.string(), description: z.string().optional() }))
	.function(async ({ input, error }) => {
		if (error) {
			console.error(error);
			throw new Error('error');
		}

		const { userId, title, description } = input;

		const [newTodo] = await db
			.insert(Schema.todos)
			.values({
				id: generateId(),
				title,
				description,
				user_id: userId
			})
			.returning();

		return newTodo;
	});

const getTodo = b.input(z.object({ id: z.string() })).function(async ({ input, error }) => {
	if (error) {
		console.error(error);
		throw new Error('error');
	}

	const { userId, id } = input;

	const todo = await db.query.todos.findFirst({
		where: (todos, { and, eq }) => and(eq(todos.user_id, userId), eq(todos.id, id))
	});

	return todo;
});

const getTodos = b.input(z.object({})).function(async ({ input, error }) => {
	if (error) {
		console.error(error);
		throw new Error('error');
	}

	const { userId } = input;

	const todos = await db.query.todos.findMany({
		where: (todos, { eq }) => and(eq(todos.user_id, userId)),
		orderBy: (todos, { desc }) => desc(todos.created_at)
	});

	return todos;
});

const getFilteredTodos = b
	.input(z.object({ filter: todoFilter }))
	.function(async ({ input, error }) => {
		if (error) {
			console.error(error);
			throw new Error('error');
		}

		const { userId, filter } = input;

		const todos = await db.query.todos.findMany({
			where: (todos, { and, eq }) =>
				and(eq(todos.user_id, userId), eq(todos.completed, filter === 'completed')),
			orderBy: (todos, { desc }) => desc(todos.created_at)
		});

		return todos;
	});

const updateTodo = b
	.input(
		z.object({
			id: z.string(),
			todo: z
				.object({
					title: z.string(),
					description: z.string().optional(),
					completed: z.boolean()
				})
				.partial()
		})
	)
	.function(async ({ input, error }) => {
		if (error) {
			console.error(error);
			throw new Error('error');
		}

		const { userId, id, todo } = input;

		const [updatedTodo] = await db
			.update(Schema.todos)
			.set({
				title: todo.title,
				description: todo.description,
				completed: todo.completed
			})
			.where(and(eq(Schema.todos.user_id, userId), eq(Schema.todos.id, id)))
			.returning();

		return updatedTodo;
	});

const deleteTodo = b.input(z.object({ id: z.string() })).function(async ({ input, error }) => {
	if (error) {
		console.error(error);
		throw new Error('error');
	}

	const { userId, id } = input;

	await db
		.delete(Schema.todos)
		.where(and(eq(Schema.todos.user_id, userId), eq(Schema.todos.id, id)));
});

const todos = {
	create: createTodo,
	get: getTodo,
	getAll: getTodos,
	getFiltered: getFilteredTodos,
	update: updateTodo,
	delete: deleteTodo
};

export { todos };

