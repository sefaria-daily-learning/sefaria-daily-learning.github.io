<script>
	import '../app.css';
	let { children } = $props();
    import InstallPrompt from "../components/InstallPrompt.svelte";
    import Offline from "../components/Offline.svelte";
</script>

<Offline/>
<InstallPrompt/>

{@render children()}
