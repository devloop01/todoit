<script lang="ts">
	import type { ActionData } from './$types';

	import { enhance } from '$app/forms';

	import { Alert, AlertTitle } from '$components/ui/alert';
	import { Button } from '$components/ui/button';
	import { Card, CardContent, CardFooter, CardHeader } from '$components/ui/card';
	import { PasswordInput } from '$components/ui/password-input';

	export let form: ActionData;
</script>

<svelte:head>
	<title>Reset Password — todoit</title>
</svelte:head>

<div class="space-y-2">
	<Card class="min-w-[300px]">
		<CardHeader>
			<h2 class="scroll-m-20 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
				Set new password
			</h2>
			<p class="text-sm text-foreground/80">create a new password</p>
		</CardHeader>
		<CardContent>
			<form method="post" use:enhance>
				<div class="space-y-4">
					<PasswordInput label="Password" name="password" placeholder="" />
					<PasswordInput label="Confirm Password" name="confirmPassword" placeholder="" />
					<Button class="w-full">Reset Password</Button>
				</div>
			</form>
		</CardContent>
		<CardFooter>
			<div class="flex items-center gap-2">
				<a href="/login" class="text-sm text-primary hover:underline"> ← Back to login</a>
			</div>
		</CardFooter>
	</Card>

	{#if form?.message}
		<Alert variant="destructive" dismissable>
			<AlertTitle>{form.message}</AlertTitle>
		</Alert>
	{/if}
</div>
