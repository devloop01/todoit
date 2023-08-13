<script lang="ts">
	import type { PageData } from './$types';

	import { superForm } from 'sveltekit-superforms/client';
	// import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';

	import { Button } from '$components/ui/button';
	import { Input } from '$components/ui/input';
	import { PasswordInput } from '$components/ui/password-input';
	import { Label } from '$components/ui/label';
	import { Card, CardContent, CardFooter } from '$components/ui/card';

	export let data: PageData;

	const { form, errors, enhance, constraints } = superForm(data.form);
</script>

<svelte:head>
	<title>todoit. — Sign In</title>
</svelte:head>

<div class="space-y-6">
	<div>
		<h3 class="scroll-m-20 font-inter text-4xl font-semibold tracking-tight lg:text-5xl">
			Welcome back!
		</h3>
		<p class="pl-1 text-gray-600">write your todos</p>
	</div>

	<Card>
		<CardContent class="pt-6">
			<form method="POST" use:enhance>
				<div class="space-y-2.5">
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
					<div class="pt-2.5">
						<Button class="w-full">Sign In</Button>
					</div>
				</div>
			</form>
		</CardContent>

		<CardFooter>
			<p class="leading-7 [&:not(:first-child)]:mt-6">
				Don't have an account? <a href="/sign-up"
					><span class="font-medium text-primary">Sign Up</span></a
				>
			</p>
		</CardFooter>
	</Card>

	<!-- <SuperDebug data={$form} /> -->
</div>
