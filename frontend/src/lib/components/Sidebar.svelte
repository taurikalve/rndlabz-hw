<script lang="ts">
  import { page } from '$app/state';
  import { tokenPairs } from '$lib/consts';

  interface MenuItem {
    slug: string;
    label: string;
  }
  const items: MenuItem[] = [
    { slug: '/', label: 'Home' },
    ...tokenPairs.map(({ slug }) => ({
      slug: `/currency/${slug}`,
      label: slug,
    })),
  ];
</script>

<aside class="border-r-1 border-slate-800">
  <nav class="py-7.5 px-4">
    <ul class="flex flex-col">
      {#each items as { slug, label } (slug)}
        <li
          aria-current={page.url.pathname === slug ? 'page' : undefined}
          class="border-s-1 pl-4 pr-3.5 py-1
          aria-[current]:border-white border-gray-800 hover:text-white"
        >
          <a href={slug}>
            {label}
          </a>
        </li>
      {/each}
    </ul>
  </nav>
</aside>

<style>
  aside {
    min-height: 100vh;
  }
</style>
