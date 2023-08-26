import type { PageServerLoad, Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { createTodo, getTodos, updateTodo, deleteTodo } from '$lib/server/db/handlers/todos';
import { auth } from '$lib/server/lucia';

export const load = (async () => {
	return {
		todos: await getTodos()
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
	},

	logout: async ({ locals }) => {
		const session = await locals.auth.validate();
		if (!session) return fail(401);
		await auth.invalidateSession(session.sessionId);
		locals.auth.setSession(null);
		throw redirect(302, '/sign-in');
	}
} satisfies Actions;

