import { getTodo } from '$lib/services/todos';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	const todo = getTodo(params.id);

	if (!todo) throw error(404, { message: 'Todo not found' });

	return { todo };
}) satisfies PageServerLoad;

