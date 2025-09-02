<script lang="ts">
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<svelte:head>
  <title>{data.label}</title>
</svelte:head>

<div>
  <h1>{data.label}</h1>
  {#await data.pricePromise}
    <p>Loading price...</p>
  {:then priceRes}
    <p>{priceRes.price}</p>
  {:catch err}
    <p class="text-red-500">Error: {err.message}</p>
  {/await}
</div>
