import { z } from 'zod';
import { render } from 'svelte-email';

import { resend } from '../resend';
import { getUrl } from '../utils';
import { optionsSchema } from '.';

import ConfirmEmail from '$components/emails/confirm-email.svelte';

export async function sendEmailVerificationLink(options: z.infer<typeof optionsSchema>) {
	try {
		const { email, token } = optionsSchema.parse(options);

		const url = getUrl('confirm-email', token);

		const html = render({
			template: ConfirmEmail,
			props: { url, email }
		});

		const mail = await resend.emails.send({
			from: 'Todoit <noreply@sikriti.me>',
			to: [email],
			reply_to: 'noreply@sikriti.me',
			subject: 'Email verification link',
			html,
			tags: [
				{
					name: 'category',
					value: 'confirm_email'
				}
			]
		});

		console.log(`Your email verification link: ${url}`);
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

