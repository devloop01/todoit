import { resend } from './resend';
import ConfirmEmail from '$components/emails/confirm-email.svelte';
import { render } from 'svelte-email';

const email = 'sikritidakua@gmail.com';

export const sendEmailVerificationLink = async (token: string) => {
	const url = `http://localhost:5173/confirm-email/${token}`;
	console.log(`Your email verification link: ${url}`);

	try {
		const html = render({
			template: ConfirmEmail,
			props: {
				url,
				email
			}
		});
		const data = await resend.emails.send({
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

		console.log(data);
	} catch (error) {
		console.error(error);
	}
};

export const sendPasswordResetLink = async (token: string) => {
	const url = `http://localhost:5173/reset-password/${token}`;
	console.log(`Your password reset link: ${url}`);
};

export const isValidEmail = (maybeEmail: unknown): maybeEmail is string => {
	if (typeof maybeEmail !== 'string') return false;
	if (maybeEmail.length > 255) return false;
	const emailRegexp = /^.+@.+$/; // [one or more character]@[one or more character]
	return emailRegexp.test(maybeEmail);
};

