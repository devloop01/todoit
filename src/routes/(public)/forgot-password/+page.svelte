<script lang="ts">
	import { Button } from '$components/ui/button';
	import { Card, CardContent, CardFooter, CardHeader } from '$components/ui/card';
	import { TextInput } from '$components/ui/text-input';
	import { toast } from '$components/ui/toast/toaster.svelte';
	import { superForm } from 'sveltekit-superforms/client';

	export let data;

	const { form, errors, enhance, submitting, constraints } = superForm(data.form, {
		onUpdated({ form }) {
			if (form.message?.type === 'success') toast.success(form.message.message);
			if (form.message?.type === 'error') toast.error(form.message.message);
		},
		onError(event) {
			console.log(event);
		}
	});
</script>

<svelte:head>
	<title>Forgot Password — todoit</title>
</svelte:head>

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
				<div class="space-y-4">
					<TextInput
						label="Email"
						type="email"
						name="email"
						placeholder="Enter your email"
						bind:value={$form.email}
						error={$errors.email?.[0]}
						disabled={$submitting}
						id="email"
						{...$constraints.email}
					/>
					<Button class="w-full" loading={$submitting}>Reset Password</Button>
				</div>
			</form>
		</CardContent>
		<CardFooter>
			<div class="flex items-center gap-2">
				<a href="/login" class="text-sm text-primary hover:underline"> ← Back to login</a>
			</div>
		</CardFooter>
	</Card>
</div>
