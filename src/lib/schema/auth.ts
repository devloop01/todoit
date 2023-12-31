import Regex from '$lib/regex';
import { z } from 'zod';

export const signInSchema = z.object({
	email: z
		.string()
		.min(1, 'Email is required')
		.max(64, 'Email cannot have more than 64 characters')
		.email('Email is invalid'),
	password: z.string().min(1, 'Password is required')
});

export const signUpSchemaRaw = z.object({
	name: z
		.string()
		.min(1, 'Name is required')
		.max(32, 'Name cannot have more than 32 characters')
		.regex(Regex.alphabetsAndSpace, 'Name cannot have numbers or special characters')
		.trim(),
	email: z
		.string()
		.min(1, 'Email is required')
		.max(64, 'Email cannot have more than 64 characters')
		.email('Email is invalid'),
	password: z
		.string()
		.min(1, 'Password is required')
		.max(64, 'Password cannot have more than 64 characters')
		.regex(
			Regex.password,
			'Minimum 7 characters, atleast 1 Alphabet, 1 Number and 1 Special Character'
		),
	confirmPassword: z.string().min(1, 'Confirm password is required')
});

export const signUpSchema = signUpSchemaRaw.superRefine((data, ctx) => {
	if (data.confirmPassword !== data.password) {
		ctx.addIssue({
			code: 'custom',
			message: "passwords don't match",
			path: ['confirmPassword']
		});
	}
});

