<script lang="ts">
	import { page } from '$app/stores';
	import { getErrorMessage, type Errors } from '$lib/utils/errors';
	import { Alert, AlertTitle } from '$components/ui/alert';

	let errorCode: Errors | null;
	let errorMessage: string | null;
	$: {
		errorCode = $page.url.searchParams.get('error') as Errors | null;
		errorMessage = getErrorMessage(errorCode);
	}
</script>

{#if errorMessage}
	<Alert variant="destructive" dismissable>
		<AlertTitle>
			{errorMessage}
		</AlertTitle>
	</Alert>
{/if}
