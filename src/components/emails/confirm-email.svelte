<script lang="ts">
	import { Button, Hr, Html, Text } from 'svelte-email';

	export let email: string;
	export let url: string;
</script>

<Html lang="en">
	<Text>
		Hello {email},<br />
		<br />
		You have requested to verify your email address.<br />
		<br />
		Please click the button below to verify your email address.
	</Text>
	<Hr />
	<Button href={url}>Verify Email</Button>
</Html>
