<script lang="ts">
	import type { PageData } from './$types';

	import { page } from '$app/stores';
	import { superForm } from 'sveltekit-superforms/client';
	// import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';

	import { LoaderIcon } from 'lucide-svelte';

	import { Button } from '$components/ui/button';
	import { Input } from '$components/ui/input';
	import { PasswordInput } from '$components/ui/password-input';
	import { Label } from '$components/ui/label';
	import { Card, CardContent, CardFooter } from '$components/ui/card';
	import { Alert, AlertTitle } from '$components/ui/alert';

	export let data: PageData;

	let message: string;
	$: message = $page.url.searchParams.get('message') ?? '';

	let loading = false;

	const { form, errors, enhance, constraints } = superForm(data.form, {
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
		<p class="pl-1 text-gray-600 dark:text-gray-300">create your account</p>
	</div>

	<div class="space-y-2">
		{#if message}
			<Alert variant="destructive">
				<AlertTitle>
					{message}
				</AlertTitle>
			</Alert>
		{/if}

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
						<div class="space-y-1.5">
							<Label for="name" class="font-medium">Name</Label>
							<Input
								type="text"
								name="name"
								id="name"
								placeholder="Your name"
								bind:value={$form.name}
								error={!!$errors.name}
								{...$constraints.name}
							/>
							{#if $errors.name}
								<small class="text-xs text-red-500">{$errors.name[0]}</small>
							{/if}
						</div>
						<div class="space-y-1.5">
							<Label for="email" class="font-medium">Email</Label>
							<Input
								type="email"
								name="email"
								id="email"
								placeholder="you@email.com"
								bind:value={$form.email}
								error={!!$errors.email}
								{...$constraints.email}
							/>
							{#if $errors.email}
								<small class="text-xs text-red-500">{$errors.email[0]}</small>
							{/if}
						</div>
						<div class="space-y-1.5">
							<Label for="password" class="font-medium">Password</Label>
							<PasswordInput
								name="password"
								id="password"
								placeholder="Your password"
								bind:value={$form.password}
								error={!!$errors.password}
								{...$constraints.password}
							/>
							{#if $errors.password}
								<small class="text-xs text-red-500">{$errors.password[0]}</small>
							{/if}
						</div>
						<div class="space-y-1.5">
							<Label for="confirmPassword" class="font-medium">Conform Password</Label>
							<PasswordInput
								name="confirmPassword"
								id="confirmPassword"
								placeholder="Re-enter password"
								bind:value={$form.confirmPassword}
								error={!!$errors.confirmPassword}
								{...$constraints.confirmPassword}
							/>
							{#if $errors.confirmPassword}
								<small class="text-xs text-red-500">{$errors.confirmPassword[0]}</small>
							{/if}
						</div>
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
				<p class="leading-7 [&:not(:first-child)]:mt-6">
					Already have an account? <a href="/login"
						><span class="font-medium text-primary">Sign In</span></a
					>
				</p>
			</CardFooter>
		</Card>
	</div>

	<!-- <SuperDebug data={$form} /> -->
</div>
