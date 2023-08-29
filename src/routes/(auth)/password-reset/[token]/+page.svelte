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
				Set new password
			</h2>
			<p class="text-sm text-foreground/80">create a new password</p>
		</CardHeader>
		<CardContent>
			<form method="post" use:enhance>
				<div class="space-y-4">
					<div class="space-y-2">
						<Label for="password" class="text-sm">Password</Label>
						<Input type="password" name="password" id="password" placeholder="" />
					</div>
					<div class="space-y-2">
						<Label for="confirmPassword" class="text-sm">Confirm password</Label>
						<Input type="password" name="confirmPassword" id="confirmPassword" placeholder="" />
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

	{#if form?.message}
		<Alert variant="destructive">
			<AlertTitle>{form.message}</AlertTitle>
		</Alert>
	{/if}
</div>
