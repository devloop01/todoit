<script lang="ts">
	import type { PageData } from './$types';

	import { superForm } from 'sveltekit-superforms/client';
	import { signUpSchema } from '$lib/schema/auth';

	import { LoaderIcon } from 'lucide-svelte';
	import { Button } from '$components/ui/button';
	import { PasswordInput } from '$components/ui/password-input';
	import { Card, CardContent, CardFooter } from '$components/ui/card';
	import { Alert, AlertTitle } from '$components/ui/alert';
	import { Text } from '$components/typography';
	import PageError from '$components/page-error.svelte';
	import { TextInput } from '$components/ui/text-input';

	export let data: PageData;

	let loading = false;

	const { form, errors, enhance } = superForm(data.form, {
		validators: signUpSchema,
		autoFocusOnError: true,
		onSubmit() {
			loading = true;
		},
		onResult() {
			loading = false;
		}
	});
</script>

<svelte:head>
	<title>todoit. — Register Account</title>
</svelte:head>

<div class="space-y-6">
	<div class="">
		<h3 class="scroll-m-20 font-inter text-4xl font-semibold tracking-tight lg:text-5xl">
			Hello User!
		</h3>
		<p class="pl-1 text-foreground/70">create your account</p>
	</div>

	<div class="space-y-2">
		<PageError />

		{#if $errors._errors}
			<div class="space-y-2">
				{#each $errors._errors as error}
					<Alert variant="destructive">
						<AlertTitle>
							{error}
						</AlertTitle>
					</Alert>
				{/each}
			</div>
		{/if}

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
							disabled={loading}
						/>
						<TextInput
							label="Email"
							type="email"
							name="email"
							placeholder="you@email.com"
							bind:value={$form.email}
							error={$errors?.email?.[0]}
							disabled={loading}
						/>

						<PasswordInput
							label="Password"
							name="password"
							placeholder="Your password"
							bind:value={$form.password}
							error={$errors?.password?.[0]}
							disabled={loading}
						/>
						<PasswordInput
							label="Confirm Password"
							name="confirmPassword"
							placeholder="Re-enter password"
							bind:value={$form.confirmPassword}
							error={$errors?.confirmPassword?.[0]}
							disabled={loading}
						/>
						<div class="pt-2.5">
							<Button class="w-full" disabled={loading}>
								{#if loading}
									<LoaderIcon class="h-5 w-5 animate-spin" />
								{:else}
									Register
								{/if}
							</Button>
						</div>
					</div>
				</form>
			</CardContent>

			<CardFooter>
				<Text>
					Already have an account? <a href="/login" class="font-medium text-primary">Sign in</a>
				</Text>
			</CardFooter>
		</Card>
	</div>
</div>
