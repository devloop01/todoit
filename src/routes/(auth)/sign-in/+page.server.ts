import type { PageServerLoad } from "./$types";

import { fail, type Actions } from "@sveltejs/kit";

import { superValidate } from "sveltekit-superforms/server";

import { signInSchema } from "$lib/schema/auth";

export const load = (async () => {
	const form = await superValidate(signInSchema);

	return { form };
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, signInSchema);

		if (!form.valid) {
			return fail(400, { form });
		}

		console.log(form.data);

		return { form };
	}
} satisfies Actions;
