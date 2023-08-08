import type { PageServerLoad, Actions } from './$types';
import { createTodo, deleteTodo, getTodos, toggleTodo } from '$lib/server/db';
import { fail } from '@sveltejs/kit';

export const load = (async () => {
	const todos = getTodos();

	return {
		todos
	};
}) satisfies PageServerLoad;

export const actions = {
	create: async ({ request }) => {
		const formData = await request.formData();
		const todoText = formData.get('todo-text')?.toString();

		if (!todoText)
			return fail(422, {
				text: todoText,
				error: 'No todo text provided'
			});

		createTodo(todoText);
	},

	delete: async ({ request }) => {
		const formData = await request.formData();
		const todoId = formData.get('todo-id')?.toString();

		if (!todoId)
			return fail(422, {
				todoId,
				error: 'Todo id not provided'
			});

		try {
			deleteTodo(todoId);
		} catch (e) {
			return fail(404, {
				todoId,
				error: 'Todo not found'
			});
		}
	},

	complete: async ({ request }) => {
		const formData = await request.formData();
		const todoId = formData.get('todo-id')?.toString();

		if (!todoId)
			return fail(422, {
				todoId,
				error: 'Todo id not provided'
			});

		try {
			toggleTodo(todoId);
		} catch (e) {
			return fail(404, {
				todoId,
				error: 'Todo not found'
			});
		}
	}
} satisfies Actions;
