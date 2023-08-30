<script lang="ts">
	import { page } from '$app/stores';

	import { Card, CardContent, CardFooter, CardHeader } from '$components/ui/card';
	import { Code, Heading, Text } from '$components/typography';

	let token = $page.params.token;
</script>

<Card class="min-w-[300px]">
	<CardHeader>
		<Heading level="h2">Invalid token</Heading>
	</CardHeader>
	<CardContent>
		<Text>
			token: <Code>{token}</Code> is Invalid
		</Text>
	</CardContent>
	<CardFooter>
		<div class="flex items-center gap-2">
			<a href="/forgot-password" class="text-sm text-primary hover:underline"> ← forgot password</a>
		</div>
	</CardFooter>
</Card>
