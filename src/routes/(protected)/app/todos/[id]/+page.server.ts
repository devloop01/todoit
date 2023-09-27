import { todos } from '$lib/server/db/actions';
import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ params, locals }) => {
	const session = await locals.auth.validate();
	const userId = session?.user.userId;
	if (!userId) throw redirect(302, '/');

	const todo = todos.get({ id: params.id, userId });

	if (!todo) throw error(404, { message: 'Todo not found' });

	return { todo };
}) satisfies PageServerLoad;

