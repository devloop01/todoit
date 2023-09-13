<script lang="ts">
	import { Html, Text } from 'svelte-email';

	export let email: string;
</script>

<Html lang="en">
	<Text>
		Hello {email},<br />
		<br />
		Welcome to todoit. make your todos
	</Text>
</Html>
