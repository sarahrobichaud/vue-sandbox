<script setup lang="ts">

</script>

<template>
  <div class="not-found">
    <h1>404 - Page Not Found</h1>
    <p>Sorry, the page you are looking for does not exist.</p>
    <router-link to="/" class="back-button">Return Home</router-link>
  </div>
</template>

<style scoped>
.not-found {
  text-align: center;
  padding: 2rem;
}

h1 {
  font-size: 2rem;
  color: var(--color-accent);
  margin-bottom: 1rem;
}

p {
  margin-bottom: 2rem;
  opacity: 0.8;
}

.back-button {
  padding: 0.5rem 1rem;
  text-decoration: none;
  background-color: var(--color-background-soft);
  border: 2px solid var(--color-accent);
  border-radius: 0.5rem;
  color: var(--color-text);
  cursor: pointer;
  transition: all 0.2s;
}

.back-button:hover {
  background-color: var(--color-accent);
  color: var(--color-background);
}
</style>
