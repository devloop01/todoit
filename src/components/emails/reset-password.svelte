<script lang="ts">
	import { Button, Hr, Html, Text } from 'svelte-email';

	export let email: string;
	export let url: string;
</script>

<Html lang="en">
	<Text>
		Hello {email},<br />
		<br />
		You have requested to reset you password<br />
		<br />
		Please click the button to reset your password
	</Text>
	<Hr />
	<Button href={url}>Reset password</Button>
</Html>
