<script lang="ts">
	import type { PageData } from './$types';

	import { superForm } from 'sveltekit-superforms/client';
	import { signUpSchema } from '$lib/schema/auth';

	import { Button } from '$components/ui/button';
	import { PasswordInput } from '$components/ui/password-input';
	import { Card, CardContent, CardFooter } from '$components/ui/card';
	import { Heading, Small, Text } from '$components/typography';
	import PageError from '$components/page-error.svelte';
	import { TextInput } from '$components/ui/text-input';
	import { toast } from '$components/ui/toast';

	export let data: PageData;

	const { form, errors, enhance, submitting } = superForm(data.form, {
		validators: signUpSchema,
		autoFocusOnError: true,

		onUpdated({ form }) {
			if (form.message) {
				if (form.message.type === 'error') toast.error(form.message.message);
			}
		}
	});
</script>

<svelte:head>
	<title>todoit. — Register Account</title>
</svelte:head>

<div class="space-y-6">
	<div class="space-y-2">
		<Heading level="h2">Sign Up</Heading>
		<Text variant="muted">Create an account and start managing your tasks</Text>
	</div>

	<div class="space-y-2">
		<PageError />

		<Card class="">
			<CardContent class="pt-6">
				<form method="POST" use:enhance>
					<div class="space-y-2.5">
						<TextInput
							label="Name"
							name="name"
							placeholder="Your name"
							bind:value={$form.name}
							error={$errors?.name?.[0]}
							disabled={$submitting}
						/>
						<TextInput
							label="Email"
							type="email"
							name="email"
							placeholder="you@email.com"
							bind:value={$form.email}
							error={$errors?.email?.[0]}
							disabled={$submitting}
						/>

						<PasswordInput
							label="Password"
							name="password"
							placeholder="Your password"
							bind:value={$form.password}
							error={$errors?.password?.[0]}
							disabled={$submitting}
						/>
						<PasswordInput
							label="Confirm Password"
							name="confirmPassword"
							placeholder="Re-enter password"
							bind:value={$form.confirmPassword}
							error={$errors?.confirmPassword?.[0]}
							disabled={$submitting}
						/>
						<div class="pt-2.5">
							<Button class="w-full" loading={$submitting}>Register</Button>
						</div>
					</div>
				</form>
			</CardContent>

			<CardFooter class="grid gap-2.5">
				<Small>
					<a href="/forgot-password" class="text-primary hover:underline">Forgot password?</a>
				</Small>
				<Small>
					Do you have an account? <a href="/login" class="text-primary hover:underline">Sign In</a>
				</Small>
			</CardFooter>
		</Card>
	</div>
</div>
