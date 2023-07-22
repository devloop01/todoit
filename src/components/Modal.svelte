<script lang="ts">
	export let showModal: boolean = false;

	let dialog: HTMLDialogElement;

	$: if (dialog && showModal) dialog.showModal();
</script>

<dialog bind:this={dialog} on:close={() => (showModal = false)} class="modal">
	<form method="dialog" class="modal-box">
		<slot />
	</form>
	<form method="dialog" class="modal-backdrop">
		<button on:click={() => dialog.close()}>close</button>
	</form>
</dialog>
