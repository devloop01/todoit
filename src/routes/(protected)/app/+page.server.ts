import type { PageServerLoad, Actions } from './$types';
import type { TodoFilter } from '$lib/types';

import { fail } from '@sveltejs/kit';
import { createTodo, updateTodo, deleteTodo, getFilteredTodos } from '$lib/server/db/actions/todos';
import { todoFilter } from '$lib/schema';
// import { redirect } from 'sveltekit-flash-message/server';

export const load = (async (event) => {
	const parsedFilter = todoFilter.safeParse(event.url.searchParams.get('filter') ?? 'remaining');
	let filter: TodoFilter = 'remaining';
	if (parsedFilter.success) filter = parsedFilter.data;
	// else {
	// 	throw redirect({ type: 'error', message: 'invalid filter!' }, event);
	// }

	return {
		filteredTodos: getFilteredTodos(filter)
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

