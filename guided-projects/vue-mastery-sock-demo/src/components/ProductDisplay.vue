<script setup lang="ts">
import { reactive, computed, defineProps, defineEmits } from 'vue'
import ReviewForm from './ReviewForm.vue'
import ReviewList from './ReviewList.vue'

const { premium, cartCount } = defineProps({
  premium: {
    type: Boolean,
    required: true,
  },
  cartCount: {
    type: Number,
    required: false,
  },
})

const emit = defineEmits(['addtocart'])

const product = reactive<{
  brand: string
  product: string
  description: string
  selectedVariant: number
  url: string
  details: string[]
  sizes: string[]
  variants: {
    id: number
    color: string
    image: string
    quantity: number
    onSale: boolean
    reviews: any[]
  }[]
}>({
  brand: 'Vue Mastery',
  product: 'Socks',
  description: 'A pair of socks',
  selectedVariant: 0,
  url: 'https://www.google.com',
  details: ['50% cotton', '30% wool', '20% polyester'],
  sizes: ['S', 'M', 'L', 'XL', 'XXL'],
  variants: [
    {
      id: 2234,
      color: 'green',
      image: './src/assets/images/socks_green.jpg',
      quantity: 16,
      onSale: false,
      reviews: [],
    },
    {
      id: 2235,
      color: 'blue',
      image: './src/assets/images/socks_blue.jpg',
      quantity: 0,
      onSale: true,
      reviews: [],
    },
  ],
})

const title = computed(() => {
  return `${product.brand} ${product.product}`
})

const inStock = computed<boolean>(() => {
  return product.variants[product.selectedVariant].quantity > 0
})

const stockMessage = computed(() => {
  let value = product.variants[product.selectedVariant].quantity
  if (value > 10) return 'In Stock'
  if (value > 0 && value <= 10) return 'Almost out of stock!'
  if (value <= 0) return 'Out of Stock'
})

const onSale = computed(() => {
  return product.variants[product.selectedVariant].onSale
})

const image = computed(() => {
  return product.variants[product.selectedVariant].image
})
const shippingMessage = computed(() => {
  return premium ? 'Free' : '2.99'
})

const updateVariant = (index: number) => {
  product.selectedVariant = index
}

const addToCart = () => {
  product.variants[product.selectedVariant].quantity--
  emit('addtocart', product.variants[product.selectedVariant].id)
}

const addReview = (review: any) => {
  console.log(review)
  product.variants[product.selectedVariant].reviews.push(review)
}
</script>

<template>
  <img :src="image" class="" />
  <div>
    <div class="mb-4">
      <h1 class="text-4xl font-bold">{{ title }}</h1>
      <p>{{ stockMessage }} <span v-if="onSale" class="text-blue-500"> - On Sale</span></p>
      <p>Shipping: {{ shippingMessage }}</p>
    </div>
    <p class="mb-4">{{ product.description }}</p>

    <ul class="mb-4 text-gray-500">
      <li v-for="detail in product.details">{{ detail }}</li>
    </ul>

    <div class="flex gap-2 mb-4">
      <button
        v-for="(variant, index) in product.variants"
        :key="variant.id"
        class="px-4 py-2 rounded-md h-[50px] w-[50px] rounded-full border-8 border-gray-300 hover:border-gray-400"
        @click="updateVariant(index)"
        :class="{ 'border-0': index === product.selectedVariant }"
        :style="{ backgroundColor: variant.color }"
      ></button>
    </div>

    <div class="flex gap-2 mb-4">
      <div v-for="size in product.sizes" class="bg-gray-200 px-4 py-2 rounded-md">{{ size }}</div>
    </div>
    <div class="flex gap-4 items-center">
      <button
        class="bg-blue-800 text-white px-4 py-2 rounded-md"
        :disabled="!inStock"
        v-on:click="addToCart"
        :class="{ 'bg-gray-300': !inStock }"
      >
        Add to Cart
      </button>
      <a :href="product.url">Learn More</a>
    </div>
  </div>
  <ReviewForm @reviewsubmitted="addReview" />
  <ReviewList
    v-if="product.variants[product.selectedVariant].reviews.length > 0"
    :reviews="product.variants[product.selectedVariant].reviews"
  />
  <p v-else>No reviews yet!</p>
</template>
