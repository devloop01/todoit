import type { PageServerLoad } from './$types';
import { fail, type Actions } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { signUpSchema } from '$lib/schema/auth';

export const load = (async () => {
	const form = await superValidate(signUpSchema);

	return { form };
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, signUpSchema);

		if (!form.valid) {
			return fail(400, { form });
		}

		console.log(form.data);

		return { form };
	}
} satisfies Actions;

