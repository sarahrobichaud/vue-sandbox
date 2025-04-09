<script setup lang="ts">
import type { Review } from '@/model/Review'

const { reviews } = defineProps<{
  reviews: Array<Review>
}>()

console.log(reviews)
</script>

<template>
  <div class="flex flex-col gap-4">
    <div v-for="review in reviews" :key="review.name" class="p-4 border border-gray-200 rounded-md">
      <div class="flex justify-between items-center mb-2">
        <h3 class="font-bold">{{ review.name }}</h3>
        <div class="flex items-center gap-2">
          <span class="text-yellow-500">★</span>
          <span>{{ review.rating }}/5</span>
        </div>
      </div>
      <p class="mb-2">{{ review.review }}</p>
      <p class="text-sm text-gray-600">Would recommend: {{ review.recommend }}</p>
    </div>
  </div>
</template>
