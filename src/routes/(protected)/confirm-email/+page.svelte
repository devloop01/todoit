<script lang="ts">
	import type { ActionData } from './$types';

	import { enhance } from '$app/forms';

	import { Alert, AlertTitle } from '$components/ui/alert';
	import { Button } from '$components/ui/button';
	import { Card, CardContent, CardFooter, CardHeader } from '$components/ui/card';

	export let form: ActionData;
</script>

<div class="space-y-2">
	<Card>
		<CardHeader>
			<h2
				class="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
			>
				Confirm your email
			</h2>
		</CardHeader>
		<CardContent>
			<p>Email verification link was sent to your inbox (i.e. console).</p>
		</CardContent>
		<CardFooter>
			<form method="post" use:enhance>
				<Button>Resend verification link</Button>
			</form>
		</CardFooter>
	</Card>

	{#if form?.success}
		<Alert variant="success">
			<AlertTitle>Your verification link was resent</AlertTitle>
		</Alert>
	{/if}
</div>
