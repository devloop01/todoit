import type { Actions, PageServerLoad } from './$types';

import { eq } from 'drizzle-orm';
import { message, setError, superValidate } from 'sveltekit-superforms/server';

import { auth } from '$lib/server/lucia';
import { Schema, db } from '$lib/server/db';
import { generatePasswordResetToken } from '$lib/server/token';
import { sendPasswordResetLink } from '$lib/server/email';

import { signInSchema } from '$lib/schema/auth';
import type { FormMessage } from '$lib/types';

const schema = signInSchema.pick({ email: true });

export const load = (async () => {
	const form = await superValidate<typeof schema, FormMessage>(schema);
	return { form };
}) satisfies PageServerLoad;

export const actions = {
	default: async (event) => {
		const { request } = event;

		const form = await superValidate<typeof schema, FormMessage>(request, schema);

		if (!form.valid) {
			return message(form, { type: 'error', message: 'Invalid or incomplete form data' });
		}

		const { email } = form.data;

		try {
			const [storedUser] = await db
				.select()
				.from(Schema.users)
				.where(eq(Schema.users.email, email));

			if (!storedUser) {
				return setError(form, 'email', 'No user with that email exists');
			}

			const user = auth.transformDatabaseUser(storedUser);
			const token = await generatePasswordResetToken(user.userId);

			await sendPasswordResetLink(token);
		} catch (e) {
			return message(form, { type: 'error', message: 'An unknown error occured!' });
		}

		return message(form, { type: 'success', message: 'Password reset link sent' });
	}
} satisfies Actions;

