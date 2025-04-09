<script setup lang="ts">
import { ref, defineEmits } from 'vue'

const emit = defineEmits(['reviewsubmitted'])

const name = ref('Sarah Robichaud')
const review = ref('This is a great product!')
const rating = ref(0)
const recommend = ref('Yes')

const onSubmit = () => {
  const productReview = {
    name: name.value,
    review: review.value,
    rating: rating.value,
    recommend: recommend.value,
  }
  emit('reviewsubmitted', productReview)

  name.value = ''
  review.value = ''
  rating.value = 0
  recommend.value = ''
}
</script>

<template>
  <form class="" @submit.prevent="onSubmit">
    <h3 class="text-2xl font-bold">Leave a review</h3>
    <div class="flex flex-col gap-2">
      <label for="name">Name:</label>
      <input id="name" v-model="name" />

      <label for="review">Review:</label>
      <textarea id="review" v-model="review"></textarea>

      <label for="rating">Rating:</label>
      <select id="rating" v-model.number="rating">
        <option>5</option>
        <option>4</option>
        <option>3</option>
        <option>2</option>
        <option>1</option>
      </select>

      <label for="recommend">Would you recommend this product?</label>
      <select id="recommend" v-model="recommend">
        <option>Yes</option>
        <option>No</option>
      </select>

      <input class="bg-blue-500 text-white px-4 py-2 rounded-md" type="submit" value="Submit" />
    </div>
  </form>
</template>
