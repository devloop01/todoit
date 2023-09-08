<script lang="ts">
	export let size: number | undefined = undefined;
	export let color: string | undefined = undefined;
</script>

<div class="spinner-wrapper" style:--size={size && size + 'px'} style:--color={color}>
	<div class="spinner">
		{#each { length: 12 } as _, i (`spinner-bar-${i}`)}
			<span></span>
		{/each}
	</div>
</div>

<style>
	.spinner-wrapper {
		--size: 16px;
		--color: #000;

		box-sizing: border-box;
		display: block;
		width: var(--size);
		height: var(--size);
		padding: 0;
		margin: 0;
	}

	.spinner {
		position: relative;
		width: 100%;
		height: 100%;
		left: 50%;
		top: 50%;
	}

	span {
		background-color: var(--color);
		position: absolute;
		top: -3.9%;
		width: 24%;
		height: 8%;
		left: -10%;
		border-radius: 6px;
		animation: spinner 1.2s linear 0s infinite normal none running;
	}

	span:nth-child(1) {
		animation-delay: -1.2s;
		transform: rotate(0deg) translate(146%);
	}

	span:nth-child(2) {
		animation-delay: -1.1s;
		transform: rotate(30deg) translate(146%);
	}

	span:nth-child(3) {
		animation-delay: -1s;
		transform: rotate(60deg) translate(146%);
	}

	span:nth-child(4) {
		animation-delay: -0.9s;
		transform: rotate(90deg) translate(146%);
	}

	span:nth-child(5) {
		animation-delay: -0.8s;
		transform: rotate(120deg) translate(146%);
	}

	span:nth-child(6) {
		animation-delay: -0.7s;
		transform: rotate(150deg) translate(146%);
	}

	span:nth-child(7) {
		animation-delay: -0.6s;
		transform: rotate(180deg) translate(146%);
	}

	span:nth-child(8) {
		animation-delay: -0.5s;
		transform: rotate(210deg) translate(146%);
	}

	span:nth-child(9) {
		animation-delay: -0.4s;
		transform: rotate(240deg) translate(146%);
	}

	span:nth-child(10) {
		animation-delay: -0.3s;
		transform: rotate(270deg) translate(146%);
	}

	span:nth-child(11) {
		animation-delay: -0.2s;
		transform: rotate(300deg) translate(146%);
	}

	span:nth-child(12) {
		animation-delay: -0.1s;
		transform: rotate(330deg) translate(146%);
	}

	@keyframes spinner {
		0% {
			opacity: 1;
		}
		100% {
			opacity: 0.15;
		}
	}
</style>
