import type { PageServerLoad, Actions } from './$types';
import { todos } from '$lib/store';
import { createTodo, deleteTodo, toggleTodo } from '$lib/server/db';
import { fail } from '@sveltejs/kit';

export const load = (async () => {
	const all = todos.getAllTodos();

	console.log('all todos\n', all, '\n\n');

	return {
		todos: all
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
