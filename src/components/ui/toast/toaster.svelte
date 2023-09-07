<script lang="ts" context="module">
	import type { ValueOrFunction } from '$lib/types';
	import { resolveValue } from '$lib/utils';
	import { createToaster } from '@melt-ui/svelte';

	type ToastType = 'default' | 'loading' | 'success' | 'error';

	interface ToastOptions {
		id?: string;
		description?: string;
		dismissable?: boolean;
		closeDelay?: number;
	}

	export type PromiseToastOptions = ToastOptions & {
		[key in ToastType]?: ToastOptions;
	};

	export interface ToastData extends ToastOptions {
		type?: ToastType;
		title: string;
	}

	const {
		elements,
		helpers: { addToast, removeToast, updateToast },
		states: { toasts },
		actions: { portal }
	} = createToaster<ToastData>();

	function createToast(message: string, type: ToastType, opts?: ToastOptions): ToastData {
		return {
			type,
			title: message,
			dismissable: true,
			...opts
		};
	}

	const toastHandler = (type: ToastType) => (message: string, opts?: ToastOptions) => {
		const data = createToast(message, type, opts);
		if (opts?.id) {
			updateToast(opts.id, data);
			return opts.id;
		}
		const toast = addToast({ data, closeDelay: opts?.closeDelay ?? 4000 });
		return toast.id;
	};

	const toast = (message: string, opts?: ToastOptions) => toastHandler('default')(message, opts);
	toast.loading = toastHandler('loading');
	toast.success = toastHandler('success');
	toast.error = toastHandler('error');

	toast.dismiss = (id?: string) => (id ? removeToast(id) : null);

	toast.promise = <T,>(
		promise: Promise<T>,
		msgs: {
			loading: string;
			success: ValueOrFunction<string, T>;
			error: ValueOrFunction<string, any>;
		},
		opts?: PromiseToastOptions
	) => {
		const id = toast.loading(msgs.loading, { ...opts, ...opts?.loading });

		promise
			.then((p) => {
				toast.success(resolveValue(msgs.success, p), {
					id,
					...opts,
					...opts?.success
				});
				return p;
			})
			.catch((e) => {
				toast.error(resolveValue(msgs.error, e), {
					id,
					...opts,
					...opts?.error
				});
			});

		return promise;
	};

	export { toast };
</script>

<script lang="ts">
	import { flip } from 'svelte/animate';
	import Toast from './toast.svelte';
</script>

<div
	class="fixed bottom-0 left-1/2 z-50 m-4 flex -translate-x-1/2 flex-col items-end gap-2"
	use:portal
>
	{#each $toasts as toast (toast.id)}
		<div animate:flip={{ duration: 200 }} class="origin-bottom">
			<Toast {elements} {toast} />
		</div>
	{/each}
</div>
