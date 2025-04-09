<script setup lang="ts">
import { reactive } from 'vue'
import ProductDisplay from './components/ProductDisplay.vue'

const { user, cart, premium } = reactive<{
  user: string
  cart: number[]
  premium: boolean
}>({
  user: 'Sarah',
  cart: [],
  premium: true,
})

const addToCart = (id: number) => {
  cart.push(id)
}
</script>

<template>
  <div class="py-2 bg-gray-300">
    <div class="container flex justify-between items-centers">
      <h2 class="text-2xl font-bold">StoreFront</h2>
      <div class="flex items-center gap-4">
        <p>Welcome, {{ user }}</p>
        <p>Cart ({{ cart.length }})</p>
      </div>
    </div>
  </div>
  <div>
    <div class="container py-8">
      <div class="grid grid-cols-2 gap-16">
        <ProductDisplay :premium="premium" @addtocart="addToCart" />
      </div>
      <div class="my-16 border-b border-gray-300"></div>
    </div>
  </div>
</template>
