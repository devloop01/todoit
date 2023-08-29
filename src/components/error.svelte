<script lang="ts">
	import { page } from '$app/stores';
	import { getErrorMessage, type Errors } from '$lib/utils/errors';
	import { Alert, AlertTitle } from '$components/ui/alert';

	let errorCode: Errors;
	let errorMessage: string | undefined;
	$: {
		errorCode = ($page.url.searchParams.get('error') as Errors | null) ?? 'unknown';
		errorMessage = getErrorMessage(errorCode);
	}
</script>

{#if errorMessage}
	<Alert variant="destructive">
		<AlertTitle>
			{errorMessage}
		</AlertTitle>
	</Alert>
{/if}
