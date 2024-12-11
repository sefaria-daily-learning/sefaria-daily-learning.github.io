<script>
    import { onMount } from 'svelte';

    let deferredPrompt;
    let showInstallButton = false;

    onMount(() => {
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            deferredPrompt = e;
            showInstallButton = true;
        });

        window.addEventListener('appinstalled', () => {
            showInstallButton = false;
            console.log('PWA was installed');
        });
    });

    async function installApp() {
        if (!deferredPrompt) return;

        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;

        if (outcome === 'accepted') {
            console.log('User accepted the install prompt');
        } else {
            console.log('User dismissed the install prompt');
        }

        deferredPrompt = null;
        showInstallButton = false;
    }
</script>

{#if showInstallButton}
    <div class="toast toast-end">
        <div class="alert alert-info">
            <span>Install our app for a better experience!</span>
            <button class="btn btn-primary btn-sm" on:click={installApp}>
                Install
            </button>
        </div>
    </div>
{/if}
