<script>
    import { onMount } from 'svelte';
    let isOnline = true;

    onMount(() => {
        if (typeof window !== 'undefined') {
            window.addEventListener('online', () => isOnline = true);
            window.addEventListener('offline', () => isOnline = false);
        }
    });
</script>

{#if !isOnline}
    <div class="offline-banner">
        You are currently offline. Some features may be unavailable.
    </div>
{/if}
