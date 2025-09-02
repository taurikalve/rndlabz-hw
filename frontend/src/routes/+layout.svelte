<script lang="ts">
  import Sidebar from '$lib/components/Sidebar.svelte';
  import '../app.css';

  let { children } = $props();
</script>

<div class="app">
  <Sidebar />
  <main>
    {@render children()}
  </main>
</div>

<style>
  .app {
    display: flex;
    /* flex-direction: column; */
    min-height: 100vh;
  }

  main {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 1rem;
    width: 100%;
    max-width: 84rem;
    margin: 0 auto;
    box-sizing: border-box;
  }
</style>
