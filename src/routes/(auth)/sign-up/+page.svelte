<script lang="ts">
	import { Button } from '$components/ui/button';
	import { Input } from '$components/ui/input';
	import { PasswordInput } from '$components/ui/password-input';
	import { Label } from '$components/ui/label';
	import { Card, CardContent, CardFooter } from '$components/ui/card';
</script>

<svelte:head>
	<title>todoit. — Sign Up</title>
</svelte:head>

<div class="space-y-6">
	<h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl font-inter">
		Hello User
	</h1>

	<Card>
		<CardContent class="pt-6">
			<form method="POST">
				<div class="space-y-2.5">
					<div class="space-y-1.5">
						<Label for="name" class="font-medium">Name</Label>
						<Input type="text" name="name" id="name" placeholder="Your name" />
					</div>
					<div class="space-y-1.5">
						<Label for="email" class="font-medium">Email</Label>
						<Input type="email" name="email" id="email" placeholder="you@email.com" />
					</div>
					<div class="space-y-1.5">
						<Label for="password" class="font-medium">Password</Label>
						<PasswordInput name="password" id="password" placeholder="Your password" />
					</div>
					<div class="pt-2.5">
						<Button type="submit" class="w-full">Sign Up</Button>
					</div>
				</div>
			</form>
		</CardContent>

		<CardFooter>
			<p class="leading-7 [&:not(:first-child)]:mt-6">
				Already have an account? <a href="/sign-in"
					><span class="text-primary font-medium">Sign In</span></a
				>
			</p>
		</CardFooter>
	</Card>
</div>
