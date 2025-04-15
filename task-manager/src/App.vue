<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'

</script>

<template>
  <header>
    <div class="container" id="header-container">
      <RouterLink to="/">
        <span class="brand-title">Task Manager</span>
      </RouterLink>
    </div>

  </header>

  <main>
    <div class="container">
      <RouterView />
    </div>
  </main>
</template>

<style scoped>
header {
  padding: 10px 0;
  background-color: var(--color-background-soft);
  border-bottom: 2px solid var(--color-accent-soft);
}

#header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

main {
  margin: 3rem auto;
}

.main-nav {
  list-style: none;
  display: flex;
  gap: 1rem;
  align-items: center;
}

a {
  text-decoration: none;
  color: var(--color-text);
}

a:hover {
  color: var(--color-accent);
}
</style>