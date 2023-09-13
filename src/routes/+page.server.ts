import type { PageServerLoad, Actions } from './$types';
import { fail } from '@sveltejs/kit';
import { auth } from '$lib/server/lucia';
import { redirect } from 'sveltekit-flash-message/server';

export const load = (async ({ locals, url }) => {
	const session = await locals.auth.validate();
	const search = url.search;

	if (session) {
		throw redirect(302, `/app${search}`);
	}
}) satisfies PageServerLoad;

export const actions = {
	logout: async (event) => {
		const session = await event.locals.auth.validate();
		if (!session) return fail(401);
		await auth.invalidateSession(session.sessionId);
		event.locals.auth.setSession(null);

		throw redirect('/login', { message: 'Logged out!' }, event);
	}
} satisfies Actions;

