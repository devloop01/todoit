<script lang="ts">
	import type { ActionData } from './$types';

	import { enhance } from '$app/forms';

	import { Alert, AlertTitle } from '$components/ui/alert';
	import { Button } from '$components/ui/button';
	import { Card, CardContent, CardFooter, CardHeader } from '$components/ui/card';

	export let form: ActionData;
	export let data;

	$: ({ user } = data);

	let loading = false;
</script>

<svelte:head>
	<title>Confirm email — todoit</title>
</svelte:head>

<main class="px-4 pt-8">
	<div class="space-y-2">
		{#if user?.email_verified}
			<Card>
				<CardHeader>
					<h2
						class="scroll-m-20 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
					>
						Email verified
					</h2>
				</CardHeader>
				<CardContent>
					<p>Your email has been verified</p>
				</CardContent>
				<CardFooter>
					<a href="/app" class="text-sm text-primary hover:underline">← Back to app</a>
				</CardFooter>
			</Card>
		{:else}
			<Card>
				<CardHeader>
					<h2
						class="scroll-m-20 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
					>
						Confirm your email
					</h2>
				</CardHeader>
				<CardContent>
					<p>Email verification link was sent to your inbox (i.e. console).</p>
				</CardContent>
				<CardFooter>
					<form
						method="post"
						use:enhance={() => {
							loading = true;
							return async ({ update }) => {
								// await new Promise((r) => setTimeout(r, 1000));
								await update();
								loading = false;
							};
						}}
					>
						<Button {loading}>Resend verification link</Button>
					</form>
				</CardFooter>
			</Card>
		{/if}

		{#if form?.success}
			<Alert variant="success" dismissable>
				<AlertTitle>Your verification link was resent</AlertTitle>
			</Alert>
		{/if}
	</div>
</main>
