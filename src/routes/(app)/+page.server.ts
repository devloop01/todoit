import type { PageServerLoad, Actions } from './$types';
import { fail } from '@sveltejs/kit';
import {
	createTodo,
	getTodos,
	updateTodo,
	deleteTodo,
	getTodo
} from '$lib/server/db/handlers/todos';

export const load = (async () => {
	const todos = await getTodos();

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

		await createTodo(todoText);
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
			await deleteTodo(todoId);
		} catch (e) {
			return fail(404, {
				todoId,
				error: 'Todo not found'
			});
		}
	},

	toggle: async ({ request }) => {
		const formData = await request.formData();
		const todoId = formData.get('todo-id')?.toString();
		const isTodoCompleted = formData.get('todo-is-complete')?.toString();

		if (!todoId || !isTodoCompleted)
			return fail(422, {
				todoId,
				error: 'Todo id not provided'
			});

		try {
			await updateTodo(todoId, { completed: isTodoCompleted === 'true' ? false : true });
		} catch (e) {
			return fail(404, {
				todoId,
				error: 'Todo not found'
			});
		}
	}
} satisfies Actions;
