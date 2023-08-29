<script lang="ts">
	import type { ActionData } from './$types';

	import { enhance } from '$app/forms';

	import { Alert, AlertTitle } from '$components/ui/alert';
	import { Button } from '$components/ui/button';
	import { Card, CardContent, CardFooter, CardHeader } from '$components/ui/card';
	import { Label } from '$components/ui/label';
	import { Input } from '$components/ui/input';

	export let form: ActionData;
</script>

<div class="space-y-2">
	<Card class="min-w-[300px]">
		<CardHeader>
			<h2 class="scroll-m-20 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
				Forgot Password?
			</h2>
			<p class="text-sm text-foreground/80">
				Enter your email address and we'll send you a link to reset your password.
			</p>
		</CardHeader>
		<CardContent>
			<form method="post" use:enhance>
				<div class="space-y-6">
					<div class="space-y-2">
						<Label for="email" class="text-sm">Email</Label>
						<Input type="email" name="email" id="email" placeholder="Enter your email" />
					</div>
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

	{#if form?.success}
		<Alert variant="success">
			<AlertTitle>Your password reset link was sent to your inbox</AlertTitle>
		</Alert>
	{/if}
	{#if form?.message}
		<Alert variant="destructive">
			<AlertTitle>{form.message}</AlertTitle>
		</Alert>
	{/if}
</div>
