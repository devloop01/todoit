import { z } from 'zod';

import { resend } from '../resend';
import { getUrl } from '../utils';
import { optionsSchema } from '.';
import { render } from 'svelte-email';

import ResetPassword from '$components/emails/reset-password.svelte';

export async function sendPasswordResetLink(options: z.infer<typeof optionsSchema>) {
	try {
		const { email, token } = optionsSchema.parse(options);

		const url = getUrl('reset-password', token);

		const html = render({
			template: ResetPassword,
			props: { url, email }
		});

		const mail = await resend.emails.send({
			from: 'Todoit <noreply@sikriti.me>',
			to: [email],
			reply_to: 'noreply@sikriti.me',
			subject: 'Password reset link',
			html,
			tags: [
				{
					name: 'category',
					value: 'password_reset'
				}
			]
		});

		console.log(`Your password reset link: ${url}`);
		console.log(`email-${mail.id} sent to: ${email}`);
	} catch (error) {
		console.log('Email not sent!\n');
		if (error instanceof z.ZodError) {
			if (error.errors[0].code === 'invalid_type') {
				throw Error('invalid_type');
			}
		}
	}
}

