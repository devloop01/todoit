<script lang="ts">
	import type { PageData } from './$types';

	import { superForm } from 'sveltekit-superforms/client';

	import { signInSchema } from '$lib/schema/auth';

	import { LoaderIcon } from 'lucide-svelte';
	import { Button } from '$components/ui/button';
	import { PasswordInput } from '$components/ui/password-input';
	import { Card, CardContent, CardFooter } from '$components/ui/card';
	import { Alert, AlertTitle } from '$components/ui/alert';
	import PageError from '$components/page-error.svelte';
	import { Text } from '$components/typography';
	import { TextInput } from '$components/ui/text-input';

	export let data: PageData;

	let loading = false;

	const { form, errors, enhance } = superForm(data.form, {
		validators: signInSchema,
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
	<title>todoit. — Login</title>
</svelte:head>

<div class="space-y-6">
	<div>
		<h3 class="scroll-m-20 font-inter text-4xl font-semibold tracking-tight lg:text-5xl">
			Welcome back!
		</h3>
		<p class="pl-1 text-foreground/70">write your todos</p>
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

		<Card>
			<CardContent class="pt-6">
				<form method="POST" use:enhance>
					<div class="space-y-2.5">
						<TextInput
							name="email"
							label="Email"
							id="email"
							placeholder="you@email.com"
							bind:value={$form.email}
							error={$errors?.email?.[0]}
							disabled={loading}
						/>

						<PasswordInput
							name="password"
							label="Password"
							id="password"
							placeholder="Your password"
							bind:value={$form.password}
							error={$errors?.password?.[0]}
							disabled={loading}
						/>

						<div class="pt-2.5">
							<Button class="w-full">
								{#if loading}
									<LoaderIcon class="h-5 w-5 animate-spin" />
								{:else}
									Login
								{/if}
							</Button>
						</div>
					</div>
				</form>
			</CardContent>

			<CardFooter>
				<Text>
					Don't have an account? <a href="/register" class="font-medium text-primary">Sign up</a>
				</Text>
			</CardFooter>
		</Card>
	</div>
</div>
