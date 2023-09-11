<script lang="ts">
	import type { PageData } from './$types';

	import { onMount } from 'svelte';
	import { superForm } from 'sveltekit-superforms/client';

	import { currentUser } from '$lib/store';

	import { Button } from '$components/ui/button';
	import { Card, CardContent, CardFooter, CardHeader } from '$components/ui/card';
	import { TextInput } from '$components/ui/text-input';
	import { toast } from '$components/ui/toast';
	import { Skeleton } from '$components/ui/skeleton';

	export let data: PageData;

	let visible = false;

	const { form, errors, enhance, submitting, constraints, validate } = superForm(data.form, {
		onUpdated({ form }) {
			if (form.message?.type === 'success') toast.success(form.message.message);
			if (form.message?.type === 'error') toast.error(form.message.message);
		}
	});

	onMount(() => {
		visible = true;
		if ($currentUser) validate('email', { value: $currentUser.email });
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
			<Skeleton {visible}>
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
							{...!!$currentUser && { readonly: true }}
							{...$constraints.email}
						/>
						<Button class="w-full" loading={$submitting}>Reset Password</Button>
					</div>
				</form>
			</Skeleton>
		</CardContent>
		<CardFooter>
			<div class="flex items-center gap-2">
				<a href="/login" class="text-sm text-primary hover:underline"> ← Back to login</a>
			</div>
		</CardFooter>
	</Card>
</div>
