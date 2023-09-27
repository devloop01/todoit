import type { PageServerLoad, Actions, RequestEvent } from './$types';
import type { TodoFilter } from '$lib/types';

import { fail, redirect } from '@sveltejs/kit';
import { todos } from '$lib/server/db/actions';
import { todoFilter } from '$lib/schema';

const getUser = async (event: RequestEvent) => {
	const session = await event.locals.auth.validate();
	const user = session?.user;
	if (!user) throw redirect(302, '/');

	return user;
};

export const load = (async (event) => {
	let filter: TodoFilter = 'remaining';
	const parsedFilter = todoFilter.safeParse(event.url.searchParams.get('filter') ?? filter);
	if (parsedFilter.success) filter = parsedFilter.data;

	const user = await getUser(event);

	return {
		filteredTodos: todos.getFiltered({ userId: user.userId, filter }),
		streamed: {
			// filteredTodos: todos.getFiltered({ userId: user.userId, filter })
		}
	};
}) satisfies PageServerLoad;

export const actions = {
	create: async (event) => {
		const user = await getUser(event);

		const formData = await event.request.formData();

		const title = formData.get('title')?.toString();

		if (!title)
			return fail(422, {
				message: 'No todo text provided'
			});

		await todos.create({ userId: user.userId, title });
	},

	delete: async (event) => {
		const user = await getUser(event);

		const formData = await event.request.formData();

		const todoId = formData.get('todoId')?.toString();

		if (!todoId)
			return fail(422, {
				message: 'Todo id not provided'
			});

		try {
			await todos.delete({ userId: user.userId, id: todoId });
		} catch (e) {
			return fail(404, {
				message: 'Todo not found'
			});
		}
	},

	toggle: async (event) => {
		const user = await getUser(event);

		const formData = await event.request.formData();

		const todoId = formData.get('todoId')?.toString();
		const isTodoCompleted = formData.get('todoIsComplete')?.toString();

		if (!todoId || !isTodoCompleted)
			return fail(422, {
				message: 'Todo id not provided'
			});

		try {
			await todos.update({
				userId: user.userId,
				id: todoId,
				todo: { completed: isTodoCompleted === 'true' ? false : true }
			});
		} catch (e) {
			return fail(404, {
				message: 'Todo not found'
			});
		}
	}
} satisfies Actions;

