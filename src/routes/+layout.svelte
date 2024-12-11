<script>
    export const prerender = true
    import { onMount } from 'svelte';
    import { pwaInfo } from 'virtual:pwa-info';

    onMount(async () => {
        if (pwaInfo) {
            const { registerSW } = await import('virtual:pwa-register');
            registerSW({
                immediate: true,
                onRegistered(r) {
                    console.log('Service Worker registered');
                },
                onRegisterError(error) {
                    console.error('Service Worker registration error', error);
                }
            });
        }
    });
</script>

<slot />