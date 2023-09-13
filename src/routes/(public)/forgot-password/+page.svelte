<script lang="ts">
	import type { PageData } from './$types';

	import { superForm } from 'sveltekit-superforms/client';

	import { Button } from '$components/ui/button';
	import { Card, CardContent, CardFooter, CardHeader } from '$components/ui/card';
	import { TextInput } from '$components/ui/text-input';
	import { toast } from '$components/ui/toast';
	import { Skeleton } from '$components/ui/skeleton';
	import { Heading, Small, Text } from '$components/typography';

	export let data: PageData;

	const { form, errors, enhance, submitting, constraints, validate } = superForm(data.form, {
		onUpdated({ form }) {
			if (form.message?.type === 'success') toast.success(form.message.message);
			if (form.message?.type === 'error') toast.error(form.message.message);
		}
	});

	if (data.user) validate('email', { value: data.user.email });
</script>

<svelte:head>
	<title>Forgot Password — todoit</title>
</svelte:head>

<div class="space-y-2">
	<Card class="min-w-[300px]">
		<CardHeader>
			<Heading level="h2">Forgot Password?</Heading>
			<Text variant="muted"
				>Enter your email address and we'll send you a link to reset your password.</Text
			>
		</CardHeader>
		<CardContent>
			<Skeleton visible>
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
							{...!!data.user && { readonly: true }}
							{...$constraints.email}
						/>
						<Button class="w-full" loading={$submitting}>Reset Password</Button>
					</div>
				</form>
			</Skeleton>
		</CardContent>
		<CardFooter>
			<Small>
				<a href="/login" class="text-primary hover:underline"> ← Back to login</a>
			</Small>
		</CardFooter>
	</Card>
</div>
