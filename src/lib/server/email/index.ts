import { z } from 'zod';

export const optionsSchema = z.object({
	token: z.string().min(1, 'Token is required'),
	email: z.string().min(1, { message: 'Email is required' }).email('This is not a valid email')
});

export * from './email-verify';
export * from './password-reset';

