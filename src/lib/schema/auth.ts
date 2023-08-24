import { z } from 'zod';




export const signInSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .max(64, 'Email cannot have more than 64 characters')
    .email('Email is invalid'),
  password: z.string().min(1, 'Password is required')
});

export const signUpSchema = z
  .object({
    name: z.string().min(1, 'Name is required').max(32, 'Name cannot have more than 32 characters'),
    email: z
      .string()
      .min(1, 'Email is required')
      .max(64, 'Email cannot have more than 64 characters')
      .email('Email is invalid'),
    password: z.string().min(1, 'Password is required'),
    confirmPassword: z.string().min(1, 'Confirm password is required')
  })
  .superRefine((data, ctx) => {
    if (data.confirmPassword !== data.password) {
      ctx.addIssue({
        code: 'custom',
        message: "passwords don't match",
        path: ['confirmPassword']
      });
    }
  });
