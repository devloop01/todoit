<script lang="ts">
	import type { PageData } from './$types';

	import { superForm } from 'sveltekit-superforms/client';

	import { signInSchema } from '$lib/schema/auth';

	import { Button } from '$components/ui/button';
	import { PasswordInput } from '$components/ui/password-input';
	import { Card, CardContent, CardFooter } from '$components/ui/card';
	import PageError from '$components/page-error.svelte';
	import { Heading, Small, Text } from '$components/typography';
	import { TextInput } from '$components/ui/text-input';
	import { toast } from '$components/ui/toast';

	export let data: PageData;

	const { form, errors, enhance, submitting } = superForm(data.form, {
		validators: signInSchema,
		autoFocusOnError: true,

		onUpdated({ form }) {
			if (form.message) {
				if (form.message.type === 'error') toast.error(form.message.message);
			}
		}
	});
</script>

<svelte:head>
	<title>todoit. — Login</title>
</svelte:head>

<div class="space-y-6">
	<div>
		<Heading level="h2">Sign In</Heading>
		<Small>
			Don't have an account? <a href="/register" class="font-medium text-primary">Sign up</a>
		</Small>
	</div>

	<div class="space-y-2">
		<PageError />

		<Card>
			<CardContent class="pt-6">
				<form method="POST" use:enhance>
					<div class="space-y-2.5">
						<TextInput
							type="email"
							name="email"
							label="Email"
							placeholder="you@email.com"
							bind:value={$form.email}
							error={$errors?.email?.[0]}
							disabled={$submitting}
						/>

						<PasswordInput
							name="password"
							label="Password"
							placeholder="Your password"
							bind:value={$form.password}
							error={$errors?.password?.[0]}
							disabled={$submitting}
						/>

						<div class="pt-2.5">
							<Button class="w-full" loading={$submitting}>Login</Button>
						</div>
					</div>
				</form>
			</CardContent>

			<CardFooter>
				<Small>
					<a href="/forgot-password" class="text-primary hover:underline">Forgot password?</a>
				</Small>
			</CardFooter>
		</Card>
	</div>
</div>
